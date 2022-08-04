const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require("webpack");
const webpack = require('webpack');

module.exports = {
  entry: {
    index: "./src/main.tsx",
  },
  target: "electron-renderer",
  output: {
    filename: 'scripts/[name].index.prod.js',
    path: path.resolve(__dirname, "../../../dist"),
    publicPath: "/",
    clean: true, // 打包构建前清除dist文件中无用的
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: "inline-source-map",
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   eslint: {
    //     files: './src/**/*.{ts,tsx,js,jsx}',
    //     emitWarning: true,
    //   },
    // }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "../index.html"),
    }),
    new DefinePlugin({
      VERSION: JSON.stringify('5fa3b9'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash:5].css',
      chunkFilename: 'css/[id].[fullhash:5].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      component: path.resolve(__dirname, '../src/component'),
      '@': path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'thread-loader',
          {
            loader: 'esbuild-loader',
            options: {
              // cacheDirectory: true,
              loader: "jsx", // Remove this if you're not using JSX
              target: "es2015", // Syntax to compile to (see options below for possible values)
            }
          }
        ],
        exclude: /node_modules/,
      },
       // {
      //   test: /\.tsx?$|\.ts?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.tsx?$|\.ts?$/,
        exclude: /node_modules/,
        use: [
          'esbuild-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          'thread-loader',
        ],
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb 大于4kb 视为resource 模块类型
          }
        },
        generator: {
          filename: 'assets/[name].[hash:5].[ext]'
        }
      }
    ],
  },
};

