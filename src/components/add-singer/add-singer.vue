<template>
<transition name="fade" transition-mode="out-in">
	<div class="page">
		<div class="title">
	 		<span>声咖信息填写</span>
	 	</div>
		<el-form label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
		  <el-form-item label="姓名" prop="name">
		    <el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
		  <el-form-item label="性别" prop="sex">
		    <el-radio-group v-model="ruleForm.sex">
		      <el-radio label="男"></el-radio>
		      <el-radio label="女"></el-radio>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item prop="date" label="生日" required>
	        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
	      </el-form-item>
		  <el-form-item label="手机号码" required  prop="tel">
		     <el-input v-model="ruleForm.tel"></el-input>
		  </el-form-item>
		  <el-form-item label="选择地区" required  prop="location">
			    <el-select v-model="ruleForm.location" filterable placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
		  </el-select>
		  </el-form-item>
		  <el-form-item label="个人简介" required prop="desc">
		    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
		  </el-form-item>
		  <el-form-item label="上传头像">
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
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
      	imageUrl: '',
      	options: [{
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
        }],
        ruleForm: {
          name: '',
          sex: '',
          date: '',
          tel: '',
		location: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { message: '请输入正确姓名', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          date: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          tel: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {validator:function(rule,value,callback) {
	            if(/^1[34578]\d{9}$/.test(value) == false){
	                callback(new Error("请输入正确的手机号"));
	            }else{
	                callback();
	            }
	        }, trigger: 'blur'}
          ],
          
          location: [
            { required: true, message: '请选择城市', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写个人简介', trigger: 'blur' },
            { min: 15, max: 150, message: '长度在 15 到 150 个字符', trigger: 'blur' }
          ]
        }
      };
    },
methods: {
	handleAvatarSuccess(res, file) {
		console.log(file.raw)
	    this.imageUrl = URL.createObjectURL(file.raw);
	},
	beforeAvatarUpload(file) {
		const isJPG = file.type === 'image/jpeg';
		const isLt2M = file.size / 1024 / 1024 < 2;

		if (!isJPG) {
		  this.$message.error('上传头像图片只能是 JPG 格式!');
		}
		if (!isLt2M) {
		  this.$message.error('上传头像图片大小不能超过 2MB!');
		}
		return isJPG && isLt2M;
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
.page {
	width: 560px;
	margin: 30px auto;
	background: #fff;
	padding: 30px 30px 30px 0;
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
.avatar-uploader .el-upload {
border: 1px dashed #d9d9d9;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;

}
.avatar-uploader .el-upload:hover {
border-color: #409EFF;

}
.avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 178px;
height: 178px;
line-height: 178px;
text-align: center;
border: 1px dashed #d9d9d9;
border-radius: 6px;
}
.avatar {
width: 178px;
height: 178px;
display: block;
}
</style>