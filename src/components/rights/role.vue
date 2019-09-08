<template>
    <el-card>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
  <el-row class="addrole">
      <el-col>
          <el-button type="info">添加角色</el-button>
      </el-col>
  </el-row>
    
 <el-table :data="rolelist" height="600px" style="width: 100%">
      <el-table-column type="expand"  width="80" >
        <template slot-scope="scope">
        <el-row v-for="(item1,i) in scope.row.children" :key="i">
          <el-col :span="4">
            <el-tag @close="closetag(scope.row,item1.id)"  closable>{{item1.authName}}  </el-tag>  <i class="el-icon-arrow-right"></i>
          </el-col>
          <el-col :span="20">
            <el-row  v-for="(item2,i) in item1.children" :key="i">
              <el-col :span="4">
                <el-tag @close="closetag(scope.row,item2.id)" type='success'  closable>{{item2.authName}} </el-tag>   <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20" >
                          <el-tag @close="closetag(scope.row,item3.id)" type='success' closable v-for="(item3,i) in item2.children" :key="i">{{item3.authName}}</el-tag>
                </el-col>
            </el-row>
          </el-col>
        </el-row>
        <span v-if="scope.row.children.length===0">未分配权限</span>
      </template>
      </el-table-column>
       <el-table-column type="index" label="#"  width="80" ></el-table-column>
      <el-table-column prop="roleName" label="主角名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button plain size="mini" type="primary" @click="edituser(scope.row)" icon="el-icon-edit" circle></el-button>
            <el-button plain size="mini" type="danger" @click="deleteuser(scope.row.id)" icon="el-icon-delete" circle></el-button>
            <el-button plain size="mini" type="success" @click="showdiagright(scope.row)" icon="el-icon-check" circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

 <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">

   <el-tree
  :data="treelist"
  show-checkbox
  node-key="id"
  :default-expanded-keys="[2, 3]"
  :default-checked-keys="[5]"
  :props="defaultProps">
  </el-tree>
  
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>

    </el-card>
</template>

<script>

export default {
    data(){
        return{
          rolelist:[],
          noright:false,
          dialogFormVisibleRight:false,
          treelist:[],
          defaultProps: {
          children: 'children',
          label: 'authName'
        }
        }
    },
    created(){
        this.getrolelist()
    },
    methods:{
        async showdiagright(role){
          const res = await this.$http.get(`rights/tree`)
          console.log(res)
          this.treelist=res.data.data
          var arr=[]
           this.treelist.forEach(item=>{
             arr.push(item.id)
           })
            this.dialogFormVisibleRight=true

        },
      async closetag(role,rid){
        const res = await this.$http.delete(`roles/${role.id}/rights/${rid}`)
  
        if(res.status===200){
           this.$message.success(res.data.meta.msg);
        }
        console.log(role)
         role.children =  res.data.data
      },
      async getrolelist(){
          const res = await this.$http.get(`roles`)
          
          this.rolelist = res.data.data
        
      }
    }
}
</script>

<style scoped>
.addrole{
    margin-top: 20px;
}
</style>


