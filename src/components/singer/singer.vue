<template>
<transition name="fade" mode="out-in">
	<div class="page" v-loading="loading">
	 	<div class="title">
	 		<span>声咖列表</span>
	 		<div class="search-wrap">
	 			<search-box @queryChange="queryChange" ref="searchBox"></search-box>
	 		</div>
	 		<span class="button" @click="goAdd">添加声咖</span>
	 	</div>
	 	<div class="table-wrap">
	 		<table-list @deleteOne="deleteOne" @linkDetail="linkDetail"></table-list>
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
import {getSingers} from 'api/singers';
import SearchBox from 'base/search-box/search-box';
import Loading from 'base/loading/loading';
import TableList from 'base/table-list/table-list';
export default {
	data() {
		return {
			loading: false,
			currentPage3: 1
		}
	},
	created() {
		getSingers('/hversion/childstar').then(res => {
			console.log(res)
		}).catch(err => {
			console.log(err)
		})
	},
	methods: {
		queryChange(query) {},
		handleSizeChange() {

		},
		handleCurrentChange() {

		},
		deleteOne() {
			console.log("deleteOne");
		},
		linkDetail() {
			this.$router.push("/singer/187")
		},
		goAdd() {
			this.$router.push("/addSinger")
		}
	
	},
	components: {
		TableList,
		SearchBox,
		Loading
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