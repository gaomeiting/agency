<template>
<transition name="fade" transition-mode="out-in">
	<div class="page">

	 	<div class="title">
	 		<span>公司简介</span>
	 	</div>
	 	<div class="table-wrap">
	 		<company-item @editTel="editTel"></company-item>
	 	</div>
	 	<div class="title">
	 		<span>活动进程</span>
	 	</div>
	 	<div class="table-wrap table-top">
	 		<div class="table-item">
	 			<p>小声咖数</p>
	 			<p>422</p>
	 		</div>
	 		<div class="table-item">
	 			<p>小声咖数</p>
	 			<p>422</p>
	 		</div>
	 		<div class="table-item">
	 			<p>小声咖数</p>
	 			<p>422</p>
	 		</div>
	 	</div>
	 	
	 	<div class="title">
	 		<span>分享推广</span>
	 	</div>
	 	
	</div>
</transition>
</template>
<script>
import CompanyItem from 'base/company-item/company-item';
export default {
	data() {
		return {
			
		}
	},
	created() {
		
	},
	methods: {
		
		editTel(e, index) {
			//校验手机号
			const ev = e.currentTarget
			let reg = index === 0 ? /^1[34578]\d{9}$/.test(ev.innerHTML) == false : !ev.innerHTML
			let mesg = index === 0 ? "请输入正确的手机号" : '请输入您的详细地址'
			let originText = index === 0 ? '18201491298' : '裕华区万达广场A座1023室'
			
			if(reg) {
				//this.e.currentTarget.innerHTML=""
				this.$alert(mesg, '', {
		          confirmButtonText: '确定',
		          callback: action => {
		            ev.innerHTML = originText
		          }
		        });
			}
			else {
				//修改成功；

			}
		}
	
	},
	
	components: {
		CompanyItem
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
	display: flex;
	
	.table-item {
		flex: 1;
		text-align: center;
		p {
			line-height: 1.8;
			font-size: 16px;
			&:last-child {
				font-size: 32px;
			}
		}
	}
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

</style>