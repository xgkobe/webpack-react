const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'production',
}

module.exports = merge(baseConfig, devConfig);
