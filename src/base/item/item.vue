<template>
 	<div class="table-list" ref="tableList">
		<ul>
			<li>
				<div class="img">
					<img :src="singer.avatar">
				</div>
				<div class="content">
					<div class="name">
						<div class="left">
						<div class="name-item" v-if="singer.name">
							<i class="iconfont icon-xingmingyonghumingnicheng"></i><span>{{singer.name}}</span>
						</div>
						<div class="name-item" v-if="singer.age">
							<i class="iconfont icon-nianling"></i><span>{{singer.age}}岁</span>
						</div>
						<div class="name-item" v-if="singer.sex">
							<i v-if="singer.sex === '女'" class="iconfont icon-nv"></i>
							<i v-if="singer.sex === '男'" class="iconfont icon-nan"></i>
						</div>
						<div class="name-item">
							<i class="iconfont icon-dianhua"></i>
							<span ref="tel" contenteditable="true" @blur="editTel" @mouseover="editShow" @mouseout="editHide">{{singer.tel}}</span>
							<transition name="fade" transition-mode="out-in">
							<i v-if="editFlag" class="iconfont icon-bianji" style="color: #0366d6"></i>
							</transition>
						</div>
						<div class="name-item" v-if="singer.state">
							<i class="iconfont icon-shuliang"></i><span>{{singer.state.storyCount}}</span>
						</div>
						<div class="name-item" v-if="singer.state">
							<i class="iconfont icon-guanzhu"></i><span>{{singer.state.fllowCount}}</span>
						</div>
						<div class="name-item" v-if="singer.state">
							<i class="iconfont icon-toupiao"></i><span>{{singer.state.voteCount}}</span>
						</div>
						<div class="name-item" v-if="singer.qq">
							<i class="iconfont icon-toupiao"></i><span>{{singer.qq}}</span>
						</div>
						<div class="name-item" v-if="singer.email">
							<i class="iconfont icon-toupiao"></i><span>{{singer.email}}</span>
						</div>
						</div>
						<div class="right" v-if="type == 'singer'">
							<el-button type="primary" round @click.stop="uploadStory">上传精彩故事</el-button>
						</div>
					</div>
					<div class="info" v-if="singer.slogan">
						<div class="name-item">
							<i class="iconfont icon-jianjie"></i><span>{{singer.slogan}}</span>
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
		},
		singer: {
			type: Object,
			default () {
				return {}
			}
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
		editTel() {
			let dom = this.$refs.tel
			console.log(dom.innerHTML)
			this.$emit('editTel', dom)
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