// popup.js - Updated to always show frozen status

function render({ minions, spells, timestamp }) {
    const minionsContainer = document.getElementById('minions-container');
    const spellsContainer  = document.getElementById('spells-container');
    const statusDiv        = document.getElementById('status');
    const timestampDiv     = document.getElementById('timestamp');
  
    // Clear previous results
    minionsContainer.innerHTML = '';
    spellsContainer.innerHTML  = '';
    statusDiv.style.display    = 'none';
  
    // Populate Minions (Pets)
    if (minions.length > 0) {
      minions.forEach(minion => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        
        // --- CHANGE IS HERE ---
        // Create explicit text for the frozen status.
        const frozenStatusText = minion.fro ? 'Frozen: Yes ❄️' : 'Frozen: No';

        itemDiv.innerHTML =
          `<span class="item-enu">${minion.name}</span>` +
          `<span class="item-frozen">${frozenStatusText}</span>`;
          
        minionsContainer.appendChild(itemDiv);
      });
    }
  
    // Populate Spells (Foods)
    if (spells.length > 0) {
      spells.forEach(spell => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        // --- CHANGE IS HERE ---
        // Create explicit text for the frozen status.
        const frozenStatusText = spell.fro ? 'Frozen: Yes ❄️' : 'Frozen: No';

        itemDiv.innerHTML =
          `<span class="item-enu">${spell.name}</span>` +
          `<span class="item-frozen">${frozenStatusText}</span>`;

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
  
    // Initial load: get whatever's in storage right now
    chrome.storage.local.get('battleData', result => {
      if (result.battleData) {
        render(result.battleData);
      } else {
        statusDiv.textContent = 'No battle data captured yet. Play a round!';
      }
    });
  
    // Live updates: re-render whenever battleData changes
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.battleData?.newValue) {
        render(changes.battleData.newValue);
      }
    });
});