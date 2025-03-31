import { spawnSync } from 'child_process';

function renderError(server, error) {
  if (error) {
    server.ws.send({
      type: 'error',
      err: {
        message: error
      }
    });
  }
}


function runCompiler(format = 'json') {
  const res = spawnSync('node', ['tools/ink-compile.cjs', format]);
  [ res.stdout.toString(), res.stderr.toString() ].forEach(
    (item) => item && console.log(item)
  );
  return res;
}

export function compileInk(format) {
  let inkCompilerError;
  return {
    name: 'compile-ink',
    configureServer(server) {
      renderError(server, inkCompilerError);
    },
    configResolved({ mode }) {
      const res = runCompiler(format);
      if (res.status !== 0) {
        inkCompilerError = res.stdout.toString();
        if (mode !== 'development') {
          throw new Error(inkCompilerError);
        }
      }
      return res;
    },
  }
}

export function watchInkFiles(format) {
  return {
    name: 'watch-ink-files-hmr',
    enforce: 'post',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.ink')) {
        const res = runCompiler(format);
        if (res.status === 0) {
          server.hot.send({
            type: 'full-reload',
            path: '*'
          });
        } else {
          renderError(server, res.stdout.toString())
        }
      }
    },
  }
}
