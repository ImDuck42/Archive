document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popup-close');
    const wrapper = document.querySelector('.wrapper');
    const folderList = document.getElementById('folder-list');
    const fileGrid = document.getElementById('file-grid'); // Reference to the file grid

    // Show popup after 500ms with blur effect on wrapper
    setTimeout(() => {
        popup.classList.add('popup-show');
        wrapper.classList.add('blur');
    }, 500);

    // Close popup when close button is clicked
    popupClose.addEventListener('click', () => {
        popup.classList.remove('popup-show');
        wrapper.classList.remove('blur');
    });

    // Close popup when clicking outside of the popup content
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.remove('popup-show');
            wrapper.classList.remove('blur');
        }
    });

    // Load folders from index.json
    fetch('Data/index.json')
        .then(response => response.json())
        .then(data => {
            data.folders.forEach(folder => {
                // Create folder item
                const folderItem = document.createElement('li');
                
                // Create toggle button
                const toggleButton = document.createElement('button');
                toggleButton.className = 'toggle-button';
                toggleButton.textContent = folder.name;

                // Create subcategory list
                const subcategory = document.createElement('ul');
                subcategory.className = 'subcategory';

                // Create links for subcategories
                folder.subcategories.forEach(sub => {
                    const subItem = document.createElement('li');
                    const subLink = document.createElement('a');
                    subLink.href = '#'; // Prevent navigation
                    subLink.textContent = sub.name;
                    subLink.dataset.subcategory = sub.name; // Store subcategory name in data attribute
                    subLink.dataset.files = JSON.stringify(sub.files); // Store files directly in data attribute as JSON string
                    subItem.appendChild(subLink);
                    subcategory.appendChild(subItem);
                });

                // Append button and subcategory list to folder item
                folderItem.appendChild(toggleButton);
                folderItem.appendChild(subcategory);
                folderList.appendChild(folderItem);
            });

            // Attach event listeners for toggle buttons
            const toggleButtons = document.querySelectorAll('.toggle-button');
            toggleButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const subcategory = button.nextElementSibling;
                    const isVisible = subcategory.classList.contains('show');

                    // Collapse all subcategories
                    document.querySelectorAll('.subcategory').forEach(sub => {
                        sub.classList.remove('show');
                    });

                    // Toggle the clicked subcategory
                    subcategory.classList.toggle('show', !isVisible);
                });
            });

            // Attach event listeners to subcategory links to display files
            const subLinks = document.querySelectorAll('.subcategory a');
            subLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent default link action

                    const files = JSON.parse(e.target.dataset.files); // Get the files from data attribute
                    const subcategoryName = e.target.dataset.subcategory; // Get the subcategory name from data attribute
                    loadFiles(subcategoryName, files); // Load files from the selected subcategory
                });
            });
        })
        .catch(error => console.error('Error loading index.json:', error));

    // Function to load files from a given subcategory
    function loadFiles(subcategoryName, files) {
        // Clear the current grid before adding new items
        fileGrid.innerHTML = '';

        // Iterate over each file and create elements for the grid
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            // Create content for the file item (e.g., an image or a file link)
            const fileLink = document.createElement('a');
            fileLink.href = `Archive/Files/${subcategoryName}/${file.filename}`;   // Correct path to the file
            fileLink.textContent = file.name; // Display file name
            
            fileItem.appendChild(fileLink);
            fileGrid.appendChild(fileItem);
        });
    }

    // Search and filter files by name from index.json
    window.filterFiles = function() {
        const query = document.getElementById('search').value.toLowerCase(); // Get the search query
        const fileGrid = document.getElementById('file-grid'); // Get the file grid element
        fileGrid.innerHTML = ''; // Clear the file grid before adding new items

        // Fetch the index.json file
        fetch('Data/index.json')
            .then(response => response.json())
            .then(data => {
                let matchingFiles = []; // Array to store matching files

                // Loop through each folder and subcategory
                data.folders.forEach(folder => {
                    folder.subcategories.forEach(subcategory => {
                        // Check if there are any files in the subcategory
                        if (subcategory.files) {
                            // Filter files based on the search query
                            subcategory.files.forEach(file => {
                                // Check if the file name matches the search query
                                if (file.name.toLowerCase().includes(query)) {
                                    matchingFiles.push({
                                        name: file.name,
                                        path: `${subcategory.directory}/${file.filename}` // Construct the correct path
                                    });
                                }
                            });
                        }
                    });
                });

                displayMatchingFiles(matchingFiles); // Display the collected matching files
            })
            .catch(error => console.error('Error loading index.json:', error));
    };

    // Function to display the matching files in the grid
    function displayMatchingFiles(files) {
        const fileGrid = document.getElementById('file-grid'); // Get the file grid element

        // Check if there are any matching files
        if (files.length === 0) {
            fileGrid.innerHTML = '<p>No matching files found.</p>'; // Show a message if no files match
            const noItemsFound = document.createElement('img');
            noItemsFound.src = 'Data/Images/Nope.png'; // Set the path to your image
            fileGrid.appendChild(noItemsFound); // Add image to the grid
            return;
        }

        // Iterate over each file and create elements for the grid
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';

            // Create content for the file item (e.g., an image or a file link)
            const fileLink = document.createElement('a');
            fileLink.href = file.path; // Correct path to the file
            fileLink.textContent = file.name; // Display file name
            
            // Append the link to the file item and add it to the file grid
            fileItem.appendChild(fileLink);
            fileGrid.appendChild(fileItem);
        });
    }

});
