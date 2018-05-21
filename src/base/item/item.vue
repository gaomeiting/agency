<template>
 	<div class="table-list" ref="tableList">
		<ul>
			<li>
				<div class="img">
					<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526011215105&di=809782c6c7241ad7f665fbaf4613b513&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fa5c27d1ed21b0ef48c509cecd1c451da80cb3ec3.jpg">
				</div>
				<div class="content">
					<div class="name">
						<div class="left">
						<div class="name-item">
							<i class="iconfont icon-xingmingyonghumingnicheng"></i><span>李文山</span>
						</div>
						<div class="name-item">
							<i class="iconfont icon-nianling"></i><span>10岁</span>
						</div>
						<div class="name-item">
							<i class="iconfont icon-nv"></i>
						</div>
						<div class="name-item">
							<i class="iconfont icon-dianhua"></i>
							<span contenteditable="true" @blur="editTel" @mouseover="editShow" @mouseout="editHide">18201491298</span>
							<transition name="fade" transition-mode="out-in">
							<i v-if="editFlag" class="iconfont icon-bianji" style="color: #0366d6"></i>
							</transition>
						</div>
						<div class="name-item">
							<i class="iconfont icon-shuliang"></i><span>45</span>
						</div>
						<div class="name-item" v-if="type == 'singer'">
							<i class="iconfont icon-guanzhu"></i><span>114</span>
						</div>
						<div class="name-item" v-if="type == 'singer'">
							<i class="iconfont icon-toupiao"></i><span>110</span>
						</div>
						<div class="name-item" v-if="type == 'teacher'">
							<i class="iconfont icon-toupiao"></i><span>13020863721@163.com</span>
						</div>
						<div class="name-item" v-if="type == 'teacher'">
							<i class="iconfont icon-toupiao"></i><span>1959151878</span>
						</div>
						</div>
						<div class="right" v-if="type == 'singer'">
							<el-button type="primary" round @click.stop="uploadStory">上传精彩故事</el-button>
						</div>
					</div>
					<div class="info">
						<div class="name-item">
							<i class="iconfont icon-jianjie"></i><span>上传精彩瞬间上传精彩瞬间上传精彩瞬间上传精彩瞬间上传精彩瞬间上传精彩瞬间</span>
						</div>
					</div>
				</div>
			</li>

		</ul>
 	</div>
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			default: 'singer'
		}
	},
	data() {
		return { 
			editFlag: false
		}
	},
	methods: {
		editShow() {
			this.editFlag = true;
		},
		editHide() {
			this.editFlag = false;
		},
		editTel(e) {
			this.$emit('editTel', e)
		},
		uploadStory() {
			this.$emit('uploadStory')
		}
	},
	components: {
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
			> div {
				display: flex;
			}
			.left {
				flex: 1;
			}
			.right {
				display: flex;
				flex: 0 0 150px;
				width: 150px;
				justify-content: end;
			}
			.name-item {
				margin-right: 20px;
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