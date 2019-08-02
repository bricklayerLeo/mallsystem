<template>
<div class="login">

<el-form class="login-form" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formLabelAlign.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formLabelAlign.password"></el-input>
  </el-form-item>
 <el-button class="btn" type="primary" @click.prevent='handleLogin'>登录</el-button>
</el-form>

 
</div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {
          username: '',
          password: '',
         
        }
      };
    },
    methods:{
     async handleLogin(){
      const res =  await this.$http.post('login',this.formLabelAlign)
        
           console.log(res)

           const {data,meta:{msg,status}} = res.data

           if(status === 200 ){
             localStorage.setItem('token',data.token)
             this.$router.push({name:'home'})
             this.$message.success(msg);
           }else{
             this.$message.success(msg);
           }

        
      //   this.$http.post('login',this.formLabelAlign)
      //   .then((res)=>{
      //     console.log(res)
      //     const {data,meta:{msg,status}} = res.data

      //     if(status === 200 ){
           
      //       this.$router.push({name:'home'})
      //       this.$message.success(msg);
      //     }else{
      //       this.$message.success(msg);
      //     }
      //   })
       }
    }
  }
</script>

<style scoped>
.login{
    height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form{
 width: 300px;
  background-color: white;
  border-radius: 10px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;

}

.btn{
 margin-top: 10px;
 width: 300px;
}
</style>

