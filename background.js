// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log('Background script loaded');
  });
  
  // Set up a listener to handle the incoming snippet data
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      if (details.url.startsWith('https://your-extension-id.chromiumapp.org/process-snippet')) {
        const snippet = JSON.parse(details.requestBody.raw[0].bytes);
        
        chrome.storage.local.get(['snippets'], (result) => {
          const snippets = result.snippets || [];
          snippets.push(snippet);
          chrome.storage.local.set({ snippets }, () => {
            console.log('Snippet added to storage');
            fetch(details.url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ success: true })
            });
          });
        });
        return { cancel: false };
      }
    },
    { urls: ['https://your-extension-id.chromiumapp.org/*'] },
    ['blocking', 'requestBody']
  );
  