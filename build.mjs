import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';

await build({
  entryPoints: ['src/app.jsx'],
  bundle: false,
  loader: { '.jsx': 'jsx' },
  jsx: 'transform',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  minify: true,
  target: 'es2018',
  outfile: 'dist/app.js',
  legalComments: 'none',
});

// Inline replace inside index.html: swap <script type="text/babel">…</script> for <script src="dist/app.js" defer></script>
const html = readFileSync('index.html', 'utf8');
const replaced = html.replace(
  /<script type="text\/babel" data-presets="react">[\s\S]*?<\/script>/,
  '<script src="dist/app.js" defer></script>'
);
// Также убрать загрузку babel-standalone из CDN
const cleaned = replaced.replace(
  /\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone[^>]*><\/script>/,
  ''
);
writeFileSync('index.html', cleaned);
console.log('build done');
