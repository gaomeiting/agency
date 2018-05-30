<template>
<transition name="fade" transition-mode="out-in">
	<div class="page" v-loading="loading">
	 	<div class="title">
	 		<span>指导老师列表</span>
	 		<div class="search-wrap">
	 			<search-box @queryChange="queryChange" placeholder="搜索老师" ref="searchBox"></search-box>
	 		</div>
	 		<span class="button" @click="goAdd('/addTeacher')">添加老师</span>
	 	</div>
	 	<div class="table-wrap">
	 		<table-list :loading="loading" type="teacher" :list="list" @deleteOne="deleteOne" @linkDetail="linkDetail"></table-list>
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
import SearchBox from 'base/search-box/search-box';
import TableList from 'base/table-list/table-list';
import  { getCommon } from"common/js/mixin";
import {getSingers, deleteSinger} from 'api/singers';
export default {
	mixins: [getCommon],
	data() {
		return {
			currentSize: 6
		}
	},
	methods: {
		linkDetail(id) {
			this.$router.push(`/teacher/${id}`)
		},
		deleteOne(item, index) {
			let _this = this;
			let url = `/hversion/narrator/${item.id}`
			if(item.narratorStoryNum.storyNum) {
				this.$alert('故事数量不为0,不能删除指导老师', '', {
					confirmButtonText: '确定'
				})
				return;
			}
			deleteSinger(url).then(res => {
				this.$alert('删除成功', '', {
					confirmButtonText: '确定',
					callback: () => {
						_this.list.splice(index, 1)
						_this.total = _this.total - 1;
					}
				})
			}).catch(err => {
				console.log(err)
			})
		},
		_getSingers( params) {
			this.loading = true;
			getSingers('/hversion/vendor/narrators',params).then(res => {
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
		SearchBox
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
.search-wrap {
	margin-right: 10px;
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