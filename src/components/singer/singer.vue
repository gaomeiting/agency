<template>
<transition name="fade" mode="out-in">
	<div class="page" v-loading="loading">
	 	<div class="title">
	 		<span>声咖列表</span>
	 		<div class="search-wrap">
	 			<search-box @queryChange="queryChange" ref="searchBox"></search-box>
	 		</div>
	 		<span class="button" @click="goAdd('/addSinger')">添加声咖</span>
	 	</div>
	 	<div class="table-wrap">
	 		<table-list @deleteOne="deleteOne" @linkDetail="linkDetail" :loading="loading" :list="list"></table-list>
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
			this.$router.push(`/singer/${id}`)
		},
		deleteOne(item, index) {
			if(item.stat.storyCount) {
				this.$alert(`录制故事数量${item.stat.storyCount},请先删除故事`, '', {
					confirmButtonText: '确定'
				})
				return;
			}
			let _this = this;
			let url = `/hversion/childstar/${item.id}`
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
			getSingers('/hversion/childstar',params).then(res => {
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
.search-wrap {
	margin-right: 10px;
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