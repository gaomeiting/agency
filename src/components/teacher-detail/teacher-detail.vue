<template>
<transition name="fade" transition-mode="out-in">
	<div class="page" v-loading="loading">

	 	<div class="title">
	 		<span>指导老师详情</span>
	 		<!-- <span class="button">修改</span> -->
	 	</div>
	 	<div class="table-wrap">
	 		<table-item  :singer="teacher" @editTel="editTel" type="teacher"></table-item>
	 	</div>
	 	<div class="title">
	 		<span>故事列表</span>
	 	</div>
	 	<div class="table-wrap">
	 		<story-list :loading="loading" :list="stories" type="teacher" :playCls="playCls" @deleteStory="deleteStory" @switchState="switchState"></story-list>
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
	 	
	 	<audio :src="currentSong.url" ref="audio"></audio>
	</div>
</transition>
</template>
<script>
import TableItem from 'base/item/item';
import StoryList from 'base/story-list/story-list';
import { getSingers, modifySinger, deleteSinger } from 'api/singers';
import { CreateTeacher } from 'common/js/teacher';
import { CreateStory } from 'common/js/story';
const SONGLISTLEN = 20
export default {
	data() {
		return {
			loading: true,
			teacher: {},
			currentSize: 1,
			total: 0,
			stories: [],
			currentSong: {
				url: 'http://dl.stream.qqmusic.qq.com/C400003LxmX246aRC7.m4a?vkey=53DD0EE597E35BBF57F5155A3DA3CB3B950EF9A45985DEC41E8D7F7BF7CCB1171452A827AA1BE6D2F2FCD4945FEE1838EED5A62276F1C16B&guid=8182525974&uin=0&fromtag=66'
			},
			playCls: [],
			currentPage: 1,
			dialogImageUrl: '',
        	dialogVisible: false
		}
	},
	created() {
		let id = this.$route.params.id;
		let url = `/hversion/narrator/${id}`;
		if(!id) {
			this.$router.push('/teacher')
		}
		const detail = getSingers(url).then(res => {
			return res
		})
		const stories = getSingers(`/hversion/narrator/${id}/stories`, {
			page: 0,
			size: this.currentSize
		}).then(res => {
			return res
		})
		Promise.all([detail, stories]).then(res => {
			this.loading = false;
			this.teacher = this._normalizeData(...res);
			this.stories = this._normalizeStory(res[1].list);
			this.total = res[1].total;
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
			//校验手机号
			if(/^1[34578]\d{9}$/.test(dom.innerHTML) == false) {
				//this.e.currentTarget.innerHTML=""
				this.$alert('请输入正确的手机号', '', {
		          confirmButtonText: '确定',
		          callback: action => {
		            dom.innerHTML = this.singer.tel
		          }
		        });
			}
			else {
				let url = `/hversion/narrator/${this.teacher.id}`;
				this._modifySinger(url, dom.innerHTML)

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
			let _this = this;
			const url = `/hversion/audio/${item.id}`;
			deleteSinger(url).then(res => {
				this.$alert('删除成功', '', {
					confirmButtonText: '确定',
					callback: () => {
						_this.singer.stories.splice(index, 1)
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
	    handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	        console.log(this.dialogVisible)
	    },
	    _getStories(page) {
	    	let id = this.$route.params.id;
	    	getSingers(`/hversion/narrator/${id}/stories`, {
				page: page,
				size: this.currentSize
			}).then(res => {
				this.stories = this._normalizeStory(res.list)
			})
	    },
	    _normalizeData() {
	    	//{id, name, sex, age, tel, slogan, avater, email, qq, stories}
	    	let id = arguments[0].id;
	    	let name = arguments[0].name;
	    	let avatar = this. _fragment(arguments[0].avatarId,'jpg');
	    	let sex = arguments[0].gender;
	    	let age = arguments[0].age;
	    	let tel = arguments[0].phone;
	    	let qq = arguments[0].qq;
	    	let email = arguments[0].email;
	    	let slogan = arguments[0].introduction
	    	return CreateTeacher({id, name, sex, age, tel, slogan, avatar, email, qq})
	    },
	    _normalizeStory(list) {
	    	let arr = [];
	    	list.forEach(item => {
	    		console.log(item, "123")
	    		let id = item.id;
	    		let title = item.title;
	    		let content = item.content;
	    		let category = item.category;
	    		let data = item.createOn;
	    		let teacher = item.narrator.name;
	    		let cover = this._fragment(item.coverId, "jpg");
	    		let audio = this._fragment(item.audioId, "mp3");
	    		arr.push(CreateStory({id, title, content, cover, category, teacher, audio, data}))
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