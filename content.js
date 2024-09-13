// content.js

// Listen for messages from the share link
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'addSnippet' && message.snippet) {
      // Add the snippet to local storage
      chrome.storage.local.get(['snippets'], (result) => {
        const snippets = result.snippets || [];
        snippets.push(message.snippet);
        chrome.storage.local.set({ snippets }, () => {
          alert('Snippet added successfully!');
        });
      });
    }
  });
  