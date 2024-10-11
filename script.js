// Function to load files from JSON
async function loadFiles() {
    try {
      const response = await fetch('./files.json');
      const data = await response.json();
      
      const fileListContainer = document.getElementById('file-list');
      
      // Clear existing file list (if any)
      fileListContainer.innerHTML = '';
  
      // Loop through the files array and create links
      data.files.forEach(file => {
        const fileLink = document.createElement('a');
        fileLink.href = `./Files/${file}`;
        fileLink.textContent = file;
        fileLink.target = '_blank'; // Open in new tab
        fileListContainer.appendChild(fileLink);
      });
    } catch (error) {
      console.error('Error loading files:', error);
    }
  }
  
  // Load files when the page loads
  window.onload = loadFiles;
  
  // Refresh files on button click
  document.getElementById('refresh-btn').addEventListener('click', loadFiles);
  