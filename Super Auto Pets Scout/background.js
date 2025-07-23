// background.js

const gameUrlPattern   = "teamwood.itch.io/super-auto-pets";
const targetApiPattern = "/api/battle/get/";

const TAB = {};      // TAB[tabId] = true once we’ve attached
const SESSIONS = {}; // SESSIONS[sessionId] = { tabId } once Network is enabled

console.log("⏱️  [Background] loaded");

chrome.runtime.onInstalled.addListener(() => {
  console.log("🔄 [Background] onInstalled – checking already open tabs");
  hookAlreadyOpenTabs();
});

// 1️⃣  When any tab finishes loading…
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(`📄 [tabs.onUpdated] tabId=${tabId} status=${changeInfo.status}`);
  if (changeInfo.status === "complete") {
    maybeAttach(tab);
  }
});

// 2️⃣  When the user switches tabs…
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  console.log(`🔀 [tabs.onActivated] tabId=${tabId}`);
  try {
    const tab = await chrome.tabs.get(tabId);
    maybeAttach(tab);
  } catch (e) {
    console.error("❌ [tabs.onActivated] failed to get tab:", e);
  }
});

// ➊ at the top of your background.js, before the listener:
const pending = new Set();

// ➋ replace your existing chrome.debugger.onEvent listener with this:
chrome.debugger.onEvent.addListener((src, method, params) => {
  const sid = src.sessionId ?? "top";
  console.log(`🚨 [debugger.onEvent] session=${sid} method=${method}`, params);

  if (!SESSIONS[sid]) {
    console.log(`   ↳ Ignoring event from session=${sid}`);
    return;
  }

  // Step 1: when headers arrive for the XHR GET, queue the requestId
  if (
    method === "Network.responseReceived" &&
    params.type === "XHR" &&
    params.response.status === 200 &&
    params.response.url.includes(targetApiPattern)
  ) {
    console.log("   ✅ responseReceived XHR GET, queuing:", params.requestId);
    pending.add(params.requestId);
  }

  // Step 2: once loading has finished, actually fetch the body
  if (
    method === "Network.loadingFinished" &&
    pending.has(params.requestId)
  ) {
    console.log("   🟢 loadingFinished for:", params.requestId);
    pending.delete(params.requestId);
    fetchBattleBody(src, params.requestId);
  }

  // Remains unchanged: auto‑attach new iframe/worker targets
  if (method === "Target.attachedToTarget") {
    const { sessionId, targetInfo } = params;
    console.log(`   ↳ Target.attachedToTarget → session=${sessionId}, type=${targetInfo.type}`);
    if (targetInfo.type === "iframe" || targetInfo.type === "worker") {
      enableNetwork(src.tabId, sessionId);
    }
  }
});

// ➌ add this helper below your listener (or wherever handleBattleResponse lives):
function fetchBattleBody(src, requestId) {
  console.log("   ▶️ fetchBattleBody:", requestId);
  chrome.debugger.sendCommand(
    src,
    "Network.getResponseBody",
    { requestId },
    response => {
      if (chrome.runtime.lastError) {
        console.error("   ❌ getResponseBody failed:", chrome.runtime.lastError.message);
        return;
      }
      console.log("   ✔️ getResponseBody success, length=", response.body.length);
      // now call your existing parsing + storage logic:
      handleBattleResponse(src, requestId, response.body);
    }
  );
}


// ─── Attachment & Networking ───────────────────────────────────────────────

// Try to attach to this tab (and auto‑attach to its iframes/workers)
async function maybeAttach(tab) {
  console.log(`🔍 [maybeAttach] tab.id=${tab.id} url=${tab.url}`);
  if (!tab.url || !tab.url.includes(gameUrlPattern)) {
    console.log("   ↳ URL doesn’t match game pattern, skipping");
    return;
  }
  if (TAB[tab.id]) {
    console.log("   ↳ Already attached to this tab, skipping");
    return;
  }

  try {
    console.log(`   ▶️ Attaching debugger to tab ${tab.id}`);
    await chrome.debugger.attach({ tabId: tab.id }, "1.3");
    console.log("   ✔️ debugger.attach succeded");

    console.log("   ▶️ Enabling auto‑attach for child targets");
    await chrome.debugger.sendCommand({ tabId: tab.id }, "Target.setAutoAttach", {
      autoAttach: true,
      waitForDebuggerOnStart: false,
      flatten: true
    });
    console.log("   ✔️ Target.setAutoAttach succeeded");

    console.log("   ▶️ Enabling Network on top‑level target");
    await enableNetwork(tab.id, undefined);

    TAB[tab.id] = true;
    console.log(`   🎉 Attached & ready on tab ${tab.id}`);
  } catch (e) {
    console.error(`   ❌ Error in maybeAttach(tab ${tab.id}):`, e);
  }
}

// Enable Network domain on a specific DevTools session
async function enableNetwork(tabId, sessionId) {
  const target = sessionId ? { tabId, sessionId } : { tabId };
  const sid = sessionId ?? "top";
  console.log(`   ▶️ [enableNetwork] for session=${sid}`);
  try {
    await chrome.debugger.sendCommand(target, "Network.enable");
    SESSIONS[sid] = { tabId };
    console.log(`   ✔️ Network.enabled for session=${sid}`);
  } catch (e) {
    console.error(`   ❌ Failed to Network.enable for session=${sid}:`, e);
  }
}

// ─── Response Processing ───────────────────────────────────────────────────

function handleBattleResponse(src, requestId) {
  const sid = src.sessionId ?? "top";
  console.log(`   ▶️ [handleBattleResponse] session=${sid} requestId=${requestId}`);

  chrome.debugger.sendCommand(
    src,
    "Network.getResponseBody",
    { requestId },
    response => {
      if (chrome.runtime.lastError) {
        console.error("   ❌ getResponseBody error:", chrome.runtime.lastError);
        return;
      }
      console.log("   ✔️ getResponseBody success, body length =", response.body?.length);

      let json;
      try {
        json = JSON.parse(response.body);
        console.log("   🔍 Parsed JSON:", json);
      } catch (e) {
        console.error("   ❌ JSON.parse failed:", e);
        return;
      }

      const { MiSh = [], SpSh = [] } = json.OpponentBoard || {};
      console.log(`   • Found MiSh (${MiSh.length}) / SpSh (${SpSh.length})`);

      const minions = MiSh.filter(Boolean).map(({ Enu, Fro }) => ({ enu: Enu, fro: Fro }));
      const spells  = SpSh.filter(Boolean).map(({ Enu, Fro }) => ({ enu: Enu, fro: Fro }));

      console.log("   • Extracted minions:", minions);
      console.log("   • Extracted spells:", spells);

      const battleData = { minions, spells, timestamp: Date.now() };
      chrome.storage.local.set({ battleData }, () => {
        console.log("🎉 battleData saved to storage");
    
        // 👉 New: notify any open popup immediately
        chrome.runtime.sendMessage({
          type: "NEW_BATTLE_DATA",
          payload: battleData
        }, () => {
          console.log("📨 Sent NEW_BATTLE_DATA message to popup(s)");
        });
      });
    }
  );
}

// On startup (or extension reload), try to attach to any already‑open game tabs
function hookAlreadyOpenTabs() {
  console.log("🔍 [hookAlreadyOpenTabs] querying all tabs");
  chrome.tabs.query({}, tabs => {
    console.log(`   • Found ${tabs.length} total tabs`);
    tabs.forEach(tab => {
      if (tab.status === "complete") {
        maybeAttach(tab);
      }
    });
  });
}
