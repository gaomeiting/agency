<template>
<transition name="fade" transition-mode="out-in">
	<div class="page">
	 	<div class="title">
	 		<span>故事列表</span>
	 	</div>
	 	<div class="table-wrap">
	 		<ul class="story-list">
	 			<li v-for="item in 30">
	 				<div class="img">
	 					<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526039589684&di=70433d45ac08f70afacaa98b0bb7bf6d&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ff9198618367adab4c32b570487d4b31c8601e4fa.jpg">
	 				</div>
	 				<div class="text">
	 					<p>红太狼和灰太狼</p>
	 					<p>行为习惯</p>
	 				</div>
	 			</li>
	 		</ul>
	 	</div>
	 	<div class="pagination-wrap">
	 		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage3"
		      :page-size="100"
		      layout="prev, pager, next, jumper"
		      :total="1000">
		    </el-pagination>
	 	</div>
	</div>
</transition>
</template>
<script>
/*import NavMenu from 'base/nav-menu/nav-menu';*/
import TableList from 'base/table-list/table-list';
export default {
	data() {
		return {
			
			currentPage3: 1
		}
	},
	methods: {
		
		handleSizeChange() {

		},
		handleCurrentChange() {

		},
		deleteOne() {
			console.log("deleteOne");
		},
		linkDetail() {
			console.log("linkDetail")
		},
		goAdd() {
			this.$router.push("/addSinger")
		}
	
	},
	components: {
		TableList
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";

.table-wrap {
	width: 80%;
	background: #fff;
	padding: 0 10px;
	margin: 0 auto;
	box-sizing: border-box;
}
.title {
	display: flex;
	width: 80%;
	margin: 20px auto 0;
	height: 40px;
	line-height: 40px;
	background: #fff;
	text-indent: 26px;
	font-size: 18px;
	color: $color-text-ll;
	border-bottom: 1px dashed $color-background;
	padding: 10px 0;
	> span {
		flex:1;
	}
	.button {
		flex: 0 0 100px;
		width: 100px;
		line-height: 34px;
		height: 34px;
		color: #fff;
		border-radius: 20px;
		background: #e6a23c;
		font-size: 14px;
		margin-right: 20px;
		margin-top: 4px;
	}
}
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

.pagination-wrap {
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #fff;
	margin: 0 auto;
	padding: 16px 0;
}
</style>