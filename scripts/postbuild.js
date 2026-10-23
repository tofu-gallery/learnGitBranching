/**
 * Post-build step for the Vite pipeline.
 *
 * Tofu publishes ./dist, including the upstream assets, generated level
 * documentation, and unchanged license alongside index.html.
 */
const { cpSync, existsSync } = require('fs');
const { join } = require('path');

const buildDir = join(__dirname, '..', 'dist');

for (const dir of ['assets', 'generatedDocs', 'LICENSE.md']) {
  if (existsSync(join(__dirname, '..', dir))) {
    cpSync(join(__dirname, '..', dir), join(buildDir, dir), { recursive: true });
    console.log(`Copied ${dir} into dist/`);
  }
}
