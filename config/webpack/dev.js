const path = require('path');
var fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pageConfig= require(path.resolve('./config/local/config.js')).config;
const makeSideBar= require(path.resolve('./src/components/make_sidebar.js')).makeSideBar;

const loadComp=(filename)=>{
  var data = fs.readFileSync(path.resolve(`./src/components/${filename}`));
  return data
}
const commonComps={
  topbar:loadComp('topbar.comp'),
  sidebar:makeSideBar(pageConfig),
  footer:loadComp('footer.comp'),
}

module.exports = {
  mode:'production',
  entry: {
      xmlformat:path.resolve('./src/js/xmlformat.js')
  },
  devtool: 'source-map',
  devServer: {
     contentBase: './dist'
    },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: "../css/[name].css"
    }),
    new CopyWebpackPlugin([ // 复制插件
        { 
            from: path.resolve('./node_modules/monaco-editor/min'), 
            to:  path.resolve('./dist/static/thirdpart')
        }
    ]),

    new HtmlWebpackPlugin({
        filename: '../xmlformat.html',
        template: './src/html/xmlformat.html',
        inject:true,
        content:{
            title:'hehe--nimeia',
            keywords:'dd,ddc',
            ...commonComps
        },
        chunks:['xmlformat']
    })
  ],
  module: {
    rules: [  
        {
            test: /\.css$/,   // 正则表达式，表示.css后缀的文件
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              'css-loader',
            ],
        },
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
    filename: '[name].js',
    path: path.resolve('./dist/static/build')
  }
};