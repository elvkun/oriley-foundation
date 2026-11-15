import { readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

// Developer-only sync; the published artifact never includes this script or source paths.
const source = process.argv[2];
if (!source) throw new Error('Pass the local Flow repository directory.');
const flow = resolve(source);
const foundation = fileURLToPath(new URL('../', import.meta.url));
const { build } = await import(pathToFileURL(join(flow, 'node_modules/esbuild/lib/main.js')).href);
const result = await build({
  absWorkingDir: flow,
  entryPoints: ['apps/web/src/demo-entry.tsx'],
  bundle: true,
  minify: true,
  write: false,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'eof',
  metafile: true,
});
const allowedSource = new Set([
  'apps/web/src/demo-entry.tsx',
  'apps/web/src/app/demo/flow-demo.tsx',
  'apps/web/src/app/flow-app-preview.tsx',
  'apps/web/src/app/flow-walkthrough.tsx',
]);
for (const input of Object.keys(result.metafile.inputs)) {
  if (!allowedSource.has(input) && !/^node_modules\/(react|react-dom|scheduler)\//.test(input)) {
    throw new Error('Demo includes an unapproved module; review its dependency boundary before publishing.');
  }
}
if (result.outputFiles.length !== 1) throw new Error('Expected one self-contained demo script.');
const css = await readFile(join(flow, 'apps/web/src/app/globals.css'), 'utf8');
if (/@import|url\s*\(/i.test(css)) throw new Error('Review external stylesheet assets before syncing.');
await writeFile(join(foundation, 'demo/flow-demo.js'), result.outputFiles[0].contents);
await writeFile(join(foundation, 'demo/flow-demo.css'), css + `
/* Compact standalone presentation of the actual Flow demo component. */
body { min-width: 0; }
.page-shell, .flow-demo-shell { width: min(calc(100% - 24px), 1100px); margin: 0 auto; padding: 18px 0; }
.page-shell > header, .flow-demo-shell > header { border: 1px solid var(--flow-line); border-radius: 16px; padding: 16px; background: white; }
.page-shell > header h1, .flow-demo-shell > header h1 { font-size: 24px; line-height: 1.15; margin: 8px 0; }
.page-shell > header p, .flow-demo-shell > header p { font-size: 12px; line-height: 1.6; }
.flow-walkthrough { margin: 14px 0; border: 1px solid var(--flow-line); border-radius: 16px; padding: 16px; background: white; }
.flow-walkthrough h2 { font-size: 20px; }
.flow-walkthrough p { font-size: 12px; line-height: 1.7; }
.flow-workspace { margin-top: 18px; }
@media (max-width: 400px) { .workspace-sidebar { grid-template-columns: repeat(2, minmax(0, 1fr)); } .discover-grid, .people-grid, .product-grid { grid-template-columns: 1fr; } }
`);
console.log('Synced the isolated Flow demo and stylesheet; no account SDK or source maps included.');
