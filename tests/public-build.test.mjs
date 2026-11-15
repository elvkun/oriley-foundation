import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const approved = ['index.html', 'docs/index.html', 'styles/site.css', 'src/site.js', 'favicon.svg', 'social-preview.svg', 'robots.txt', 'sitemap.xml', 'demo/index.html', 'demo/flow-demo.js', 'demo/flow-demo.css'];
const builder = await readFile(new URL('../scripts/build-public.mjs', import.meta.url), 'utf8');
async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'foundation-public-build-'));
  await mkdir(join(root, 'scripts'));
  await writeFile(join(root, 'scripts/build-public.mjs'), builder);
  for (const file of approved) {
    await mkdir(join(root, file, '..'), { recursive: true });
    await writeFile(join(root, file), `fixture:${file}`);
  }
  return root;
}
async function files(root, prefix = '') {
  const result = [];
  for (const entry of await readdir(join(root, prefix), { withFileTypes: true })) {
    const path = join(prefix, entry.name);
    if (entry.isDirectory()) result.push(...await files(root, path));
    else result.push(path);
  }
  return result.sort();
}
async function build(root) { await import(pathToFileURL(join(root, 'scripts/build-public.mjs')).href); }

test('public artifact contains exactly reviewed files and removes stale private output', async () => {
  const root = await fixture();
  try {
    await mkdir(join(root, '.git'));
    await writeFile(join(root, '.git/config'), 'private metadata fixture');
    await writeFile(join(root, 'AGENTS.md'), 'private instructions fixture');
    await mkdir(join(root, 'dist/.git'), { recursive: true });
    await writeFile(join(root, 'dist/.git/config'), 'stale private output');
    await build(root);
    assert.deepEqual(await files(join(root, 'dist')), [...approved].sort());
    for (const file of approved) assert.equal(await readFile(join(root, 'dist', file), 'utf8'), `fixture:${file}`);
  } finally { await rm(root, { recursive: true, force: true }); }
});

for (const target of ['index.html', 'demo']) {
  test(`build rejects symlink source ${target}`, async () => {
    const root = await fixture();
    try {
      const linkTarget = join(root, target);
      await rm(linkTarget, { recursive: true });
      await symlink(target === 'demo' ? join(root, 'docs') : join(root, 'favicon.svg'), linkTarget);
      await assert.rejects(build(root), /Public file must use regular files and directories/);
    } finally { await rm(root, { recursive: true, force: true }); }
  });
}
