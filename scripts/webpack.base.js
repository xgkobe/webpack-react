const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { DefinePlugin } = require("webpack");

console.log(process.env);

module.exports = {
  entry: {
    index: "./src/main.tsx",
  },
  output: {
    filename: '[name].index.prod.js',
    path: path.resolve(__dirname, "../dist"),
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
    new CompressionPlugin({
      test: /\.js$|\.html$|\.css/, // 匹配文件名
      threshold: 10240, // 文件压缩阈值，对超过10k的进行压缩
      deleteOriginalAssets: false, // 是否删除源文件
    }),
    new HtmlWebpackPlugin({
      title: "管理输出hh",
      filename: "index.html",
      inject: false,
      template: path.resolve(__dirname, "../index.html"),
    }),
    new DefinePlugin({
      VERSION: JSON.stringify('5fa3b9'),
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      component: path.resolve(__dirname, '../src/component'),
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
        test: /\.less$/i,
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
      // {
      //   test: /\.tsx?$|\.ts?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      // {
      //   test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 8192000,
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: "asset/resource",
      // },
      // {
      //   test: /\.(csv|tsv)$/i,
      //   use: ["csv-loader"],
      // },
      // {
      //   test: /\.xml$/i,
      //   use: ["xml-loader"],
      // },
      // {
      //   test: /\.toml$/i,
      //   type: "json",
      //   parser: {
      //     parse: toml.parse,
      //   },
      // },
      // {
      //   test: /\.yaml$/i,
      //   type: "json",
      //   parser: {
      //     parse: yaml.parse,
      //   },
      // },
      // {
      //   test: /\.json5$/i,
      //   type: "json",
      //   parser: {
      //     parse: json5.parse,
      //   },
      // },
      
    ],
  },
};

