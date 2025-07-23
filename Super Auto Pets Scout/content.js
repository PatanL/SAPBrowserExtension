// This script runs inside the web page to find the game's iframe.
// It sends a message to our background script to say "I'm here!"

chrome.runtime.sendMessage({ type: "content_script_ready" });