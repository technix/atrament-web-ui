import { spawnSync } from 'child_process';

function renderError(server, error) {
  if (error) {
    server.ws.send({
      type: 'error',
      err: {
        message: error,
        stack: ''
      }
    });
  }
}


function runCompiler(format = 'json') {
  const res = spawnSync('node', ['tools/ink-compile.cjs', format]);
  let output = '';
  [ res.stdout.toString(), res.stderr.toString() ].forEach(
    (item) => {
      if (!item) {
        return;
      }
      console.log(item);
      output += item;
    }
  );
  return [ res, output ];
}

export function compileInk(format) {
  let inkCompilerError;
  return {
    name: 'compile-ink',
    configureServer(server) {
      renderError(server, inkCompilerError);
    },
    configResolved({ mode }) {
      const [ res, output ] = runCompiler(format);
      if (res.status !== 0) {
        inkCompilerError = output;
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
      if (!file.endsWith('.ink')) {
        return;
      }
      const [ res, output ] = runCompiler(format);
      if (res.status === 0) {
        server.hot.send({
          type: 'full-reload',
          path: '*'
        });
      } else {
        renderError(server, output)
      }
    },
  }
}
