const fs = require('fs');
const path = require('path');

// Directory to scan
const directoryPath = path.join(__dirname, 'Files');

// Function to generate files.json
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  
  // Write the list of files to files.json
  const data = JSON.stringify({ files });
  fs.writeFileSync('files.json', data, (err) => {
    if (err) throw err;
    console.log('files.json has been saved!');
  });
});
