module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8043,
    open: true,
    hot: true,
    historyApiFallback: true,
    proxy: {},
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
  },
}
