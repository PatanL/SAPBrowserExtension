// // This script runs inside the web page to find the game's iframe.
// // It sends a message to our background script to say "I'm here!"

// chrome.runtime.sendMessage({ type: "content_script_ready" });

// This script runs in an isolated "content script" environment.
// Its only job is to inject our `inject.js` script into the main page's context.
// This script runs on ALL frames that match the manifest's URL patterns.
console.log(`[SAP Scout] content.js is executing on: ${window.location.href}`);

// We only want to inject our script into the actual game's iframe.
if (window.location.hostname === 'html-classic.itch.zone') {

    console.log('[SAP Scout] This is the game iframe! Proceeding with injection.');

    function injectScript() {
        try {
            const script = document.createElement('script');
            script.src = chrome.runtime.getURL('inject.js');
            (document.head || document.documentElement).appendChild(script);
            script.onload = () => {
                console.log('[SAP Scout] inject.js has been successfully injected into the iframe.');
                script.remove();
            };
            script.onerror = (e) => {
                console.error('[SAP Scout] CRITICAL: Failed to load inject.js.', e);
            };
        } catch (e) {
            console.error('[SAP Scout] Error during script injection:', e);
        }
    }

    injectScript();

    // This listener forwards data from the page to the background script.
    window.addEventListener('message', (event) => {
        if (event.source === window && event.data.type === 'SAP_BATTLE_DATA_FROM_PAGE') {
            console.log('[SAP Scout] content.js (in iframe) is forwarding battle data to background.');
            chrome.runtime.sendMessage(event.data);
        }
    });

} else {
    console.log('[SAP Scout] This is the top-level page, not the game iframe. No action needed here.');
}