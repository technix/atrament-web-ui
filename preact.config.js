import webpack from 'webpack';
import path from 'path';
import RemovePlugin from 'remove-files-webpack-plugin';
import { spawn } from 'child_process';

class WatchRunPlugin {
  constructor() {
    this.fileTimestamps = new Map();
  }

  apply(compiler) {
    compiler.hooks.watchRun.tap('WatchInkRecompile', (comp) => {
      comp.fileTimestamps.forEach((v ,k) => {
        const cached = this.fileTimestamps.get(k);
        if (cached && cached !== v && k.endsWith('.ink')) {
          console.log(`Recompile Ink file ${k}: ${this.fileTimestamps.get(k)} => ${v}`);
          const inkCompilerProcess = spawn('node', ['ink-compile.js']);
          inkCompilerProcess.stdout.on('data', (data) => console.log(data.toString()));
          inkCompilerProcess.stderr.on('data', (data) => console.error(data.toString()));
        }
      });
      this.fileTimestamps = new Map(comp.fileTimestamps);
    });
  }
}


export default function (config, env, helpers) {
  config.resolve.modules = [ path.resolve(__dirname), 'node_modules' ];

  config.plugins.push(new WatchRunPlugin());

  config.plugins.push(new RemovePlugin({
    after: {
      root: './build',
      test: [
        {
          folder: '.',
          method: (absoluteItemPath) => {
            return new RegExp(/\.css\.map$/, 'm').test(absoluteItemPath);
          }
        },
        {
          folder: './',
          method: (absoluteItemPath) => {
            return new RegExp(/\.js\.map$/, 'm').test(absoluteItemPath);
          },
          recursive: true
        },
        {
          folder: './assets/game',
          method: (absoluteItemPath) => {
            return new RegExp(/\.ink$/, 'm').test(absoluteItemPath);
          },
          recursive: true
        }
      ]
    }
  }));

  // production env setup
  if (env.production) {
    config.output.publicPath = './';
  }
}
