<template>
	<div>
		<h1> 登录子组件 </h1>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				name : "PB"
			}
		},
		props : ["color"]
	}
</script>

<style scoped>
	h1 {
		color : red
	}
</style>