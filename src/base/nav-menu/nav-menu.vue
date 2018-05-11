<template>
 	<div class="nav">
		<ul>
			<li v-for="(item, index) in navList" :class="{'active' : currentIndex === index}" @click="selectItem(index)">{{item.name}}</li>
		</ul>

		<!-- <div class="search">
			
		</div> -->

		<div class="header">
			<div class="img">
				<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525953321967&di=afdfbe093a165c30985af82231207719&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F37d3d539b6003af37401eb21392ac65c1038b633.jpg">
			</div>
			<div class="btn" @click="signOut">退出</div>
		</div>
 	</div>
</template>
<script>
export default {
	props: {
		navList: {
			type: Array,
			default() {
				return [
					{ name: "首页" },
					{ name: "小声咖" },
					{ name: "指导老师" },
					{ name: "故事" },
					{ name: "参与意向" }
				]
			}
		},
		currentIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return { 
			val: ""
		}
	},
	methods: {
		selectItem(index) {
			this.$emit('selectNav', index)
		},
		signOut() {
			this.$emit('signOut')
		}	
	}
}
</script>

<style scoped lang="scss">
.nav {
	display: flex;
	width: 1200px;
	background: #24292e;
	margin: 0 auto;
	color: rgba(255,255,255,0.75);
	ul {
		display: flex;
		flex: 1;
		li {
			line-height: 3;
			padding: 0 20px;
			&.active, &:hover {
				color: #fff;
				background: #0366d6;
				border-bottom: 1px solid rgba(255,255,255,0.75);
			}


		}
	}

	
	.header {
		display: flex;
		align-items: center;
		.img {
			width: 46px;
			height: 46px;
			overflow: hidden;
			border-radius: 24px;
			img {
				width: 100%;
				min-height: 100%;
			}
		}
		.btn {
			margin-left: 10px;
			padding: 6px 10px;
			border: 1px solid rgba(255,255,255,0.75);
			border-radius: 8px;
			font-size: 12px;

		}
	}
}
</style>