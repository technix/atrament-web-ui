import { spawnSync } from 'child_process';

function runCompiler() {
  const res = spawnSync('node', ['ink-compile.cjs']);
  [ res.stdout.toString(), res.stderr.toString() ].forEach(
    (item) => item && console.log(item)
  );
}

export function compileInk() {
  return {
    name: 'compile-ink',
    buildStart() {
      runCompiler();
    },
  }
}

export function watchInkFiles() {
  return {
    name: 'watch-ink-files-hmr',
    enforce: 'post',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.ink')) {
        runCompiler();
        server.hot.send({
          type: 'full-reload',
          path: '*'
        });
      }
    },
  }
}
