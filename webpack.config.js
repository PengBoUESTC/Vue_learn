let path = require("path")
let HtmlWebpackPlugin  = require("html-webpack-plugin")
let VueLoaderPlugin = require("vue-loader/lib/plugin")
// Vue loader 需要设置该 plugin

module.exports = {
	entry : "./main.js",

	output : {
		path: path.join(__dirname, "./dist"),
		filename : "bundle.js"
	},

	plugins : [
		new HtmlWebpackPlugin({
			//  根据指定模板生成内存中的页面
			template : "./src/index.html",
		}),
		new VueLoaderPlugin()
	],

	module : {
		// 配置 babel 转换loader
		rules : [
			{
				test : /\.js$/,
				use : { 
					loader : "babel-loader",
					options : {
						presets : ["@babel/preset-env"]
					}
				},
				exclude : /node_modules/
			},
			//  配置 css-loader 识别css 文件
			{
				test : /\.css$/,
				use : ["style-loader","css-loader"]
			},

			// 配置url -loader
			{
				test : /\.(jpg|gif|jpeg|png)$/,
				use : "url-loader"
			},

			// 配置 vue-loader 
			{
				test : /\.vue$/,
				use : "vue-loader"
			}

		]
	},

	mode : "development"
}