<template>
  <div>
    <h3 class="title">联系我们</h3>
     <div class="search">
       <div class="demo-input-suffix">
          姓名：<el-input size="small" placeholder="姓名" v-model="searchData.name"></el-input>
        </div>
        <div class="demo-input-suffix">
          电话：<el-input size="small" placeholder="电话" v-model="searchData.phone"></el-input>
        </div>
        <div class="demo-input-suffix">
          地址：<el-input size="small" placeholder="地址" v-model="searchData.address"></el-input>
        </div>
        <div class="demo-input-suffix">
          开始日期：
          <el-date-picker
           size="small"
            v-model="searchData.stime"
            type="date"
            value-format="yy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="demo-input-suffix">
          结束日期：
          <el-date-picker
           size="small"
            type="date"
            value-format="yy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
        </div>
     </div>
     <div class="table-body">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column property="phone" label="电话" ></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="content" label="内容" ></el-table-column>
        <el-table-column property="ip" label="IP地址"></el-table-column>
        <el-table-column property="subtime" label="录入时间"></el-table-column>
        <el-table-column
          label="操作"
          width="60">
          <template slot-scope="scope">
           <el-button @click="handleClick(scope.row)" type='success' size="small"  plain>
              查看
            </el-button>
           <!--  <el-button size="small" type='primary'  plain>编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {ContactUsData} from '../data/data.js';
  export default {
    name:'contactus',
    data(){
      return{
      searchData:{
        name:"",
        phone:"",
        address:"",
        stime:"",
        etime:""
      },
      tableData:ContactUsData.rows,
      page:1,
      rows:50
      }
    },
    methods:{
      search(){
        console.log(this.searchData)
      },
      handleClick(row) {
        console.log(row);
         this.$alert(`<ul class="MessageBox">
          <li><p><span>姓名：</span>${row.name}</p><li>
          <li><p><span>电话：</span>${row.phone}</p><li>
          <li><p><span>地址：</span>${row.address}</p><li>
          <li><p><span>类型：</span>${row.type=="1"?'APP/微信/微网站开发':""}${row.type=="0"?'O2O开发':""}</p><li>
          <li><p><span>内容：</span>${row.content}</p><li>
          <li><p><span>录入时间：</span>${row.subtime}</p><li>
          <li><p><span>Ip地址：</span>${row.ip}</p><li>
          </ul>`, '联系我们', {
          dangerouslyUseHTMLString: true
        });
      }
    }
  }
</script>
<style type="text/css">
  .table-body .el-button--small{padding: 6px 8px;}
  .MessageBox p span{color: #000;font-weight: 600}
  .MessageBox p{line-height: 32px}
  .el-message-box__header{color:#000; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
</style>
