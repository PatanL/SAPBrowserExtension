console.log('[SAP Scout Inject] inject.js has been executed!');

// --- Helper function to send data back to the content script ---
function sendDataToExtension(data) {
    window.postMessage({
        type: 'SAP_BATTLE_DATA_FROM_PAGE',
        payload: data
    }, '*');
}

// --- 1. Monkey-patch window.fetch (as a fallback) ---
const originalFetch = window.fetch;
window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const url = args[0] instanceof Request ? args[0].url : args[0];

    if (url.includes('/api/battle/get/')) {
        console.log('[SAP Scout Inject] Intercepted battle API via fetch().');
        const clonedResponse = response.clone();
        clonedResponse.json().then(sendDataToExtension);
    }
    return response;
};

// --- 2. Monkey-patch XMLHttpRequest (The primary target) ---
const originalXhrOpen = XMLHttpRequest.prototype.open;
const originalXhrSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function(...args) {
    this._url = args[1];
    return originalXhrOpen.apply(this, args);
};

XMLHttpRequest.prototype.send = function(...args) {
    this.addEventListener('load', function() { // Use a regular function to preserve `this`
        if (this._url && this._url.includes('/api/battle/get/')) {
            console.log('[SAP Scout Inject] SUCCESS: Intercepted battle API via XMLHttpRequest.');
            try {
                let responseData = '';
                // --- THIS IS THE FIX ---
                // Check the responseType. If it's arraybuffer, decode it.
                if (this.responseType === 'arraybuffer') {
                    // Use TextDecoder to convert the binary ArrayBuffer into a string.
                    responseData = new TextDecoder('utf-8').decode(this.response);
                } else {
                    // Otherwise, we can just use responseText.
                    responseData = this.responseText;
                }

                if (responseData) {
                    const data = JSON.parse(responseData);
                    sendDataToExtension(data);
                }
            } catch (e) {
                console.error('[SAP Scout Inject] Failed to parse XHR response:', e);
            }
        }
    });
    return originalXhrSend.apply(this, args);
};

console.log('[SAP Scout Inject] Patched both fetch and XMLHttpRequest.');