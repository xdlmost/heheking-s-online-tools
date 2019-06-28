const path = require('path');
var fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config= require(path.resolve('./config/local/config.js')).config;

module.exports = {
  mode:'production',
  entry: config.entry,
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([ // 复制插件
        { 
            from: path.resolve('./node_modules/monaco-editor/min'), 
            to:  path.resolve('./dist/thirdpart')
        },
        { 
          from: path.resolve('./static/'), 
          to:  path.resolve('./dist/static')
        },
        { 
          from: path.resolve('./src/css'), 
          to:  path.resolve('./dist/build/css')
        },
    ]),

    ...config.plugins
    
  ],
  module: {
    rules: [  
        {
          test: /\.ts$/,
          use: "ts-loader"
        }
    ]
  },
  resolve: {
    extensions: [
        '.ts'
    ]
  },

  output: {
    filename: 'build/[name].js',
    path: path.resolve('./dist')
  }
};