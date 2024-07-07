import { spawnSync } from 'child_process';

export function watchInkFiles() {
  return {
    name: 'watch-ink-files-hmr',
    enforce: 'post',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.ink')) {
        const res = spawnSync('node', ['ink-compile.cjs']);
        [ res.stdout.toString(), res.stderr.toString() ].forEach(
          (item) => item && console.log(item)
        );
        server.hot.send({
          type: 'full-reload',
          path: '*'
        });
      }
    },
  }
}
