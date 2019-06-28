const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config= require(path.resolve('./config/local/config.js')).config;

module.exports = {
	mode: 'production',
	entry: {
		"editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
		...config.entry
	},
	output: {
		filename: 'build/[name].js',
		path: path.resolve('./dist')
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		},
		{
			test:/\.js$/,
			exclude:/(node_modules|bower_components)/,//排除掉node_module目录
			use:{
				loader:'babel-loader',
				options:{
					presets:['env'], //转码规则
					plugins:['transform-runtime']
				}
			}
		}]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new UglifyJSPlugin(),
		new CopyWebpackPlugin([ // 复制插件
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
};
