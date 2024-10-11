// Files array - You should add your file names here
const files = [
    "stress.txt"
];
  
  // Function to load file list
  function loadFiles() {
    const fileListContainer = document.getElementById("file-list");
    
    // Loop through the files and create links
    files.forEach(file => {
      const fileLink = document.createElement("a");
      fileLink.href = `./Files/${file}`;
      fileLink.textContent = file;
      fileLink.target = "_blank"; // Open in new tab
      fileListContainer.appendChild(fileLink);
    });
  }
  
  // Load files when the page loads
  window.onload = loadFiles;
  