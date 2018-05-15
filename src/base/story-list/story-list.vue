<template>
<transition name="fade" transition-mode="out-in">
	<ul class="story-list">
			<li v-for="(item, index) in 20">
				<div class="img">
					<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526039589684&di=70433d45ac08f70afacaa98b0bb7bf6d&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ff9198618367adab4c32b570487d4b31c8601e4fa.jpg">
				</div>
				<div class="text">
					<p>红太狼和灰太狼</p>
					<p v-if="type == 'story'">行为习惯 </p>
					<p v-if="type == 'singer'" >2018-5-14</p>
					<p v-if="type == 'singer'">老师：宋红</p>
					<p v-if="type == 'teacher'">声咖：宋红</p>
					<p class="icon">
						<i class="iconfont" :class="playCls[index]" @click.stop="switchState(index, playCls[index])"></i>
						<i class="iconfont icon-weibiaoti6" @click.stop="deleteStory(item, index)"></i>
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

.story-list {
	display: flex;
	flex-wrap: wrap;
	padding-top: 20px;
	li {
		flex: 0 0 142px; 
		width: 142px;
		height: 200px;
		overflow: hidden;
		position: relative;
		margin-right: 8px;
		margin-bottom: 8px;
		&:nth-of-child(5n) {
			margin-right: 0;
		}
		.img {
			width: 100%;
			height: 100%;
			overflow: hidden;
			img {
				width: 100%;
				min-height: 100%;
			}
		}
		.text {
			font-size: 14px;
			padding: 10px;
			background: $color-text-l;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			color: rgba(255,255,255,.8);
			line-height: 1.5;
		}
	}
}


</style>