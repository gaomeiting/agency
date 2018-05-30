<template>
<transition name="fade" transition-mode="out-in">
	<div class="form">
		<div class="title">
	 		<span>故事信息填写</span>
	 	</div>
	 	<el-form label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm" :on-exceed="handleExceed"
  :file-list="fileList" class="demo-ruleForm">
	 		<el-form-item label="上传音频文件">
				<el-upload
				  class="upload-demo"
				  action="/hversion/upload"
				  :on-success="handleAvatarSuccess"
  				  :before-upload="beforeAvatarUpload">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传.mp3文件</div>
				</el-upload>
			</el-form-item>
			<el-form-item label="选择故事" required  prop="story">
				    <el-select v-model="ruleForm.story" filterable placeholder="请选择">
					    <el-option
					      v-for="item in options.story"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
			</el-form-item>
			<el-form-item label="选择指导老师" required  prop="teacher">
				    <el-select v-model="ruleForm.teacher" filterable remote :loading="loading" placeholder="请选择":remote-method="remoteMethod">
					    <el-option
					      v-for="item in options.teacher"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					    <div class="center" @click.stop="createdNew">创建新指导老师</div>
					</el-select>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</transition>
</template>
<script>
import { getSingers, addSinger } from 'api/singers';
export default {
    data() {
      return {
		fileList:[],
		loading: false,
      	options: {
      		teacherInit :[], 
      		teacher: [],
        	story: []
      	} ,
        ruleForm: {
        	uid: '',
          story: '',
          teacher: ''
        },
        rules: {
          story: [
            { required: true, message: '请选择故事名称', trigger: 'blur' }
          ],
          teacher: [
            { required: true, message: '请选择指导老师', trigger: 'blur' }
          ]
        }
      };
    },
created() {
	//指导老师

	//故事
	let url = '/hversion/narrator';
	const teacher = getSingers(url).then(res => {
		return res
	})
	const stories = getSingers(`/hversion/story`).then(res => {
		return res
	})
	Promise.all([teacher, stories]).then(res => {
		this.loading = false;
		this.options.story = this._normalizeData(res[1].list)
		this.options.teacherInit = this._normalizeData(res[0].list)
		this.options.teacher = this.options.teacherInit
		console.log(res[1].list)
		/*this.teacherInit = res[0];*/
	})
},
methods: {
	handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
	handleAvatarSuccess(res, file) {
	    this.imageUrl = URL.createObjectURL(file.raw);
	    this.ruleForm.uid = file.response;
	    console.log(this.ruleForm.uid, 'ruleForm')
	},
	beforeAvatarUpload(file) {
		console.log(file)
	    const isMp3 = file.type === 'audio/mp3';
	    const isLt10M = file.size / 1024 / 1024 < 10;

	    if (!isMp3) {
	      this.$message.error('上传文件只能是 mp3 格式!');
	    }
	    if (!isLt10M) {
	      this.$message.error('上传文件大小不能超过 10MB!');
	    }
	    return isMp3 && isLt10M;
	},
    createdNew(res) {
		this.$router.push('/addTeacher');
	},
	remoteMethod(query) {
		console.log("remote")
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            let arr = this.options.teacher.slice(0,-1);
      		let res = [];
			res = arr.filter(item => {
              return item.label.indexOf(query) > -1;
            });
            this.options.teacher = [...res, {}]
          }, 200);
        } else {
          this.options.teacher = this.options.teacherInit;
        }
    },
	submitForm(formName) {
		const id = this.$route.query.id;
		if(!this.ruleForm.uid) {
			window.alert("请先上传故事")
			return;
		}
		this.$refs[formName].validate((valid) => {
		  if (valid) {
		  	console.log(this.ruleForm.uid,this.ruleForm.story, this.ruleForm.story )
		    addSinger(`/hversion/audio`, {
		    	audioId: this.ruleForm.uid,
		    	storyId: this.ruleForm.story,
		    	narratorId: this.ruleForm.teacher,
		    	childStarId: id
		    }).then(res => {
		    	let _this = this;
		    	this.$alert('创建成功', '', {
		          confirmButtonText: '确定',
		          callback: action => {
		            this.$router.push('/singer')
		          }
		        });
		    }).catch(err => {
		    	let err_msg = err.detailMessage;
		    	this.$alert(err_msg, '', {
		    		"confirmButtonText" : "确定"
		    	})
		    	console.log(err.detailMessage, "err")
		    })
		  } else {
		    console.log('error submit!!');
		    return false;
		  }
		})
	},
	resetForm(formName) {
		this.$refs[formName].resetFields();
	},
	_normalizeData(list) {
		let arr = [];
		list.forEach(item => {
			let obj = {}
			obj.value = item.id
			obj.label = item.name || item.title
			arr.push(obj)
		})
		return arr;
	}
}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
.form {
	width: 560px;
	margin: 30px auto;
	background: #fff;
	padding: 30px 30px 30px 0;
}
.center {
	width: 100%;
	text-align: center;
	font-size: 16px;
	background-color: #f8f8f8;
	padding: 10px 0;
	position: absolute;
	bottom: 0;
}
.title {
	display: flex;
	width: 100%;
	height: 40px;
	line-height: 40px;
	background: #fff;
	text-indent: 26px;
	font-size: 18px;
	color: $color-text-ll;
	border-bottom: 1px dashed $color-background;
	margin-bottom: 30px;
	
}

</style>