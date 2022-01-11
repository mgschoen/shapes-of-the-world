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
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.siteName || 'Playground',
      template: 'index.html',
      templateParameters: {
        mapboxPublicToken: process.env.MAPBOX_PUBLIC_TOKEN
          ? Buffer.from(process.env.MAPBOX_PUBLIC_TOKEN).toString('base64')
          : '',
      }
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
          'postcss-loader',
        ]
      },
      {
        test: /\.svelte$/,
        use: 'svelte-loader',
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
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
