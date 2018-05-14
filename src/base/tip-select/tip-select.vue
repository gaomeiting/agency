<template>

<transition name="slide" transition-mode="out-in">
 	<div class="tip-select" v-show="flag">
 		<ul>
			<li @click.stop="edit"><i class="iconfont icon-bofang1"></i><span>修改</span></li>
			<li @click.stop="deleteOne"><i class="iconfont icon-bofang1"></i><span>删除</span></li>
		</ul>
	</div>
</transition>
</template>
<script>
export default {
	
	data() {
		return { 
			flag: false
		}
	},
	methods: {
		show() {
			this.flag = true;
		},
		hide() {
			this.flag = false;
		},
		edit() {
			this.$emit('edit')
		},
		deleteOne() {
			this.$emit('deleteOne')
		}
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
.tip-select {
 ul {
 	background: #fff;
 	padding: 10px 8px 0;
 	box-shadow: 2px 2px 4px rgba(0,0,0,.4);
 	border-radius: 6px;
 	li {
 		padding-bottom: 10px;
 		font-size: 14px;
 		i {
 		}
 	}
 }
}
</style>