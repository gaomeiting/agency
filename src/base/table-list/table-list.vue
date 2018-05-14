<template>
 	<div class="table-list" ref="tableList" @click.stop="hideSelect">
		<ul>
			<li v-for="(item, index) in 8">
				<div class="img" @click.stop="linkDetail">
					<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526011215105&di=809782c6c7241ad7f665fbaf4613b513&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fa5c27d1ed21b0ef48c509cecd1c451da80cb3ec3.jpg">
				</div>
				<div class="content" @click.stop="linkDetail">
					<div class="name">
						<div class="name-item half">
							<i class="iconfont icon-xingmingyonghumingnicheng"></i><span>李文山</span>
						</div>
						<div class="name-item half">
							<i class="iconfont icon-nianling"></i><span>10岁</span>
						</div>
						<div class="name-item half">
							<i class="iconfont icon-nv"></i>
						</div>
						<div class="name-item">
							<i class="iconfont icon-dianhua"></i><span>13833207274</span>
						</div>
						<div class="name-item" v-if="type == 'intention'">
							<i class="iconfont icon-dianhua"></i><span>北京市朝阳区</span>
						</div>
						<div class="name-item half" v-if=" type != 'intention'">
							<i class="iconfont icon-shuliang"></i><span>45</span>
						</div>
						<div class="name-item half" v-if="type != 'intention'">
							<i class="iconfont icon-guanzhu"></i><span>114</span>
						</div>
						<div class="name-item half" v-if="type != 'intention'">
							<i class="iconfont icon-toupiao"></i><span>110</span>
						</div>
						<div class="name-item half" v-if="type == 'intention'">
							<i class="iconfont" :class="playCls[index]" @click.stop="switchState(index, playCls[index])"></i>
						</div>
						<div class="name-item" v-if="type == 'intention'">
							<el-select v-model="value[index]" :placeholder='options[0].label' @change="changeVal">
							    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							    </el-option>
							</el-select>
						</div>
					</div>
					<div class="info" v-if=" type !== 'intention'">
						<div class="name-item">
							<i class="iconfont icon-jianjie"></i><span>上传精彩瞬间上传精彩瞬间上传精彩瞬间上传精彩瞬间上传精彩瞬间上传精彩瞬间</span>
						</div>
					</div>
				</div>
				<div class="btn" v-if="type == 'singer'"><el-button type="primary" round>上传精彩瞬间</el-button></div>
				<div class="icon" @click.stop="switchTip(index)" v-if=" type !== 'intention'">
					<i class="iconfont icon-bianji"></i><span>编辑</span>
					<div class="tip-select-wrap">
						<tip-select @edit="edit" @deleteOne="deleteOne" ref="tipSelect"></tip-select>
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
		type: {
			type: String,
			default: 'singer'
		},
		options: {
			type: Array,
			default() {
				return [{
			          value: '0',
			          label: '待联系'
			        }, {
			          value: '1',
			          label: '已确认'
			        }, {
			          value: '2',
			          label: '已取消'
			        }]
			}
		},
		playCls: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return { 
			flag: false,
			currentIndex: -1,
			value: []
		}
	},
	methods: {
		switchState(index, cls) {
			this.$emit('switchState', index, cls)
		},
		changeVal(option) {
			console.log(option)
		},
		hideSelect() {
			if(!this.$refs.tipSelect[this.currentIndex]) return;
			this.$refs.tipSelect[this.currentIndex].hide();
		},
		switchTip(index) {
			this.currentIndex = index;
			this.$refs.tipSelect[this.currentIndex].show()
			
		},
		edit() {

			this.$refs.tipSelect[this.currentIndex].hide()
			this.$emit('linkDetail')
		},
		deleteOne() {
			this.$refs.tipSelect[this.currentIndex].hide()
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
			.half {
				flex: 0.5;
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