<template>
<transition name="fade" transition-mode="out-in">
	<div class="form">
		<div class="title">
	 		<span>指导老师信息填写</span>
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
	  <el-form-item label="QQ号码:"  prop="qq">
	     <el-input v-model="ruleForm.qq"></el-input>
	  </el-form-item>
	  <el-form-item label="邮箱"  prop="email">
	     <el-input v-model="ruleForm.email"></el-input>
	  </el-form-item>
	  </el-form-item>
	  <el-form-item label="个人简介" required prop="desc">
	    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
	  </el-form-item>
	  <el-form-item label="上传头像">
			<el-upload class="avatar-uploader" action="/hversion/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
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
import {addSinger} from 'api/singers';
export default {
data() {
  return {
  	imageUrl: '',
  	ruleForm: {
		name: '',
      sex: '',
      date: '',
      tel: '',
	location: '',
      desc: '',
      qq: '',
      email: '',
      avatarId: ''
    },
    rules: {
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { message: '请输入正确姓名', trigger: 'blur' }
      ],
      sex: [
        { required: true, message: '请选择性别', trigger: 'blur' }
      ],
      date: [
        { required: true, message: '请选择日期', trigger: 'blur' }
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
      qq: [
        {validator:function(rule,value,callback) {

            if(value && /^[1-9][0-9]{4,14}$/.test(value) == false){
                callback(new Error("请输入正确的qq号"));
            }else{
                callback();
            }
        }, trigger: 'blur'}
      ],
      email: [
         { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ],
      desc: [
        { required: true, message: '请填写个人简介', trigger: 'blur' },
        { min: 15, max: 150, message: '长度在 15 到 150 个字符', trigger: 'blur' }
      ]
    }
  };
},  
created() {
	console.log(500)
},
methods: {
	handleAvatarSuccess(res, file) {
		console.log(res, file)
		this.ruleForm.avatarId = file.response;
	    this.imageUrl = URL.createObjectURL(file.raw);
	},
	beforeAvatarUpload(file) {
		const isJPG = file.type === 'image/jpeg';
		const isLt2M = file.size / 1024 / 1024 < 2;
		const isLtBase64 = file.size  < 10000;
		if (!isJPG) {
		  this.$message.error('上传头像图片只能是 JPG 格式!');
		}
		if (!isLt2M) {
		  this.$message.error('上传头像图片大小不能超过 2MB!');
		}
		if(isLtBase64) {
			this.toBase64(file);
			this.autoUpload = false;
		}
		return isJPG && isLt2M;
	},
	toBase64(file) {
		let reader = new FileReader();     
        reader.readAsDataURL(file);     
        reader.onload = function(e){  
          this.image_base64=this.result.split(",")[1]; 
        }
	},
	submitForm(formName) {
		/*if(!this.imageUrl) {
			window.alert("请先上传头像")
			return;
		}*/
		this.$refs[formName].validate((valid) => {
		  if (valid) {
		  	console.log(this.ru)
		  	addSinger('/hversion/narrator', {
		    	name: this.ruleForm.name,
		    	gender: this.ruleForm.sex,
		    	qqNum: this.ruleForm.qq,
		    	email: this.ruleForm.email,
		    	birthDate: this.ruleForm.date,
		    	introduction: this.ruleForm.desc,
		    	phone: this.ruleForm.tel,
		    	avatarId:  this.ruleForm.avatarId
		    }).then(res => {
		    	let _this = this;
		    	this.$alert('创建成功', '', {
		          confirmButtonText: '确定',
		          callback: action => {
		            this.$router.push('/teacher')
		          }
		        });
		    })
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