<template>
 	<div class="table-list" ref="tableList">
		<ul>
			<li>
				<div class="img">
					<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526011215105&di=809782c6c7241ad7f665fbaf4613b513&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fa5c27d1ed21b0ef48c509cecd1c451da80cb3ec3.jpg">
				</div>
				<div class="content">
					<div class="name">
						<div class="name-item">
							<span>石家庄小楼文化传播文化有限公司</span>
						</div>
					</div>
					<div class="name">
						<div class="name-item">
							<i class="iconfont icon-xingmingyonghumingnicheng"></i><span>迎曦</span>
						</div>
						<div class="name-item">
							<i class="iconfont icon-dianhua"></i>
							<span contenteditable="true" @blur="editTel($event,0)" @mouseover="editShow(0)" @mouseout="editHide(0)">13912342345</span>
							<transition name="fade" transition-mode="out-in">
							<i v-if="editFlag[0]" class="iconfont icon-bianji" style="color: #0366d6"></i>
							</transition>
						</div>
						<div class="name-item">
							<i class="iconfont icon-youxiang"></i>&nbsp;
							<span>abc@abc.com.cn</span>
						</div>

						
					</div>
					<div class="name">
						<div class="name-item" v-if="type == 'singer'">
							<span>简称:小楼文化</span>
						</div>
						<div class="name-item" v-if="type == 'singer'">
							<i class="iconfont icon-dizhi"></i>
							<span>河北省 石家庄市&nbsp;</span>
							<span contenteditable="true" @blur="editTel($event,1)" @mouseover="editShow(1)" @mouseout="editHide(1)">裕华区万达广场A座1023室</span>
							<transition name="fade" transition-mode="out-in">
							<i v-if="editFlag[1]" class="iconfont icon-bianji" style="color: #0366d6"></i>
							</transition>
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
			editFlag: [false, false]
		}
	},
	methods: {
		editShow(index) {
			console.log(index, 'editshow')
			let arr = this.editFlag.slice();
			arr[index] = true;
			this.editFlag = arr;
		},
		editHide(index) {
			let arr = this.editFlag.slice();
			arr[index] = false;
			this.editFlag = arr;
		},
		editTel(e, index) {
			this.$emit('editTel', e, index)
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
			font-size: 14px;
			&:first-child {
				font-size: 16px;
			}
			
		}
		.name-item {

			margin-right: 20px;
			padding-right: 8px;
			display: flex;
			align-items: center;
		}
		.btn .el-button {
			padding: 8px 14px;
			margin-right: 8px;
		}
		.img {
			flex: 0 0 60px;
			width: 60px;
			height: 60px;
			overflow: hidden;
			border-radius: 30px;
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
		}
	}
	
	
}
</style>