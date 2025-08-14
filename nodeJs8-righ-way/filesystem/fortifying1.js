// 1. Import Node.js's built-in 'fs' (File System) module
const fs = require('fs');

// 2. Define a function to watch a file with error handling
function watchFile(filename) {
  // 3. Check if no filename was provided
  if (!filename) {
    console.error('Usage: node watcher.js <filename>');
    process.exit(1); // Exit with error code 1 (indicates failure)
  }

  // 4. Verify the file exists before watching (synchronous check)
  try {
    fs.accessSync(filename); // Throws error if file doesn't exist
  } catch (err) {
    // 5. Handle specific "file not found" error
    if (err.code === 'ENOENT') {
      console.error(`Error: File "${filename}" not found!`);
    } else {
      // 6. Handle other unexpected errors (e.g., permission issues)
      console.error('Unexpected error:', err);
    }
    process.exit(1); // Exit on any file access error
  }

  // 7. Start watching the file
  const watcher = fs.watch(filename, (eventType, changedFilename) => {
    // 8. Log changes with a timestamp
    console.log(`[${new Date().toISOString()}] ${eventType}: ${changedFilename}`);

    // 9. Special handling for 'rename' events (file deleted/renamed)
    if (eventType === 'rename') {
      fs.access(filename, (err) => {
        if (err) console.log('--> File was likely deleted');
        else console.log('--> File was renamed or moved');
      });
    }
  });

  // 10. Handle watcher errors (e.g., file deleted while watching)
  watcher.on('error', (err) => {
    console.error('Watcher failed:', err);
    watcher.close(); // Clean up the watcher
  });

  // 11. Close watcher gracefully on Ctrl+C (SIGINT signal)
  process.on('SIGINT', () => {
    watcher.close();
    console.log('\nStopped watching.');
    process.exit(); // Exit cleanly
  });

  // 12. Confirm watcher is active
  console.log(`Watching ${filename} (Press Ctrl+C to stop)`);
}

// 13. Start watching the file specified in command-line argument
watchFile(process.argv[2]);
