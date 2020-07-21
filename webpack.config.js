const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash'); 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
        {
          test: /\.css$/i,
          use: [
            (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
            'css-loader', 
            'postcss-loader'                  
          ]
        },
        { 
          test: /\.js$/,
          use: { loader: "babel-loader" }, 
          exclude: /node_modules/ 
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: 'fonts',
                outputPath: 'fonts',
                useRelativePath: true,
                esModule: false,
              }
            }
          ],
        },
        {
          test: /\.(png|jpe?g|gif|ico|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: 'images',
                outputPath: 'images',
                useRelativePath: true,
                esModule: false,
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
              }
            },
          ]
        },
    ]
  },
  plugins: [ 
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default'],
        },
        canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
        NODE_ENV : JSON.stringify(process.env.NODE_ENV)
    }),
  ]
};