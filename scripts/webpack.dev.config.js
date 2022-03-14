const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 8043,
    proxy: {
      '/api/oak': {
        target: 'http://localhost:3000',
      },
      '/api/oak-proxy': {
        target: 'http://localhost:3000',
      },
      '/api/oak-dataInsight': 'http://localhost:3000',
      '/test': 'http://127.0.0.1:4001',
      '/api/oakProperty': {
        target: 'http://localhost:3000'
      }
    },
  },
}

module.exports = merge(baseConfig, devConfig);
