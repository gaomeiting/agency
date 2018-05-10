<template>
	<transition name="fade" transition-mode="out-in">
 	<div class="page">
 		<div class="login">
 			<div class="item">
 				<el-input prefix-icon="el-icon-info" v-model="user.name" placeholder="用户名"></el-input>
 			</div>
 			<div class="item">
 				<el-input prefix-icon="el-icon-date" v-model="user.password" placeholder="密码"></el-input>
 			</div>
 			<div class="item">
 				<el-checkbox v-model="checked">记住密码</el-checkbox>
 			</div>
 			<div class="item">
 				<el-button type="primary" @click="goSinger">登录</el-button>
 			</div>
 		</div>
 	</div>
 	</transition>
</template>
<script>
export default {
	data() {
		return {
			user : {
				name:"",
				password:""
			},
			checked: true
		}
	},
	methods: {
		goSinger() {
			this.$router.push('/singer')
		}
	}
}
</script>

<style scoped lang="scss">
.page {
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #f8f8f8;
	.login {
		width: 300px;
		padding: 10px;
		background: #fff;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
		.item {
			&:last-of-type {
				display: flex;
				flex-direction: column;
				align-item: center;
			}
			&:nth-of-type(3) {
				text-align: right;
			}
			margin-bottom: 8px;
		}

	}
}
</style>