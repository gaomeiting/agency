<template>
<transition name="fade" transition-mode="out-in">
	<ul class="story-list">
			<li v-for="(item, index) in 9">
				<div class="content">
					<div class="img">
						<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526039589684&di=70433d45ac08f70afacaa98b0bb7bf6d&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ff9198618367adab4c32b570487d4b31c8601e4fa.jpg">
					</div>
					<div class="text">
						<p class="title">红太狼和灰太狼</p>
						<p class="ellipsis">
							文学体裁的一种，侧重于事件发展过程的描述。强调情节的生动性和连贯性较适于口头讲述。已经发生事。或者想象故事故事一般都和原始人类的生产生活有密切关系他们迫切地希望认识自然于是便以自身为依据，想象天地万物都和人
						</p>
						<p v-if="type == 'singer'" >2018-5-14</p>
						<p v-if="type == 'singer'">老师：宋红</p>
						<p v-if="type == 'teacher'">声咖：宋红</p>
					</div>
				</div>
				<div class="tags">
					<p class="tag">
						<span>品格培养</span>
						<span>品格培养</span>
					</p>
					<p class="icon">
						<i class="iconfont" :class="playCls[index]" @click.stop="switchState(index, playCls[index])"></i>
						<i class="iconfont icon-weibiaoti6" @click.stop="deleteStory(item, index)"></i>
						<i class="iconfont icon-shoucang"></i>
					</p>
				</div>
				
			</li>
	</ul>
</transition>
</template>
<script>

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
		}
	},
	methods: {
		deleteStory(item, index) {
			this.$emit('deleteStory', item, index)
		},
		switchState(index, cls) {
			this.$emit('switchState', index, cls)
		}
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.ellipsis {
	@include ellipsis(3);
}
.story-list {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	padding-top: 20px;
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