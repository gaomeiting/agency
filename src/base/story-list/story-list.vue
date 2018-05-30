<template>
<transition name="fade" transition-mode="out-in">
	<div class="story-list">
	<ul>
			<li v-for="(item, index) in list">
				<div class="content">
					<div class="img">
						<img v-if="type == 'story'" :src="'/hversion/'+item.coverId+'.jpg'">
						<img v-else :src="item.cover">
					</div>
					<div class="text">
						<p class="title">{{item.title}}</p>
						<p class="ellipsis">
							{{item.content}}
						</p>
						<br>
						<p v-if="item.data" >{{item.data}}</p>
						<p v-if="item.teacher">老师:{{item.teacher}}</p>
						<p v-if="item.author">声咖：宋红</p>
					</div>
				</div>
				<div class="tags">
					<p v-if="item.category" class="tag">
						<span>{{item.category}}</span>
					</p>
					<p class="icon">
						<i class="iconfont" :class="playCls[index]" @click.stop="switchState(index, playCls[index])"></i>
						<i v-if="type !== 'story'" class="iconfont icon-weibiaoti6" @click.stop="deleteStory(item, index)"></i>
						<i class="iconfont icon-shoucang"></i>
					</p>
				</div>
				
			</li>
	</ul>
	<div class="no-result-wrap" v-if="!list.length && !loading">
		<no-result title="什么也没有~~"></no-result>
	</div>
	</div>
</transition>
</template>
<script>
import NoResult from 'base/no-result/no-result';
export default {
	props: {
		playCls: {
			type: Array,
			default() {
				return []
			}
		},
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
		loading: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		deleteStory(item, index) {
			this.$emit('deleteStory', item, index)
		},
		switchState(index, cls) {
			this.$emit('switchState', index, cls)
		}
	},
	components: {
		NoResult
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.no-result-wrap {
	padding-top: 200px;
}
.ellipsis {
	@include ellipsis(3);
}
.story-list {
	padding-top: 20px;
	> ul {
		display: flex;
		flex-wrap: wrap;
	}
	li {
		flex: 0 0 383px; 
		width: 383px;
		overflow: hidden;
		background: #fff;
		border-radius: 8px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
		margin: 0 8px 8px;
		padding: 16px;
		box-sizing: border-box;
		
		.content {
			display: flex;
			padding-bottom: 16px;
			border-bottom: 1px solid #f8f8f8;
			.img {
				flex: 0 0 142px;
				width: 142px;
				height: 142px;
				overflow: hidden;
				img {
					width: 100%;
					min-height: 100%;
				}
			}
			.text {
				flex: 1;
				font-size: 14px;
				padding: 0 10px;
				color: rgba(0,0,0,.4);
				line-height: 1.5;
				> .title {
					font-size: 16px;
				}
				&:first-of-type {
					font-size: 18px;
				}
			}
		}
		.tags {
			display: flex;
			padding-top: 12px;
			.tag {
				flex: 1;
				font-size: 14px;
				> span {
					display: inline-block;
					border: 1px solid #f8f8f8;
					padding: 4px 8px;
					border-radius: 4px;
				}

			}
			.icon {

			}
		}
		
		
	}
}


</style>