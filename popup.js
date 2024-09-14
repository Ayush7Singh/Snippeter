// popup.js

document.addEventListener('DOMContentLoaded', () => {
    const snippetList = document.getElementById('snippet-list');
    const searchInput = document.getElementById('search');
    const friendInput = document.getElementById('addfriendsnip');
    const addButton = document.getElementById('add-snippet');
    const snippetEditor = document.getElementById('snippet-editor');
    const snippetTitleInput = document.getElementById('snippet-title');
    const snippetCodeTextarea = document.getElementById('snippet-code');
    const saveButton = document.getElementById('save-snippet');
    const cancelButton = document.getElementById('cancel-edit');
  
    let editingIndex = -1;
  
    // Load snippets from storage
    loadSnippets((snippets) => {
      renderSnippets(snippets);
    });
  
    // Add new snippet
    addButton.addEventListener('click', () => {
      editingIndex = -1;
      snippetTitleInput.value = '';
      snippetCodeTextarea.value = '';
      snippetEditor.style.display = 'block';
    });
  
    // Save snippet
    saveButton.addEventListener('click', () => {
      const title = snippetTitleInput.value.trim();
      const code = snippetCodeTextarea.value.trim();
      if (title && code) {
        if (editingIndex === -1) {
          // Add new snippet
          saveSnippet(title, code);
        } else {
          // Update existing snippet
          updateSnippet(editingIndex, title, code);
        }
        snippetEditor.style.display = 'none';
      }
    });
      // Add friends snippets
      friendInput.addEventListener('input', () => {
        const query = friendInput.value;
        const decodedSnippet = JSON.parse(atob(query));
        const title = decodedSnippet.title.trim();
      const code = decodedSnippet.code.trim();
      if (title && code) {
        if (editingIndex === -1) {
          // Add new snippet
          saveSnippet(title, code);
         // friendInput.value='';
        } 
      }
        console.log(decodedSnippet)
      });

    
        friendInput.addEventListener('blur', ()=>{
          friendInput.value='';
        });
  
    // Cancel editing
    cancelButton.addEventListener('click', () => {
      snippetEditor.style.display = 'none';
    });
  
    // Search snippets
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      loadSnippets((snippets) => {
        const filteredSnippets = snippets.filter(snippet =>
          snippet.title.toLowerCase().includes(query) ||
          snippet.code.toLowerCase().includes(query)
        );
        renderSnippets(filteredSnippets);
      });
    });

   
  
    // Render snippets
    function renderSnippets(snippets) {
      snippetList.innerHTML = snippets.map((snippet, index) => `
        <div class="snippet">
        <div class="snipper">
          <h2>${snippet.title}</h2>
          <pre>${snippet.code}</pre></div>
          <div class="snipperedit">
          <button class="copy-btn" data-index="${index}">Copy</button>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
          <button class="share-btn" data-index="${index}">Share</button>
        </div></div>
      `).join('');
  
      // Attach event listeners to newly added buttons
      document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (event) => {
          const index = parseInt(event.target.getAttribute('data-index'));
          editSnippet(index);
        });
      });
  
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
          const index = parseInt(event.target.getAttribute('data-index'));
          deleteSnippet(index);
        });
      });
  
      document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', (event) => {
          const index = parseInt(event.target.getAttribute('data-index'));
          copySnippetToClipboard(index);
        });
      });
  
      document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', (event) => {
          const index = parseInt(event.target.getAttribute('data-index'));
          generateShareableLink(index);
        });
      });
    }
  
    // Generate a shareable link for a snippet
    function generateShareableLink(index) {
        loadSnippets((snippets) => {
          const snippet = snippets[index];
          const encodedSnippet = btoa(JSON.stringify(snippet));
          const shareLink = `${encodedSnippet}`;
          navigator.clipboard.writeText(shareLink).then(() => {
            alert('Snippet copied to clipboard!');
          })
        });
      }
  
    // Copy a snippet to clipboard
    function copySnippetToClipboard(index) {
      loadSnippets((snippets) => {
        const snippet = snippets[index];
        navigator.clipboard.writeText(snippet.code).then(() => {
          alert('Snippet copied to clipboard!');
        }, (err) => {
          console.error('Failed to copy snippet: ', err);
        });
      });
    }
  
    // Edit a snippet
    function editSnippet(index) {
      loadSnippets((snippets) => {
        const snippet = snippets[index];
        snippetTitleInput.value = snippet.title;
        snippetCodeTextarea.value = snippet.code;
        editingIndex = index;
        snippetEditor.style.display = 'block';
      });
    }
  
    // Delete a snippet
    function deleteSnippet(index) {
      loadSnippets((snippets) => {
        snippets.splice(index, 1);
        chrome.storage.local.set({ snippets }, () => {
          renderSnippets(snippets);
        });
      });
    }
  
    // Save a new snippet
    function saveSnippet(title, code) {
      chrome.storage.local.get(['snippets'], (result) => {
        const snippets = result.snippets || [];
        snippets.push({ title, code });
        chrome.storage.local.set({ snippets }, () => {
          renderSnippets(snippets);
        });
      });
    }
  
    // Update an existing snippet
    function updateSnippet(index, title, code) {
      chrome.storage.local.get(['snippets'], (result) => {
        const snippets = result.snippets || [];
        snippets[index] = { title, code };
        chrome.storage.local.set({ snippets }, () => {
          renderSnippets(snippets);
        });
      });
    }
  
    // Load snippets from storage
    function loadSnippets(callback) {
      chrome.storage.local.get(['snippets'], (result) => {
        const snippets = result.snippets || [];
        callback(snippets);
      });
    }
  });
  