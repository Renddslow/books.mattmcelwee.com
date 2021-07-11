const globby = require('globby');
const mri = require('mri');

const prog = mri(process.argv.slice(2), {
  boolean: ['watch'],
});

(async () => require('esbuild').build({
  entryPoints: (await globby(['server/*'])).filter((t) => !t.endsWith('.d.ts')),
  bundle: false,
  outdir: 'functions',
  platform: 'node',
  format: 'cjs',
  minify: true,
  watch: prog.watch,
}))();

require('esbuild').build({
  entryPoints: ['client/index.tsx'],
  bundle: true,
  platform: 'browser',
  outfile: 'public/main.js',
  minify: true,
  watch: prog.watch,
});
