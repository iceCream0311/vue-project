<template>
  <div id="main">
    <el-header>
      动信通官网-管理平台
      <span class="tologin">注销</span>
    </el-header>
    <el-container>
      <el-aside :style="{width:isCollapse?'64px':'200px'}">
        <el-radio-group v-model="isCollapse" :style="{width:isCollapse?'64px':'200px',textAlign:isCollapse?'center':'right'}">
            <el-radio-button v-show="isCollapse"  :label="false"><i class="el-icon-d-arrow-right"></i></el-radio-button>
            <el-radio-button v-show="isCollapse?false:true" :label="true"><i class="el-icon-d-arrow-left"></i></el-radio-button>
        </el-radio-group>
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :class="{'el-menu-p' : isCollapse}" router>
          <el-menu-item index="newsList">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">新闻内容管理</span>
          </el-menu-item>
          <el-menu-item index="contactus">
            <i class="el-icon-service"></i>
            <span slot="title">联系我们</span>
          </el-menu-item>
          <el-menu-item index="recruitment">
            <i class="el-icon-zoom-in"></i>
            <span slot="title">招聘信息</span>
          </el-menu-item>
          <el-menu-item index="updatePwd">
            <i class="el-icon-setting"></i>
            <span slot="title">修改密码</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
export default {
  name:"admin",
   data() {
      return {
        isCollapse: false,
        activeIndex:this.$route.name
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
#main{
  width: 100%;
  min-height: 100vh;
}
.el-header{
    color: #fff;
    background-color: rgb(102, 102, 102);
    text-align: center;
    line-height: 60px;
    font-size: 18px;
    font-weight: bold;
    position: relative;
    z-index: 99;
  }

.tologin{
  float: right;
  font-weight: 400;
  font-size:14px;
  cursor: pointer;
}
  body > .el-container {
    margin-bottom: 40px;
    min-width: 1080px;

  }

  .el-aside {
    overflow: hidden;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 199px;
    min-height: 400px;
  }
  #main .el-aside>.el-menu{
    min-height:100vh;
    padding-top: 100px;
    box-sizing: border-box;
    margin-top: -100px;
  }
  .el-aside>.el-radio-group{
  position: relative;
  z-index: 100
  }
 #main .el-menu-p{
    position: absolute;
  }
  #main .el-aside .el-radio-group{
    transition: all 0.5s ;
  }
  #main .el-aside label.el-radio-button{
    padding: 10px
  }
  #main .el-aside .el-radio-button__inner{
    border:none;
    padding:0px;
  }

</style>
