import path from 'path';

export default function (config, env, helpers) {
  config.resolve.alias._src_ = path.resolve(__dirname, 'src');
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
