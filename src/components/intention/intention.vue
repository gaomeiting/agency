<template>
<transition name="fade" transition-mode="out-in">
	<div class="page">
	 	<div class="title">
	 		<span>意向列表</span>
	 		<span class="button" @click="goAdd">添加意向</span>
	 	</div>
	 	<div class="table-wrap">
	 		<table-list type="intention" @switchState="switchState"  :playCls="playCls"></table-list>
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
	 	<audio :src="currentSong.url" ref="audio"></audio>
	</div>
</transition>
</template>
<script>
/*import NavMenu from 'base/nav-menu/nav-menu';*/
import TableList from 'base/table-list/table-list';
const SONGLISTLEN = 20;
export default {
	data() {
		return {
			currentSong: {
				url: 'http://dl.stream.qqmusic.qq.com/C400003LxmX246aRC7.m4a?vkey=53DD0EE597E35BBF57F5155A3DA3CB3B950EF9A45985DEC41E8D7F7BF7CCB1171452A827AA1BE6D2F2FCD4945FEE1838EED5A62276F1C16B&guid=8182525974&uin=0&fromtag=66'
			},
			currentPage3: 1,
			playCls: []
		}
	},
	created() {
		for(let i = 0; i < SONGLISTLEN; i++) {
			this.playCls.push('icon-bofang')
		}
	},
	methods: {
		switchState(index, cls) {
			let arr = this.playCls.slice()
			arr[index] = cls === 'icon-bofang' ? 'icon-bofang1' : 'icon-bofang';
			/*设置播放路径
			this.currentSong =*/ 
			if(cls === 'icon-bofang') {
				this.$refs.audio.play()
			}
			else {
				this.$refs.audio.pause()
			}
			this.playCls = arr;
		},
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
			this.$router.push("/addTeacher")
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