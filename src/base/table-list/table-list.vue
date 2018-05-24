<template>
 	<div class="table-list" ref="tableList" @click.stop="hideSelect">
		<ul>
			<li v-for="(item, index) in list">
				<div class="img" @click.stop="linkDetail">
					<img :src="item.avatarUrl">
				</div>
				<div class="content" @click.stop="linkDetail(item.id)">
					<div class="name">
						<div class="name-item half">
							<i class="iconfont icon-xingmingyonghumingnicheng"></i><span>{{item.name}}</span>
						</div>
						<div class="name-item half">
							<i class="iconfont icon-nianling">&nbsp;</i>
							<span>{{getAge(item.birthDate.year)}} 岁</span>
						</div>
						<div class="name-item half">
							<i v-if="item.gender=='女'" class="iconfont icon-nv"></i>
							<i v-if="item.gender=='男'" class="iconfont icon-nan"></i>
						</div>
						<div class="name-item">
							<i class="iconfont icon-dianhua"></i><span>{{item.phone}}</span>
						</div>
						<div class="name-item" v-if="type == 'intention'">
							<i class="iconfont icon-dianhua"></i><span>{{item.item.city}}</span>
						</div>
						<div class="name-item half" v-if="item.stat &&item.stat.storyCount">
							<i class="iconfont icon-shuliang"></i><span>{{item.stat.storyCount}}</span>
						</div>
						<div class="name-item half" v-if="item.stat &&item.stat.followCount">
							<i class="iconfont icon-guanzhu"></i><span>{{item.stat.followCount}}</span>
						</div>
						<div class="name-item half" v-if="item.stat &&item.stat.voteCount">
							<i class="iconfont icon-toupiao"></i><span>{{item.stat.voteCount}}</span>
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
							<i class="iconfont icon-jianjie"></i><span>{{item.slogan}}</span>
						</div>
					</div>
				</div>
				<div class="icon" @click.stop="switchTip(index)" v-if=" type !== 'intention'">
					<i class="iconfont icon-bianji"></i><span>编辑</span>
					<div class="tip-select-wrap">
						<tip-select @edit="edit" @deleteOne="deleteOne(item.id, index)" ref="tipSelect"></tip-select>
					</div>
				</div>
			</li>

		</ul>
		<div class="no-result-wrap">
			<no-result v-if="!list.length" title="没有结果"></no-result>
		</div>
 	</div>
</template>
<script>
import NoResult from 'base/no-result/no-result';
import TipSelect from 'base/tip-select/tip-select'
export default {
	props: {
		type: {
			type: String,
			default: 'singer'
		},
		list: {
			type: Array,
			default() {
				return []
			}
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
		getAge(year) {
			console.log(new Date().getFullYear() - year)
			return new Date().getFullYear() - year
		},
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
		deleteOne(id, index) {
			this.$refs.tipSelect[this.currentIndex].hide()
			this.$emit('deleteOne', id, index)
		},
		linkDetail(id) {
			this.$emit('linkDetail', id)
		}
	},
	components: {
		TipSelect,
		NoResult
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
.no-result-wrap {
	padding-top: 200px;
}
.table-list {
	min-height: 600px;
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