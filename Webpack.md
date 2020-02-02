## webpack 学习

### 起步

+ ```webpack``` 是基于 ```node.js``` 的，因此安装 ```webpack``` 之前需要安装 ```node.js``` 

+ 安装 ```webpack```
~~~bash
npm install webpack --save-dev 
npm install webpack@<version> --save-dev
~~~

+ ```webpack``` 4.0+ 版本需要安装 ```webpack-cli```
~~~bash
npm install webpack-cli --save-dev
~~~

+ ```webpack``` 的配置文件 ```webpack.config.js```，其本质是一个 ```js``` 文件，向外暴露一个配置对象
~~~javascript
const path = require("path")

module.exports = {
	entry : "../src/main.js" // 定义入口文件

	output : {
		path : path.join(__dirname, "./dist"), // 定义出口文件所在路径
		filename : "bundle.js" //定义出口文件名
	}
}
~~~

+ ```webpack-dev-server``` 用于实时的响应文件的变化并对项目进行重启

	- 安装
	~~~bash
	npm install webpack-dev-server --save-dev
	~~~

	- 配置
	~~~json
	"dev" : "webpack-dev-server --open --port 3001 --hot --contentBase src"
	~~~

+ <font color = "red">在 ```webpack``` 中使用 ```vue``` </font>
~~~javascript
// 通过以下方式导入的为完全版本的 vue 
import Vue from "../node_modules/vue/dist/vue.js"
~~~

### 概念

1. 入口(entry) ： webpack 应该使用哪个模块作为构建其内部**依赖图**的开始

	+ 通过 ```webpack.config.js``` 文件中的 ```entry``` 属性进行配置

2. 出口(output) : webpack 应该在哪里输出创建的 ```bundles``` ,默认值为 ```./dist```

	+ 通过 ```webpack.config.js``` 文件中的 ```output```参数进行设置

~~~javascript
module.exports = {
	entry : "",
	output : {
		filename : "",
		path : ""
	}
}
~~~

3. loader : 使webpack 处理非 ```javascript``` 文件，将所有类型的模块转换为 ```webpack``` 能够处理的有效模块

	+ 在 ```webpack.config.js``` 文件的 <font color = "red">```module.rules```</font> 属性中进行配置

	+ ```test``` 属性，用于标识出应该被对应的 ```loder``` 进行转换的某个或某些文件

	+ ```use``` 属性， 表明转换时应用的 ```loder```

~~~javascript
module.exports = {
	entry : "",
	output : {
		filename : "",
		path : ""
	},

	module : {
		rules : [
			{test : '正则表达标识文件类型', use : "loser_name"}
		]
	}
}
~~~

4. 插件(plugins) : 打包优化与压缩，重新定义环境变量等强大功能

	+ 通过 ```require``` 导入要使用的插件，在 ```plugins``` 属性中添加插件

~~~javascript
module.exports = {
	...
	plugins : [
		plugin_name,
		...
	]
}
~~~

5. 模式（mode）: 通过设置 ```mode``` 参数，启用 webpack 相应模式下的内置优化，只有两种值 ```development``` ```production```

~~~javascript
module.exports = {
	...
	mode : 'development' // 或者使用 production
}
~~~


### 入口

#### 单个入口

+ 非简写方式
~~~javascript
module.exports = {
	entry : {
		main : "path"
	}
}
~~~

+ 简写方式
~~~javascript
module.exports = {
	entry : "path"
}
~~~

#### 多入口文件对象语法

+ 使用对象语法是扩展方式最好的语法
~~~javascript
module.exports = {
	entry : {
		entryName1 : "path1",
		entryName2 : "path2"
	}
}
~~~

+ <font color = "red">可以用来分离应用程序与第三方库入口</font>

+ <font color = "red">多页面应用程序的入口文件的配置</font>

### 输出(output)

+ <font color = "red"> 即使存在多个 ```entry``` ,也只能存在**一个** ```output```配置</font>

+ 当存在多个入口文件时， 出口文件名需要通过<font color = "red">占位符</font>进行配置，占位符包括以下几种

	- 入口名称： ```[name]```

	- 内部 ```chunk id``` : ```[id]```

	- 构建过程中的唯一 ```hash``` 生成： ```[hash]```

	- 基于每个 ```chunk``` 的 ```hash``` : ```[chunkhash]```

+ 
~~~javascript
module.exports = {
	output : {
		filename : [name].js, 
		path : path.join(_dirname, '/dist')
	}
}
~~~

### 模式(mode)

+ 告诉 ```webpack``` 使用响应的 内置优化

+ 通过配置文件实现 mode 的配置， 或者通过 CLI 命令参数实现 mode 配置
~~~javascript
{
	mode : "production"
}
~~~
~~~bash
webpack --mode=production
~~~

+ 不同的模式会在 ```plugins``` 属性中添加不同的插件，实现相应的配置
| 选项 | 描述 |
|:--|:----|
| development | 会将 ```process.env.NODE_ENV``` 的值设为 ```development```。启用 ```NamedChunksPlugin``` 和 ```NamedModulesPlugin```|
| production | 会将 ```process.env.NODE_EN``` 的值设为 ```production```。启用 ```FlagDependencyUsagePlugin```, ```FlagIncludedChunksPlugin```, ```ModuleConcatenationPlugin```, ```NoEmitOnErrorsPlugin```, ```OccurrenceOrderPlugin```, ```SideEffectsFlagPlugin``` 和 ```UglifyJsPlugin```.|

### loader 

+ ```loader``` 用于对模块的源代码进行转换，在 ```import``` 或者 加载模块时预处理文件，将文件从不同的语言转换为 ```javascript```,或将内联的图像转换为 ```data URL``` 

+ 首先要安装对应的 loader 模块， 然后在配置文件的 ```module.rules``` 属性中进行配置
~~~bash
npm install css-loader --save-dev
npm install ts-loader --save-dev 
~~~
~~~javscript
{
	module{
		rules : [
			{test : 正则表达, use : "loader_name"},
			{test : /\.css$/, use : ["style-loader","css-loader"]},
			{test : /\.ts$/, use : "ts-loader"}.
		]
	}
}
~~~

+ <font color = "red">其中 use 参数可以是一个数组，用于设置多个loader 文件，loader文件调用顺序为 从后往前 </font>

+ <font color = "red"> 三种使用```loader```的方式</font>

	- 配置文件

	- 内联 ： 使用 ** ！** 分割每个loader ，同时可使用 **?** 查询字符串
	~~~javascript
	import Styles from "style-loader!css-loader"
	~~~

	+ 使用 CLI 

+ ```loader``` 特性

	- 支持链式传递

	- 可以是同步的也可以是异步的

	- 运行在 Node.js中

	- 接收查询参数用于对 loader 的配置

	- 能够使用 options 对象进行配置

	- 可以在 package.json 中定义 loader 字段，将普通模块导出为 loader

	- plugins 可以为 loader 带来更多特性

	- loader 可以产生额外的任意文件

### 插件(plugins)

+ <font color = "red"> ```webpack``` 插件是一个 具有 ```apply```  属性的 ```javascript``` 对象，```apply``` 属性会被 webpack compiler 调用。并且compiler 对象可在整个编译生命周期访问</font>

+ 用法： 在 ```plugins``` 属性中传入 ```new``` 实例
~~~javascript
{
	...
	plugins : [
		new HtmlWebpackPlugin({template : ""})
	]
}
~~~

### 模块解析

+ 能够解析三种路径

	- 相对路径
	~~~javascript
	import "../src/index.js"
	~~~

	- 绝对路径
	~~~javascript
	import "/home/me/file"
	~~~

	- 模块路径
	~~~javascript
	import "module_name"
	~~~


### loaders && plugins

#### html-webpack-plugin

+ 用于在内存中生成 html 页面

+ 使用方式

	1. 安装插件
	~~~bash
	npm install --save-dev html-webpack-plugin
	~~~

	2. 在配置文件中导入插件
	~~~javascript
	const HtmlWebpackPlugin = require(html-webpack-plugin)
	~~~

	3. 在 ```plugins``` 属性中配置该插件
	~~~javascript
	plugins : [
		new HtmlWebpackPlugin({
			template : "", // 生成内存中文件的模板文件
			filename : "" //生成文件的名字，默认为 index.html
		})
	]
	~~~

#### babel-loader

+ 用于将 ES6 语法转换

+ 使用方式

	1. 安装 loader 以及 babel 、 babel 转换规则	
	~~~bash
	npm install @babel/core @babel/preset-env babel-loader --save-dev
	~~~

	2. 在配置文件的 module 属性中进行 loader 的配置
	~~~javascript
	module : {
		rules : [
			{
				test : "/\.js/",
				// exclude 属性用于排除不进行转换的文件或目录
				exclude : /node_modules/,
				// 使用扩展性更好的对象模式，进行 loader 的配置
				use : {
					loader : "babel-loader",
					options : {
						preset : ["@babel/preset-env"]
					}
				}
			}
		]
	}
	~~~

#### url-loader 

+ 用于解析 ```css``` 文件中的 ```url``` 参数，

+ 安装
~~~bash
npm install url-loader file-loader //其中 file-loader 为 url-loader 的内部以来
~~~

+ 使用
~~~javascript
modules : {
	roules: [
		{test : /\.(jpg|jpeg)$/, use : "url-loader"}
	]
}
~~~