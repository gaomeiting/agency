<template>
<transition name="fade" mode="out-in">
	<div class="page" v-loading="loading">

	 	<div class="title">
	 		<span>声咖详情</span>
	 	</div>
	 	<div class="table-wrap">
	 		<table-item type="singer" @editTel="editTel" @uploadStory="uploadStory" :singer="singer"></table-item>
	 	</div>
	 	<div class="title">
	 		<span @click.stop="switchTable(index)" v-for=" (t, index) in title" :class="{active: currentIndex == index}">{{ t.name }}</span>
	 	</div>
	 	<transition name="fade" mode="out-in">
	 	<div class="table-wrap table" v-if="currentIndex == 0">
	 		<story-list :list="singer.stories" :playCls="playCls" @deleteStory="deleteStory" @switchState="switchState"></story-list>
	 		<audio :src="currentSong.url" ref="audio"></audio>
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
	 	<transition name="fade" mode="out-in">
	 	<div class="table-wrap table-top table" v-if="currentIndex == 1">
	 		<el-upload action="http://192.168.100.57:8080/hversion/upload" multiple list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :file-list="fileList">
			  <i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
			  <img width="100%" :src="dialogImageUrl" alt>
			</el-dialog>
	 	</div>
	 	</transition>
	</div>
</transition>
</template>
<script>
import { getSingers, modifySinger } from 'api/singers';
import { CreateSinger } from 'common/js/singer';
import TableItem from 'base/item/item';
import StoryList from 'base/story-list/story-list';
const SONGLISTLEN = 20
export default {
	data() {
		return {
			loading: false,
			singer: {},
			title: [
				{
					name: '故事列表'
				},
				{
					name: '精彩瞬间'
				}
			],
			currentSong: {
				url: 'http://dl.stream.qqmusic.qq.com/C400003LxmX246aRC7.m4a?vkey=53DD0EE597E35BBF57F5155A3DA3CB3B950EF9A45985DEC41E8D7F7BF7CCB1171452A827AA1BE6D2F2FCD4945FEE1838EED5A62276F1C16B&guid=8182525974&uin=0&fromtag=66'
			},
			currentIndex: 0,
			playCls: [],
			currentPage3: 1,
			dialogImageUrl: '',
        	dialogVisible: false,
        	fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
		}
	},
	created() {
		let id = this.$route.params.id;
		let url = `/hversion/childstar/${id}`;
		getSingers(url).then(res => {
			this.singer = this._normalizeData(res)
		}).catch(err => {
			console.log(err)
		})
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
		editTel(dom) {
			console.log(123)
				
			//校验手机号
			//console.log(ev)
			if(/^1[34578]\d{9}$/.test(dom.innerHTML) == false) {
				//this.e.currentTarget.innerHTML=""
				this.$alert('请输入正确的手机号', '', {
		          confirmButtonText: '确定',
		          callback: action => {
		            dom.innerHTML = "18201491298"
		          }
		        });
			}
			else {
				let url = `/hversion/childstar/${this.singer.id}`;
				this._modifySinger(url, dom.innerHTML)

			}
		},
		uploadStory() {
			this.$router.push('/uploadStory')
		},
		switchTable(index) {
			if (index == this.currentIndex) return;
			this.currentIndex = index;
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
	    	console.log(file, 123)
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	        console.log(this.dialogVisible)
	    },
	    _normalizeData(res) {
	    	let id = res.id;
	    	let name = res.name;
	    	let avater = res.avater;
	    	let sex = res.gender;
	    	let age = new Date() - res.birthDate.year;
	    	let tel = res.phone;
	    	let city = res.city;
	    	let avatar = res.avatar;
	    	let state = res.state;
	    	let stories = res.storyAudios
	    	let images = res.sidelightImages
	    	let slogan = res.slogan
	    	return CreateSinger({id, name, sex, age, tel, slogan, city, avater, state, images, stories})
	    },
		_modifySinger(url,phone) {
			modifySinger(url, {
				phone
			}).then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
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
.table {
	position: absolute;
	left: 50%;
	transform: translate3d(-50%, 0, 0);
}
.table-top {
	padding-top: 20px;
}
.title {
	display: flex;
	width: 80%;
	margin: 20px auto 0;
	background: #fff;
	text-indent: 26px;
	font-size: 18px;
	color: $color-text-ll;
	border-bottom: 1px dashed $color-background;
	padding: 0;
	> span {
		height: 40px;
		line-height: 40px;
		padding-right: 46px;
		padding-top: 10px;
		&.active {
			color: #e5a23c;
			border-bottom: 1px solid #e6a23c;
		}
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