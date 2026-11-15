import { copyFile, lstat, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'dist');
// Only reviewed visitor-facing files may enter the deployment artifact.
const publicFiles = [
  'index.html',
  'docs/index.html',
  'styles/site.css',
  'src/site.js',
  'favicon.svg',
  'social-preview.svg',
  'robots.txt',
  'sitemap.xml',
  'demo/index.html',
  'demo/flow-demo.js',
  'demo/flow-demo.css',
];

// Reject symlinks in source paths, including their parent directories.
for (const file of publicFiles) {
  const parts = file.split('/');
  for (let index = 1; index <= parts.length; index++) {
    const entry = await lstat(join(root, ...parts.slice(0, index)));
    if (entry.isSymbolicLink() || (index === parts.length ? !entry.isFile() : !entry.isDirectory())) {
      throw new Error(`Public file must use regular files and directories: ${file}`);
    }
  }
}
// dist is generated output owned by this script; stale files must never survive.
await rm(output, { recursive: true, force: true });
for (const file of publicFiles) {
  const destination = join(output, file);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(join(root, file), destination);
}
console.log(`Prepared ${publicFiles.length} approved public files in dist/.`);
