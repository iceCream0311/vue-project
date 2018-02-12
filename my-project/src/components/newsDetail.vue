<template>
  <div class="news">
    <h3 class="title">新闻内容管理—{{h3Title}}</h3>
    <div class="search">
      <div class="file-box">
         缩略图：
        <el-upload
           class="upload-demo"
           action="https://jsonplaceholder.typicode.com/posts/"
           :on-preview="handlePreview"
           :on-remove="handleRemove"
           :before-remove="beforeRemove"
           multiple
           :limit="3"
           :on-exceed="handleExceed"
           :file-list="fileList">
           <el-button size="small" type="primary">点击上传</el-button>
           <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <el-form :model="searchFormDatas" ref="searchFormDatas" label-width="auto" :inline="true" class="demo-form-inline">
        <el-form-item label="新闻标题:" prop="title" :rules="[{ required: true, message: '新闻标题不能为空'}]">
          <el-input size="small" v-model.number="searchFormDatas.title" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="外链地址:" prop="link">
          <el-input size="small" v-model.number="searchFormDatas.link" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="来 源:" prop="source">
          <el-input size="small" v-model.number="searchFormDatas.source" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="新闻类型:" prop="websitetype">
           <el-select v-model="searchFormDatas.websitetype" size="small" :rules="[{ required: true, message: '请选择新闻类型'}]" placeholder="请选择">
             <el-option label="公告" value="0"></el-option>
             <el-option label="活动" value="1"></el-option>
             <el-option label="新闻" value="2"></el-option>
             <el-option label="活动日历" value="3"></el-option>
           </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="备 注:" prop="nexttitle">
          <el-input size="small" v-model.number="searchFormDatas.nexttitle" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="状 态:" prop="status">
           <el-select v-model="searchFormDatas.status" size="small" :rules="[{ required: true, message: '请选择新闻类型'}]" placeholder="请选择">
             <el-option label="隐藏" value="0"></el-option>
             <el-option label="正常" value="1"></el-option>
           </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="置顶状态:" prop="flag">
           <el-select v-model="searchFormDatas.flag" size="small" placeholder="请选择">
             <el-option label="默认" value="0"></el-option>
             <el-option label="优先1" value="1"></el-option>
             <el-option label="优先2" value="2"></el-option>
             <el-option label="优先3" value="3"></el-option>
             <el-option label="游戏页面" value="4"></el-option>
           </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="标题标红:" prop="redflag">
           <el-select v-model="searchFormDatas.redflag" size="small"  placeholder="请选择">
             <el-option label="否" value="0"></el-option>
             <el-option label="是" value="1"></el-option>
           </el-select>
          </el-input>
        </el-form-item>
        <br />
        <el-form-item label="简  介:" prop="description">
          <el-input type="textarea" :rows="3" size="small" v-model.number="searchFormDatas.description" auto-complete="off">
           </el-input>
        </el-form-item>
        <p class="title-p">内容：</p>
        <div class="body-content">
          <quill-editor v-model="content"
            data-placeholder="请输入内容..."
            :options="editorOption"
            ref="myQuillEditor"
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
import {Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
/*console.log(container)工具栏配置*/
export default {
  name: 'newsDetail',
  data () {
    return {
      selectRowId:this.$route.params.num,
      selectRowData:{},
       searchFormDatas: {
        title:"",
        link:"",
        source:"",
        description:"",
        status:"1",
        redflag:"0",
        websitetype:"2",
        flag:"0",
        nexttitle:""
        },
      content:"",
      images:"",
      h3Title:"修改",
      fileList: [],
      editorOption: {
        placeholder:"请输入内容...",
          modules: {
            ImageExtend: {
              loading: true,
              name: 'img',
              action: 'https://jsonplaceholder.typicode.com/posts/',
              response: (res) => {
                console.log(res.info)
                return res.info
              }
            },
            toolbar:{ container: [['image'],[{'align':[]}]],
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
              }
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
            console.log(this.images)
            console.log(this.content)
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
      handleRemove(file, fileList) {
        /*************** 图片上传***************/
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      fns(){
        /*console.log(this.$route.params.num)*/
        if (this.$route.params.num==="add") {
          this.h3Title="添加"
        }else{
          this.h3Title="修改";
          this.fileList=[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }

      }
  },

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
