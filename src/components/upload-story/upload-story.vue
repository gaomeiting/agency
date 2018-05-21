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
				  action="https://jsonplaceholder.typicode.com/posts/"
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
export default {
    data() {
      return {
		fileList:[],
		loading: false,
      	options: {
      		teacherInit :[{
	          value: '选项1',
	          label: '黄金糕'
	        }, {
	          value: '选项2',
	          label: '双皮奶'
	        }, {
	          value: '选项3',
	          label: '蚵仔煎'
	        }, {
	          value: '选项4',
	          label: '龙须面'
	        }, {
	          value: '选项5',
	          label: '北京烤鸭'
	        }, {
	        }], 
      		teacher: [{
	          value: '选项1',
	          label: '黄金糕'
	        }, {
	          value: '选项2',
	          label: '双皮奶'
	        }, {
	          value: '选项3',
	          label: '蚵仔煎'
	        }, {
	          value: '选项4',
	          label: '龙须面'
	        }, {
	          value: '选项5',
	          label: '北京烤鸭'
	        },  {
	        }],
        	story: [{
	          value: '选项1',
	          label: '黄金糕'
	        }, {
	          value: '选项2',
	          label: '双皮奶'
	        }, {
	          value: '选项3',
	          label: '蚵仔煎'
	        }, {
	          value: '选项4',
	          label: '龙须面'
	        }, {
	          value: '选项5',
	          label: '双皮奶'
	        }, {
	          value: '选项6',
	          label: '蚵仔煎'
	        }, {
	          value: '选项7',
	          label: '龙须面'
	        }, {
	          value: '选项8',
	          label: '双皮奶'
	        }, {
	          value: '选项9',
	          label: '蚵仔煎'
	        }, {
	          value: '选项10',
	          label: '龙须面'
	        }, {
	          value: '选项11',
	          label: '北京烤鸭'
	        }]
      	} ,
        ruleForm: {
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

methods: {
	handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
	handleAvatarSuccess(res, file) {
	    this.imageUrl = URL.createObjectURL(file.raw);
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
		if(!this.imageUrl) {
			window.alert("请先上传头像")
			return;
		}
		this.$refs[formName].validate((valid) => {
		  if (valid) {
		    alert('submit!');
		  } else {
		    console.log('error submit!!');
		    return false;
		  }
		})
	},
	resetForm(formName) {
		this.$refs[formName].resetFields();
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