<template>
  <div class="login">
    <div class="ruleForm">
      <h3 class="modal-header">动信通官网管理系统</h3>
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="120px" class="modal-body" >
        <el-form-item
          label="用户名"
          prop="username"
          :rules="[
            { required: true, message: '用户名不能为空'},
          ]">
          <el-input type="password" v-model="numberValidateForm.username" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="密 码"
          prop="age"
          :rules="[
            { required: true, message: '密码不能为空'}
          ]">
          <el-input type="password" v-model="numberValidateForm.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="validateCode"  :rules="ValidateRules">
          <el-input type="password" v-model="numberValidateForm.validateCode" auto-complete="off"></el-input>
          <img :src="imgSrc" height="30" width="90" /><a @click="reloadValidateCode">看不清？</a>
        </el-form-item>
        <el-form-item>
          <el-button class="login-submit" type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import imgsrc from '../assets/validateCode.jpg'
  export default {
    name:'login',
     data() {
       var validateCode = (rule, value, callback) => {
        if (value !=="1") {
          //请求后台验证验证码
          callback(new Error('请输入正确的验证码!'));
        } else {
          callback();
        }
      };
      return {
        imgSrc:imgsrc,
        numberValidateForm: {
          age: '',
          username:"",
          validateCode:""
        },
        ValidateRules:[
        { required: true, message: '验证码不能为空'},
        {validator: validateCode, trigger: 'blur'}]
      };
    },
    methods: {
      reloadValidateCode(){
        console.log('aaaa')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /*alert('submit!');*/
            this.$router.push({path:'/newsList'})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style type="text/css">
  .login{
    height: 100%;
    width: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-color: #3F70AA;
    position: relative;
  }
  .login .ruleForm{
    width: 560px;
    height: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -175px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
  }
  .modal-header {
    padding: 9px 15px;
    border-bottom: 1px solid #eee;
    font-size: 18px;
    line-height: 27px;
    height: 27px;
}
.modal-body{
    padding: 15px;
}
.modal-body .el-input,.login-submit{width: 60%}
.login-submit{background-color: #0074cc}
.modal-body img{vertical-align: middle;}
.modal-body a{color: #0088cc;cursor: pointer;padding:0 5px;}
.modal-body a:hover{text-decoration: underline;color: #005580}
</style>
