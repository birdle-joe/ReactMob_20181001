module.exports = function override(config, env) {
  // 获取webpack插件
  const plugins = config.plugins;
  if (plugins && plugins instanceof Array) {
    const replacements = plugins[0].replacements;
    // 是否为生产模式
    if (Object.is(replacements.NODE_ENV, 'production')) {
      const output = config.output;
      if (output) {
        output.publicPath = './';
      }
      const options = plugins[3].options;
      if (options) {
        // 是否启用sourceMap
        options.sourceMap = true;
      }
    }
  }
  return config;
};