<template>
	<transition name="fade" transition-mode="out-in">
 	<div class="login-wrap">
 		<img src="./bg.jpg" alt="">
 		<div class="mask"></div>
 		<div class="login">
 			<div class="img">
 				<img src="./logo.png">
 			</div>
 			<div class="item">
 				<i class="iconfont icon-xingmingyonghumingnicheng"></i>
 				<input type="text" v-model="user.name" placeholder="请输入用户名">
 			</div>
 			<div class="item">
 				<i class="iconfont icon-Username"></i>
 				<input type="password" v-model="user.password" placeholder="请输入密码">
 			</div>
 			<div class="item">
 				<el-checkbox v-model="checked">记住密码</el-checkbox>
 			</div>
 			<div class="item">
 				<p class="btn" @click.stop="goSinger">登录</p>
 			</div>
 		</div>
 	</div>
 	</transition>
</template>
<script>
import { mapMutations } from 'vuex';
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
			//提交登陆信息
			//this.setLogin("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodmdhbWUiLCJzdWIiOiI0NTY0NTYxMjM1NiJ9.Alh9iNwa5EYq_ECPNSmT71FnSNOdcvOSoso4BzH3ls4")
			/*this.axios('/v2/movie/in_theaters?start=0&count=8&city=%E5%8C%97%E4%BA%AC').then(res => {
				console.log(123)
			})*/
			this.$router.push('/home')
		},
		...mapMutations({
			setLogin: "SET_LOGIN",
			setLogOut: "SET_LOGOUT"
		})
	}
}
</script>

<style scoped lang="scss">
.login-wrap {
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #f8f8f8;
	> img {
		width: 100%;
		height: 100%;
		filter: blur(3px);
	}
	> .mask {
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.25);
		position: absolute;
		top: 0;
		left: 0;
	}
	.login {
		width: 300px;
		padding: 30px;
		background: rgba(255,255,255,0.1);
		position: absolute;
		border-radius: 10px;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
		box-shadow:  2px 2px 8px rgba(0,0,0,0.1);

		> .img {
			width: 178px;
			height: 64px;
			position: absolute;
			top: -50px;
			left: 80px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.item {
			font-size: 14px;
			color: rgba(255,255,255,0.7);
			display: flex;
			align-items: center;
			height: 60px;
			border-bottom: 1px solid rgba(255,255,255,0.3);
			&:last-of-type, &:nth-of-type(4) {
				border-bottom: none;
			}
			&:last-of-type {
				display: flex;
				height: 40px;
				justify-content: center;
				> p {
					text-align: center;
					background: #409EFF;
					width: 100%;
					height: 40px;
					line-height: 40px;
					border-radius: 20px;

					
				}
			}
			&:nth-of-type(4) {
				display: flex;
				justify-content: flex-end;
			}
		}

	}
}
</style>