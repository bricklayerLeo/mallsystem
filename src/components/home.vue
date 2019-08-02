<template>
<div class="home">
<el-container class="container">
  <el-header class="header">
      <el-row>
  <el-col :span="4"><div class="grid-content bg-purple">
      <img class="img1" src="../assets/images/logo.jpg" alt="无法显示此图片">
      </div>
      </el-col>
  <el-col :span="18"><div class="grid-content bg-purple-light title">
      电商后台管理系统
      </div>
      </el-col>
  <el-col :span="2"><div class="grid-content bg-purple exit">
       <a class="tui" @click.prevent="handleSigout" href="">退出</a>
      </div></el-col>
</el-row>
  </el-header>
  <el-container>
    <el-aside class="aside" width="200px">
    
    <el-menu
      class="el-menu-vertical-demo"
      :unique-opened='true'>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="1-1"> <i class="el-icon-menu"></i>用户列表</el-menu-item>
      </el-submenu>

       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="1-1"> <i class="el-icon-menu"></i>角色列表</el-menu-item>
           <el-menu-item index="1-1"> <i class="el-icon-menu"></i>权限列表</el-menu-item>
      </el-submenu>

       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
          <el-menu-item index="1-1"> <i class="el-icon-menu"></i>商品列表</el-menu-item>
           <el-menu-item index="1-1"> <i class="el-icon-menu"></i>分类参数</el-menu-item>
            <el-menu-item index="1-1"> <i class="el-icon-menu"></i>商品分类</el-menu-item>
      </el-submenu>

       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
          <el-menu-item index="1-1"> <i class="el-icon-menu"></i>订单列表</el-menu-item>
      </el-submenu>

       <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
          <el-menu-item index="1-1"> <i class="el-icon-menu"></i>数据报表</el-menu-item>
      </el-submenu>

    </el-menu>

    </el-aside>
    <el-main class="mian">Main</el-main>
  </el-container>
</el-container>
 
</div>
</template>

<script>
 export default{
     beforeCreate(){
         const token = localStorage.getItem('token')
         if(!token){
             this.$router.push({name:'login'})
         }
     },
     methods:{
         handleSigout(){
             localStorage.clear('token')
              this.$message.success('退出成功');
             this.$router.push({name:'login'})
         }
     }

 }
</script>

<style scoped>
.tui{
    text-decoration: none;
}
.exit{
    line-height: 60px;
}
.title{
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
}
.img1{
 width:150px; height:60px;
}
.home{
    height: 100%;
}
.container{
     height: 100%;
    
}
.header{
    background-color: #B3C0D1;
    
}
.mian{
  
    background-color: #E9EEF3;
    
}
.aside{
background-color: #D3DCE6;;
}
                                                              
</style>

