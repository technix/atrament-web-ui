import { spawnSync } from 'child_process';

function runCompiler() {
  const res = spawnSync('node', ['tools/ink-compile.cjs']);
  [ res.stdout.toString(), res.stderr.toString() ].forEach(
    (item) => item && console.log(item)
  );
  if (res.status !== 0) {
    throw new Error("Failed to run Ink compiler");
  }
}

export function compileInk() {
  return {
    name: 'compile-ink',
    configResolved() {
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
