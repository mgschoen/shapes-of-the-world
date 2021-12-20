const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {};
try {
  config = require('./config.json');
} catch (_) {}

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    index: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.siteName || 'Playground',
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
    ],
  },
  output: {
      filename: '[name].[fullhash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
  },
  devServer: {
    hot: false,
    static: {
      directory: './dist'
    }
  },
}
