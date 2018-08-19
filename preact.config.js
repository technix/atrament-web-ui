export default function (config, env, helpers) {
  // change uglifyjs options for inkjs
  let uglifyjs = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0].plugin;
  uglifyjs.options.mangle = { reserved: ['Container'] };
  // production env setup
  if (env.production) {
    config.output.publicPath = '';
  }
}
