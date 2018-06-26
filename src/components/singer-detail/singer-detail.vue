<template>
<transition name="fade" mode="out-in">
	<div>
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
	 	<div class="table-wrap table" v-show="currentIndex == 0">
	 		<story-list :loading="loading" :list="stories" :playCls="playCls" @deleteStory="deleteStory" @switchState="switchState"></story-list>
	 		<audio :src="currentSong.url" ref="audio"></audio>
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
	 	<transition name="fade" mode="out-in">
	 	<div class="table-wrap table-top table" v-show="currentIndex == 1">
	 		<el-upload action="/hversion/upload" multiple list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess"  :file-list="fileList">
			  <i class="el-icon-plus"></i>
			</el-upload>
			
	 	</div>
	 	</transition>
	 	
	</div>
	<el-dialog :visible.sync="dialogVisible">
		<img width="100%" :src="dialogImageUrl" alt="">
	</el-dialog>
	</div>
</transition>
</template>
<script>
import { getSingers, modifySinger, deleteSinger, addSinger, addSingerQs } from 'api/singers';
import { CreateSinger } from 'common/js/singer';
import { CreateStory } from 'common/js/story';
import TableItem from 'base/item/item';
import StoryList from 'base/story-list/story-list';
export default {
	data() {
		return {
			loading: true,
			singer: {},
			currentSize: 6,
			total: 0,
			stories: [],
			title: [
				{
					name: '故事列表'
				},
				{
					name: '精彩瞬间'
				}
			],
			currentSong: {
			},
			currentIndex: 0,
			playCls: [],
			currentPage: 1,
			dialogImageUrl: '',
        	dialogVisible: false,
        	fileList: []
		}
	},
	created() {
		let id = this.$route.params.id;
		let url = `/hversion/childstar/${id}`;
		if(!id) {
			this.$router.push('/singer')
		}
		const detail = getSingers(url).then(res => {
			return res
		})
		const stories = getSingers(`/hversion/childstar/${id}/stories`, {
			page: 0,
			size: this.currentSize
		}).then(res => {
			return res
		})
		const light = getSingers(`/hversion/childstar/${id}/light`).then(res => {
			return  res
		})
		Promise.all([detail, stories, light]).then(res => {
			this.loading = false;
			this.singer = this._normalizeData(...res);
			this.stories = this. _normalizeStory(res[1].list);
			this.total = res[1].total
			this.fileList = this.singer.images;
			this.playCls = this._initState(this.stories.length)
		})
		
	},
	methods: {
		editTel(dom) {
			//校验手机号
			if(/^1[34578]\d{9}$/.test(dom.innerHTML) == false) {
				this.$alert('请输入正确的手机号', '', {
		          confirmButtonText: '确定',
		          callback: action => {
		            dom.innerHTML = this.singer.tel
		          }
		        });
			}
			else {
				let url = `/hversion/childstar/${this.singer.id}`;
				this._modifySinger(url, dom.innerHTML)

			}
		},
		handleAvatarSuccess(res, file) {
			let id = this.$route.params.id;
			let url = `/hversion/childstar/${id}/light`;
			addSingerQs(url, {
				lightId: res
			}).then(res => {
				this.fileList.push(file)
			}).catch(err => {
				console.log(err)
			})
		},
		uploadStory() {
			const id = this.$route.params.id;
			this.$router.push({
				path: '/uploadStory',
				query: {
					id
				}
			})
		},
		switchPreview() {
			this.dialogVisible = !this.dialogVisible;
		},
		switchTable(index) {
			if (index == this.currentIndex) return;
			this.currentIndex = index;
		},
		switchState(index, cls) {

			let arr = this._initState(this.stories.length)
			arr[index] = cls === 'icon-bofang' ? 'icon-bofang1' : 'icon-bofang';
			/*设置播放路径*/
			this.currentSong.url = this.stories[index].audio;
			if(cls === 'icon-bofang') {
				setTimeout(() => {
					this.$refs.audio.play()
				},30)
				
			}
			else {
				this.$refs.audio.pause()
			}
			this.playCls = arr;
		},
		deleteStory(item, index) {
			let _this = this;
			const url = `/hversion/audio/${item.id}`;
			deleteSinger(url).then(res => {
				this.$alert('删除成功', '', {
					confirmButtonText: '确定',
					callback: () => {
						console.log(13, "删除故事")
						_this.stories.splice(index, 1)
						_this.total = _this.total - 1;
					}
				})
			}).catch( err => {
				console.log(err);
			})
		},
		handleSizeChange(page) {
			this._getStories(page-1)

		},
		handleCurrentChange(page) {
			this._getStories(page-1)
		},
		handleRemove() {

		},
	    handlePictureCardPreview(file) {
	    	console.log(file.url, 123456789)
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	        console.log(this.dialogVisible)
	    },
	    _initState(len) {
	    	let arr = [];
	    	for(let i = 0; i < this.stories.length; i++) {
	    		arr.push('icon-bofang')
	    	}
	    	return arr;
	    },
	    _getStories(page) {
	    	let id = this.$route.params.id;
	    	getSingers(`/hversion/childstar/${id}/stories`, {
				page: page,
				size: this.currentSize
			}).then(res => {
				this.stories = this._normalizeStory(res.list)
			})
	    },
	    _normalizeData() {
	    	let id = arguments[0].id;
	    	let name = arguments[0].name;
	    	let avater = arguments[0].avater;
	    	let sex = arguments[0].gender;
	    	let age = new Date().getFullYear() - arguments[0].birthDate.split('-')[0];
	    	let tel = arguments[0].phone;
	    	let city = arguments[0].city;
	    	let avatar = this._fragment(arguments[0].avatarId,'jpg');
	    	let state = arguments[0].state;
	    	let images = this._fragmentImage(arguments[2], 'jpg');
	    	let slogan = arguments[0].slogan
	    	return CreateSinger({id, name, sex, age, tel, slogan, city, avatar, state, images})
	    },
	    _normalizeStory(list) {
	    	let arr = [];
	    	list.forEach(item => {
	    		let story= item.story;
	    		let id = item.id;
	    		let title = story.title;
	    		let content = story.content;
	    		let category = story.category;
	    		let data = story.createOn;
	    		let teacher = item.narrator.name;
	    		let cover = this._fragment(story.coverId, "jpg");
	    		let audio = this._fragment(item.audioId, "mp3");
	    		arr.push(CreateStory({id, title, content, cover, category, teacher, audio, data}))
	    	})
	    	return arr;
	    },
	    _fragmentImage(list) {
	    	let arr = [];
	    	list.forEach(item => {
	    		item.url = this._fragment(item.id, 'jpg')
	    		arr.push(item)
	    	})
	    	return arr;
	    },
	    _fragment(id, type) {
	    	return `/hversion/${id}.${type}`
	    },
		_modifySinger(url,phone) {
			modifySinger(url, {
				"property": "phone", "value": phone
			}).then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
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
@import "~common/scss/mixin";
.preview {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: auto;
	width: 100%;
	height: 100%;
	border: 10px solid red;
	border-box: border-box;
	background: rgba(0,0,0,0.5);
	/* > img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0)
	} */
}
.table-wrap {
	width: 80%;
	background: #fff;
	padding: 0 10px;
	margin: 0 auto;
	box-sizing: border-box;
	&:nth-of-type(3),&:nth-of-type(4) {
		@include minH(500px);
	}
	
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