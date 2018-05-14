<template>
 	<div class="table-list">
		<ul>
			<li v-for="item in 6">
				<div class="img" @click="linkDetail">
					<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526011215105&di=809782c6c7241ad7f665fbaf4613b513&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fa5c27d1ed21b0ef48c509cecd1c451da80cb3ec3.jpg">
				</div>
				<div class="content" @click="linkDetail">
					<div class="name">
						<div class="name-item">
							<i class="iconfont icon-xingmingyonghumingnicheng"></i><span>李文山</span>
						</div>
						<div class="name-item">
							<i class="iconfont icon-nv"></i>
						</div>
						<div class="name-item">
							<i class="iconfont icon-dianhua"></i><span>13833207274</span>
						</div>
						<div class="name-item">
							<i class="iconfont icon-shuliang"></i><span>45</span>
						</div>
					</div>
					<div class="info">
						<div class="name-item">
							<i class="iconfont icon-jianjie"></i><span>上传精彩瞬间上传精彩瞬间上传精彩瞬间上传精彩瞬间上传精彩瞬间上传精彩瞬间</span>
						</div>
					</div>
				</div>
				<div class="icon" @click="switchTip">
					<i class="iconfont icon-bianji"></i><span>编辑</span>
					<div class="tip-select-wrap">
						<tip-select :flag="flag" @edit="edit" @deleteOne="deleteOne"></tip-select>
					</div>
				</div>
			</li>
			
		</ul>
 	</div>
</template>
<script>
import TipSelect from 'base/tip-select/tip-select'
export default {
	props: {
		
	},
	data() {
		return { 
			flag: false,
			currentIndex: -1
		}
	},
	methods: {
		switchTip(index) {
			/*if(!ths.flag) {

			}*/
			/*currentIndex==index*/
			this.flag = !this.flag;
		},
		edit() {

			this.flag = false;
			this.$emit('linkDetail')
		},
		deleteOne() {
			this.flag = false;
			this.$emit('deletOne')
		},
		linkDetail() {
			this.$emit('linkDetail')
		}
	},
	components: {
		TipSelect
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
.table-list {
	li {
		display: flex;
		align-items: center;
		border-bottom: 1px solid $color-background;
		padding: 20px;
		position: relative;
		.tip-select-wrap {
			position: absolute;
			z-index: 999;
			right: -5px;
		}
		.name {
			display: flex;
			.name-item {
				flex: 1;
				padding-right: 8px;
				display: flex;
				align-items: center;
			}
		}
		
		.btn .el-button {
			padding: 8px 14px;
			margin-right: 8px;
		}
		.img {
			flex: 0 0 50px;
			width: 50px;
			height: 50px;
			overflow: hidden;
			border-radius: 25px;
			margin-right: 10px;
			img {
				width: 100%;
				min-height: 100%;
			}
		}
		.content {
			flex: 1;
			i {
				color: $color-background-d;
			}
			.name {
				display: flex;
				padding-bottom: 10px;
			}
			.info {
				display: flex;
			}
		}
		.icon {

		}
	}
	
	
}
</style>