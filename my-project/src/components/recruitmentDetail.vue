<template>
  <div class="news">
    <h3 class="title">招聘信息—{{h3Title}}</h3>
    <div class="search">
      <el-form :model="searchFormDatas" ref="searchFormDatas" label-width="auto" :inline="true" class="demo-form-inline">
        <el-form-item label="标  题:" prop="title" :rules="[{ required: true, message: '标题不能为空'}]">
          <el-input size="small" v-model="searchFormDatas.title" auto-complete="off">
          </el-input>
        </el-form-item>
         <el-form-item label="类型:" prop="type">
           <el-select v-model="searchFormDatas.type" size="small" :rules="[{ required: true, message: '请选择新闻类型'}]" placeholder="请选择">
            <el-option value="1" label="技术类">技术类</el-option>
            <el-option value="2" label="运营类">运营类</el-option>
            <el-option value="3" label="客服类">客服类</el-option>
            <el-option value="4" label="编辑类">编辑类</el-option>
           </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="联系人:" prop="username">
          <el-input size="small" v-model="searchFormDatas.username" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input size="small" v-model.number="searchFormDatas.phone" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="人 数:" prop="number" :rules="[{ required: true, message: '人数不能为空'}]">
          <el-input size="small" v-model.number="searchFormDatas.number" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="E-mail:" prop="email" :rules="[{ required: true, message: 'email不能为空'}]">
          <el-input size="small" v-model.email="searchFormDatas.email" auto-complete="off">
          </el-input>
        </el-form-item>

        <el-form-item label="状 态:" prop="status">
           <el-select v-model="searchFormDatas.status" size="small" :rules="[{ required: true, message: '请选择新闻类型'}]" placeholder="请选择">
             <el-option label="隐藏" value="0"></el-option>
             <el-option label="正常" value="1"></el-option>
           </el-select>
          </el-input>
        </el-form-item>
        <br />
        <p class="title-p">内容：</p>
        <div class="body-content">
          <quill-editor v-model="describe"
            :options="editorOption"
            @change="onEditorChange($event)">
          </quill-editor>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('searchFormDatas')">提交</el-button>
          <el-button @click="resetForm('searchFormDatas')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'recruitmentDetail',
  data () {
    return {
      selectRowId:this.$route.params.num,
      selectRowData:{},
       searchFormDatas: {
        title:"",
        username:"",
        phone:"",
        status:"1",
        email:"",
        type:"2",
        number:""
        },
      describe:"",
      images:"",
      h3Title:"修改",
      fileList: [],
      editorOption: {
          modules: {
            toolbar: [
              [ 'image'],
              [{ 'align': [] }]
            ]
            }
          }

      }
  },
  mounted(){
    /**************默认事件**************/
    this.fns()
  },
 methods:{
  submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /*验证成功*/
            console.log(this.searchFormDatas)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /* ******************** 编辑器内容获取********************/
      onEditorChange({ editor, html, text }) {
        this.content = html
      },
      fns(){
        /*console.log(this.$route.params.id)*/
        if (this.$route.params.id==="Add") {
          this.h3Title="添加"
        }else{
          this.h3Title="修改";
        }

      }
  }
}
</script>
<style type="text/css">
  .quill-editor,
  .quill-code { height: 20rem;}
  .quill-editor {border-bottom: none;}
  .el-form-item {margin-bottom: 10px}
  .el-input,.el-form-item__content{width: 180px;vertical-align: middle;}
  .el-form-item__content textarea{width: 300px;}
  .file-box,.title-p{color:#606266;width: 100%;}
  .upload-demo{display: inline-block;vertical-align: top;}
  .body-content{margin-bottom:52px}
  .title-p{line-height: 36px;}
</style>
