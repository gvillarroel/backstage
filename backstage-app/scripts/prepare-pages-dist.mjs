import fs from 'node:fs/promises';
import path from 'node:path';

const distDir = path.join(process.cwd(), 'packages', 'app', 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

await fs.copyFile(indexPath, notFoundPath);
console.log(`Generated ${notFoundPath}`);
