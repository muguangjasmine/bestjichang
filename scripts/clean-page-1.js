const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');

function cleanPagination(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === '1' && path.basename(dir) === 'page') {
        console.log(`[clean-pagination] Removing Hugo auto-alias page/1: ${path.relative(publicDir, fullPath)}`);
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        cleanPagination(fullPath);
      }
    }
  }

  // After cleaning children, if this directory is named 'page' and has no subdirectories, clean it
  if (path.basename(dir) === 'page') {
    const remaining = fs.readdirSync(dir);
    if (remaining.length === 0) {
      console.log(`[clean-pagination] Removing empty page directory: ${path.relative(publicDir, dir)}`);
      fs.rmdirSync(dir);
    }
  }
}

if (fs.existsSync(publicDir)) {
  cleanPagination(publicDir);
  console.log('[clean-pagination] Pagination directories cleaned successfully.');
} else {
  console.log('[clean-pagination] public directory not found, skipping.');
}
