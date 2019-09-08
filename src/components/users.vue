<template>
  <el-card class="box-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="search">
      <el-col>
        <el-input
          @clear="loaduserlist()"
          placeholder="请输入内容"
          v-model="input"
          class="input-with-select"
          clearable
>
          <el-button @click="searchusers" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="visible1" type="primary">添加用户</el-button>
      </el-col>
    </el-row>

 <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户名称" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>

     <el-form-item label="用户密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>

     <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>

     <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="adduser">确 定</el-button>
  </div>
 </el-dialog>


    <el-table :data="userslist" height="600px" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <template slot-scope="scope">{{scope.row.create_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="changestate(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button plain size="mini" type="primary" @click="edituser(scope.row)" icon="el-icon-edit" circle></el-button>
            <el-button plain size="mini" type="danger" @click="deleteuser(scope.row.id)" icon="el-icon-delete" circle></el-button>
            <el-button plain size="mini" type="success" @click="quanxian(scope.row)" icon="el-icon-check" circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

 <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleedit">
  <el-form :model="form">
    <el-form-item  label="用户名称" :label-width="formLabelWidth">
      <el-input disabled v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>

     <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>

     <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="edituserpost()">确 定</el-button>
  </div>
 </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[7, 14,22,29]"
      :page-size="7"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

  <el-dialog title="分配角色" :visible.sync="dialogFormVisible2">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      {{currentuser}}
    </el-form-item>
    <el-form-item label="角色" :label-width="formLabelWidth">

      <!-- 如果select绑定的数据值和option的value一样，就会显示该option的label值-->
      <el-select v-model="currentid" >
        <el-option label="请选择角色" :value="-1"></el-option>
         <el-option :label="item.roleName" :value="item.id"
         v-for="(item,index) in role" :key="index"
         >
         </el-option>

      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="setrole()">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      val: '',
      role:[],
      currentuser:'',
      currentid:-1,
      dialogFormVisible: false,
      dialogFormVisibleedit:false,
      dialogFormVisible2:false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        },
      formLabelWidth: '120px',
      input: "",
      pagenum: 1,
      pagesize: 7,
      userslist: [],
      total: -1,
      currentuserid:-1
      //currentUserid:-1
      
      };
    
  },
  created() {
    this.getUsersList();
  },
  methods: {
    async setrole(){
      this.dialogFormVisible2=false
      const res = await this.$http.put(`users/${this.currentuserid}/role`,{rid:this.currentid})
     console.log(res)
    },
    async quanxian(user){
      this.dialogFormVisible2 = true;
      this.currentuser=user.username
      this.currentuserid=user.id
      const res1 = await this.$http.get(`roles`)
      this.role=res1.data.data
      const res = await this.$http.get(`users/${user.id}`)
      this.currentid=res.data.data.rid
     
    },
    async changestate(user){

    const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
    console.log(res)
    },
      async edituserpost(){
          const res = await this.$http.put(`users/${this.form.id}`,this.form)
          console.log(res)
          this.getUsersList();
          this.dialogFormVisibleedit=false
      },
      edituser(user){
       
       // this.form = user

           this.form.username = user.username
           this.form.email = user.email
           this.form.mobile = user.mobile
           this.form.id = user.id

        this.dialogFormVisibleedit=true
        
      },
      deleteuser(id){
        this.$confirm('正在删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
           const res = await this.$http.delete(`users/${id}`)
           if(res.data.meta.status === 200){
               this.pagenum=1
               this.getUsersList();
               this.$message({
               type: 'success',
               message: 'res.data.meta.' });
           }else{

           }
           
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      async adduser(){
      const res = await this.$http.post(`users`,this.form)
 
      const {meta:{status,msg},data} = res.data
      this.dialogFormVisible = false
      if(status === 201){
           this.$message.success(msg);
           this.getUsersList();
           this.form={}
           //for (const key in this.form){
           //    if(this.form.hasOwnProperty(key)){
           //        this.form[key] = ''
            //   }
          // }
      }else{
          this.$message.warning(msg);
      }
    },  
      visible1(){
          this.dialogFormVisible=true
      },
    loaduserlist() {
      this.getUsersList();
    },
    searchusers() {
      this.getUsersList();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      // this.pagenum=1
      this.getUsersList();
    },
    handleCurrentChange(val) {
    
      this.pagenum = val;
      this.getUsersList();
    },
    async getUsersList() {
  
      const res = await this.$http.get(
        `users?query=${this.input}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
     console.log(res)
      const {
        data: { total, pagenum, users },
        meta: { status, msg }
      } = res.data;
      if (status === 200) {
        this.userslist = users;
        this.total = total;
       
      } else {
        this.$message.warning(msg);
      }
    }
  }
};
</script>
<style>
.input-with-select {
  width: 300px;
}
.search {
  margin-top: 30px;
}
</style>
