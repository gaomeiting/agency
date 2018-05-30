<template>
<transition name="fade" mode="out-in">
	<div class="page" v-loading="loading">
	 	<div class="title">
	 		<span>故事列表</span>

		 	<div class="search-wrap">
		 		<search-box @queryChange="queryChange" placeholder="搜索故事" ref="searchBox"></search-box>
		 	</div>
	 	</div>
	 	<div class="table-wrap">
	 		<story-list :list="list" :loading="loading" type="story"></story-list>
	 	</div>
	 	<div class="pagination-wrap">
	 		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-size="currentSize"
		      layout="prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
	 	</div>
	</div>
</transition>
</template>
<script>
import { getSingers } from 'api/singers';
import SearchBox from 'base/search-box/search-box';
import TableList from 'base/table-list/table-list';
import StoryList from 'base/story-list/story-list';
import  { getCommon } from"common/js/mixin";
export default {
	mixins: [getCommon],
	data() {
		return {
			currentSize: 6
		}
	},
	methods: {
		_getSingers( params) {
			this.loading = true;
			getSingers('/hversion/story',params).then(res => {
				this.loading = false;
				this.list = res.list;
				this.total = res.total;
			}).catch(err => {
				console.log(err)
			})
		}
	},
	components: {
		TableList,
		StoryList,
		SearchBox
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.search-wrap {
	margin-right: 20px;
}
.table-wrap {
	width: 80%;
	background: #fff;
	padding: 0 10px;
	margin: 0 auto;
	box-sizing: border-box;
	@include minH(600px);
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