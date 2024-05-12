import webpack from 'webpack';
import path from 'path';
import RemovePlugin from 'remove-files-webpack-plugin';

export default function (config, env, helpers) {
  config.resolve.modules = [ path.resolve(__dirname), 'node_modules' ];

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
