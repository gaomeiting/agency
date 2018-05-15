<template>
<transition name="fade" transition-mode="out-in">
	<div class="page">

	 	<div class="title">
	 		<span>声咖详情</span>
	 		<span class="button">修改</span>
	 	</div>
	 	<div class="table-wrap">
	 		<table-item @editTel="editTel"></table-item>
	 	</div>
	 	<div class="title">
	 		<span>故事列表</span>
	 	</div>
	 	<div class="table-wrap">
	 		<story-list :playCls="playCls" @deleteStory="deleteStory" @switchState="switchState"></story-list>
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
	 	<div class="title">
	 		<span>精彩瞬间</span>
	 	</div>
	 	<div class="table-wrap table-top">
	 		<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :file-list="fileList">
			  <i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
			  <img width="100%" :src="dialogImageUrl" alt>
			</el-dialog>
	 	</div>
	 	<audio :src="currentSong.url" ref="audio"></audio>
	</div>
</transition>
</template>
<script>
import TableItem from 'base/item/item';
import StoryList from 'base/story-list/story-list';
const SONGLISTLEN = 20
export default {
	data() {
		return {
			currentSong: {
				url: 'http://dl.stream.qqmusic.qq.com/C400003LxmX246aRC7.m4a?vkey=53DD0EE597E35BBF57F5155A3DA3CB3B950EF9A45985DEC41E8D7F7BF7CCB1171452A827AA1BE6D2F2FCD4945FEE1838EED5A62276F1C16B&guid=8182525974&uin=0&fromtag=66'
			},
			playCls: [],
			currentPage3: 1,
			dialogImageUrl: '',
        	dialogVisible: false,
        	fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
		}
	},
	created() {
		//设置播放状态；
		for(let i = 0; i < SONGLISTLEN; i++) {
			this.playCls.push('icon-bofang')
		}
	},
	methods: {
		
		ready() {
		},
		error() {
		},
		editTel(e) {
			//校验手机号
			const ev = e.currentTarget
			console.log(ev)
			//console.log(ev)
			if(/^1[34578]\d{9}$/.test(ev.value) == false) {
				//this.e.currentTarget.innerHTML=""
				this.$alert('请输入正确的手机号', '', {
		          confirmButtonText: '确定',
		          callback: action => {
		            ev.innerHTML = "18201491298"
		          }
		        });
			}
			else {
				//修改成功；

			}
		},
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
		deleteStory(item, index) {
			console.log(item, index)
		},
		handleSizeChange() {

		},
		handleCurrentChange() {

		},
		handleRemove(file, fileList) {
	        console.log(file, fileList);
	    },
	    handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	        console.log(this.dialogVisible)
	    }
	
	},
	watch : {
		currentSong(newSong, oldSong) {
			if(newSong === oldSong) return;
			this.$ref.audio.play();
		}
	},
	components: {
		TableItem,
		StoryList
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
.table-top {
	padding-top: 20px;
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