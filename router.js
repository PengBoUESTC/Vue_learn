import VueRouter from "vue-router"

import account from "./templates/account.vue"
//  webpack 需要安装 对应的loader 进行 .vue 文件的解析
//  vue-loader vue-template-compiler
//  设置 vue-loader/lib/plugin 中的VueLoaderPlugin 插件
import list from "./templates/list.vue"

import login from "./templates/login.vue"
import register from "./templates/register.vue"

let router = new VueRouter({
	routes : [
		{path : "/", redirect : "/account"},
		{
			path : "/account", 
			component : account,
			children : [
				{path : '/login', component : login},
				{path : "/register", component : register}
			]
		},
		{path : '/list', component : list}
	]
})

export default router
