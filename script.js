// Files array - You should add your file names here
const files = [
    "stress.txt"
];
  
// Function to load file list
function loadFiles() {
    const fileGrid = document.getElementById("file-grid");
    
    // Loop through the files and create links
    files.forEach(file => {
      const fileLink = document.createElement("a");
      fileLink.href = `./Files/${file}`;
      fileLink.textContent = file;
      fileLink.target = "_blank"; // Open in new tab
      fileLink.classList.add('file-item'); // Add a class for filtering
      fileGrid.appendChild(fileLink);
    });
  }
  
  // Function to filter files
  function filterFiles() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const fileItems = document.querySelectorAll('.file-item');
  
    fileItems.forEach(item => {
      if (item.textContent.toLowerCase().includes(searchInput)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  // Load files when the page loads
  window.onload = loadFiles;