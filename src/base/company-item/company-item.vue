<template>
 	<div class="table-list" ref="tableList">
		<ul>
			<li>
				<div class="img">
					<img :src="'/hversion'+res.id+'.jpg'">
				</div>
				<div class="content">
					<div class="name">
						<div class="name-item">
							<span>{{res.name}}</span>
						</div>
					</div>
					<div class="name" v-if="res.linkMan">
						<div class="name-item">
							<i class="iconfont icon-xingmingyonghumingnicheng"></i><span>{{res.linkMan.name}}</span>
						</div>
						<div class="name-item">
							<i class="iconfont icon-dianhua"></i>
							<span contenteditable="true" @blur="editTel($event,0)" @mouseover="editShow(0)" @mouseout="editHide(0)">{{res.linkMan.mobile}}</span>
							<transition name="fade" transition-mode="out-in">
							<i v-if="editFlag[0]" class="iconfont icon-bianji" style="color: #0366d6"></i>
							</transition>
						</div>
						<div class="name-item">
							<i class="iconfont icon-youxiang"></i>&nbsp;
							<span>{{res.linkMan.email}}</span>
						</div>

						
					</div>
					<div class="name" v-if="res.shortName">
						<div class="name-item">
							<span>简称:{{res.shortName}}</span>
						</div>
						<div class="name-item" v-if="res.vendorAddress">
							<i class="iconfont icon-dizhi"></i>
							<span>{{res.vendorAddress.province}} {{res.vendorAddress.city}}&nbsp;</span>
							<span contenteditable="true" @blur="editTel($event,1)" @mouseover="editShow(1)" @mouseout="editHide(1)">{{res.vendorAddress.address}}</span>
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
		res : {
			type: Object,
			default() {
				return {}
			}
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