import path from 'path';

export default function (config, env, helpers) {
  config.resolve.modules = [ path.resolve(__dirname), 'node_modules' ];
  // change uglifyjs options for inkjs
  let plugincfg = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0];
  if (plugincfg) {
    plugincfg.plugin.options.mangle = { reserved: ['Container'] };
  }
  // production env setup
  if (env.production) {
    config.output.publicPath = '';
  }
}
