<template>
  <div class="recruitment">
    <h3 class="title">招聘信息</h3>
      <div class="search">
      <div>
        <div class="demo-input-suffix">
          标题：<el-input size="small" placeholder="标题" v-model="title"></el-input>
        </div>
      </div>
      <div>
        状态:
        <el-select v-model="status" placeholder="请选择"  size="small">
          <el-option value="1" label="正常">正常</el-option>
          <el-option value="0" label="隐藏">隐藏</el-option>
        </el-select>
      </div>
        <div class="demo-input-suffix">
          类型：
          <el-select v-model="type"   size="small">
            <el-option value="0" label="全部">全部</el-option>
            <el-option value="1" label="技术类">技术类</el-option>
            <el-option value="2" label="运营类">运营类</el-option>
            <el-option value="3" label="客服类">客服类</el-option>
            <el-option value="4" label="编辑类">编辑类</el-option>
          </el-select>
        </div>
         <div class="demo-input-suffix">
          开始日期：
          <el-date-picker
           size="small"
            v-model="stime"
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
            v-model="etime"
            value-format="yy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      <div>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
      </div>
      <div>
        <el-button type="success" size="small" icon="el-icon-plus" @click="addFn">添加</el-button>
        <el-button type="warning" size="small" icon="el-icon-edit" @click="editorFn">修改</el-button>
      </div>
    </div>
    <div class="table-body">
      <el-table
        ref="singleTable"
        :data="tableData"
        height="600"
        border
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column type="index" label="序号"  width="50"> </el-table-column>
        <el-table-column property="title" label="标题" ></el-table-column>
        <el-table-column property="number" label="数量" width="60" ></el-table-column>
        <el-table-column property="username" label="联系人" width="70"></el-table-column>
        <el-table-column property="type" label="类型"  width="70">
           <template slot-scope="scope">
              {{scope.row.status==1?'正常':'隐藏'}}
          </template>
        </el-table-column>
        <el-table-column  label="招聘描述" width="400">
          <template slot-scope="scope">
            <div v-html="scope.row.describe"></div>
          </template>
        </el-table-column>
        <el-table-column property="email" label="邮箱"></el-table-column>
        <el-table-column property="phone" label="联系电话"></el-table-column>
         <el-table-column property="status" label="状态">
           <template slot-scope="scope">
              {{scope.row.status==1?'正常':'关闭'}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="paginationHandleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import {recruitmentData} from '../data/data.js';
  export default {
    name:'recruitment',
    data () {
    /*this.search()*/
    return {
      title:"",
      status:"1",
      type:"0",
      stime:"",
      etime:"",
      page:1,
      rows:50,
      tableData: recruitmentData.rows,
      currentRow: null,
      currentPage4: 4,
      selectRowData:{}

      }
     },
     methods: {
      setCurrent(row) {
        /*设置选中行样式*/
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
          /*选中行获取数据*/
        this.currentRow = val;
      },
      editorFn(){
        console.log()
        this.$router.push({path:`/recruitmentDetail${this.currentRow.id}`})
      },
      addFn(){
        this.$router.push({path:`/recruitmentDetailAdd`})
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      paginationHandleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      search(){
        let datas ={
          type:this.type,
          status:this.status,
          title:this.title,
          stime:this.stime,
          etime:this.etime
        }
        console.log(this.datas)
        /*axios.post("http://admin.dxt.cn/news/list",{
          flag:-1,status:1,title:"",page:1,rows:50})
        .then(function(res){
          console.log(res)
        })*/
      }
    }

  }
</script>
