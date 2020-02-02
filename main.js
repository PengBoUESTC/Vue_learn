//  注意 通过 import ** from "vue.js" 导入的不是功能完全的 vue 模块
//  通过 node_modules 文件夹下的 vue 文件夹下的 package.json 中定义的main 属性进行包的导入
//  因此有三种方式导入完整的 vue 文件， 
//  1： 通过路径进行确定
//  2： 通过修改 main 属性的值进行导入
//  3： 通过添加 webpack.config.json resolve 属性进行 alias 命令别名的设置实现
// import Vue from "./node_modules/vue/dist/vue.js"

// 如何使用 runtime 的 vue 实现功能

import Vue from "vue"
import "./src/css/main.css"

import VueRouter from "vue-router"
Vue.use(VueRouter)

import app from "./templates/app.vue"
import router from "./router.js"

let vm = new Vue({
	el : "#app",
	data : {
		msg : 'webpack',
		items : [
			{name : "李白", age : 40, id : 1},
			{name : "杜甫", age : 46, id : 2},
			{name : "杜牧", age : 50, id : 3},
			{name : "李商隐", age : 20, id : 4},
			{name : "李煜", age : 35, id : 5},
		]
	},
	render : function(createElement){
		return createElement(app)
	},
	// components: {
	// 	login
	// },
	router
})