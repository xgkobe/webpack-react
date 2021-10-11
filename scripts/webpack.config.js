const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  devServer: {
    static: './dist',
    hot: true
  }
}

module.exports = merge(baseConfig, devConfig);
