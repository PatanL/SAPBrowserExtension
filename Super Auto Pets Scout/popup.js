// popup.js

// Render function: clears existing UI and populates with new data
function render({ minions, spells, timestamp }) {
    const minionsContainer = document.getElementById('minions-container');
    const spellsContainer  = document.getElementById('spells-container');
    const statusDiv        = document.getElementById('status');
    const timestampDiv     = document.getElementById('timestamp');
  
    // Clear anything already in the containers
    minionsContainer.innerHTML = '';
    spellsContainer.innerHTML  = '';
  
    // Hide the "waiting" status
    statusDiv.style.display = 'none';
  
    // Populate Minions
    if (minions.length > 0) {
      minions.forEach(minion => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML =
          `<span class="item-enu">Pet ID (Enu): ${minion.enu}</span>` +
          `<span class="item-frozen">${minion.fro ? 'Frozen ❄️' : ''}</span>`;
        minionsContainer.appendChild(itemDiv);
      });
    }
  
    // Populate Spells
    if (spells.length > 0) {
      spells.forEach(spell => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML =
          `<span class="item-enu">Food ID (Enu): ${spell.enu}</span>` +
          `<span class="item-frozen">${spell.fro ? 'Frozen ❄️' : ''}</span>`;
        spellsContainer.appendChild(itemDiv);
      });
    }
  
    // Update timestamp
    if (timestamp) {
      timestampDiv.textContent = `Last updated: ${new Date(timestamp).toLocaleTimeString()}`;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const statusDiv = document.getElementById('status');
  
    // 1) Initial load: get whatever's in storage right now
    chrome.storage.local.get('battleData', result => {
      if (result.battleData) {
        render(result.battleData);
      } else {
        statusDiv.textContent = 'No battle data captured yet. Play a round!';
      }
    });
  
    // 2) Live updates: re‑render whenever battleData changes
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.battleData?.newValue) {
        render(changes.battleData.newValue);
      }
    });
  });
  