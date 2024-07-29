import { spawnSync } from 'child_process';

function runCompiler(format = 'json') {
  const res = spawnSync('node', ['tools/ink-compile.cjs', format]);
  [ res.stdout.toString(), res.stderr.toString() ].forEach(
    (item) => item && console.log(item)
  );
  if (res.status !== 0) {
    throw new Error("Failed to run Ink compiler");
  }
}

export function compileInk(format) {
  return {
    name: 'compile-ink',
    configResolved() {
      runCompiler(format);
    },
  }
}

export function watchInkFiles(format) {
  return {
    name: 'watch-ink-files-hmr',
    enforce: 'post',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.ink')) {
        runCompiler(format);
        server.hot.send({
          type: 'full-reload',
          path: '*'
        });
      }
    },
  }
}
