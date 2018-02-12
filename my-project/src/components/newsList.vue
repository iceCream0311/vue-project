<template>
  <div class="news">
    <h3 class="title">新闻内容管理</h3>
    <div class="search">
      <div>
        状态:
        <el-select v-model="status" placeholder="请选择"  size="small">
          <el-option value="1" label="正常">正常</el-option>
          <el-option value="0" label="隐藏">隐藏</el-option>
        </el-select>
      </div>
      <div>
        <div class="demo-input-suffix">
          标题：<el-input size="small" placeholder="标题" v-model="title"></el-input>
        </div>
      </div>
      <div>
        <div class="demo-input-suffix">
          置顶状态：
          <el-select v-model="flag"   size="small">
            <el-option value="0" label="全部">全部</el-option>
            <el-option value="1" label="默认">默认</el-option>
            <el-option value="2" label="优先1">优先1</el-option>
            <el-option value="3" label="优先2">优先2</el-option>
            <el-option value="4" label="优先3">优先3</el-option>
            <el-option value="5" label="游戏页面">游戏页面</el-option>
          </el-select>
        </div>
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
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column type="index" label="序号"  width="50"> </el-table-column>
        <el-table-column property="title" label="标题" width="200"></el-table-column>
        <el-table-column property="link" label="连接地址" width="120"></el-table-column>
        <el-table-column property="status" label="状态"  width="100">
           <template slot-scope="scope">
              {{scope.row.status==1?'正常':'隐藏'}}
          </template>
        </el-table-column>
        <el-table-column property="editor" label="简介"></el-table-column>
        <el-table-column property="images" label="缩略图"></el-table-column>
        <el-table-column property="flag" label="优先级"  width="100"></el-table-column>
        <el-table-column property="createtime" label="录入时间" width="200"></el-table-column>
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
import {neswData} from '../data/data.js';
export default {
  name: 'newsList',
  data () {
    /*this.search()*/
    return {
      title:"",
      status:"1",
      flag:"0",
      tableData: neswData.rows,
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
        this.$router.push({path:`/newsDetail${this.currentRow.id}`})
      },
      addFn(){
        this.$router.push({path:`/newsDetailadd`})
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      paginationHandleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      search(){
        let datas ={
          flag:this.flag,
          status:this.status,
          title:this.title
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
<style>
  .pagination{margin: 20px 0}
 .news .el-table .cell{height: 23px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}

</style>
