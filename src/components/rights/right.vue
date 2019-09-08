<template>
   <el-card>
      <mybread :level1='level1' :level2='level2'></mybread>

 <el-table height="750px" class="table1"
    :data="rightlist"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="#"
      width="100">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
    <el-table-column
      prop="level"
      label="层级">
     <template slot-scope="scope">
         <span  v-if="scope.row.level === '0'">一级</span>
         <span  v-if="scope.row.level === '1'">二级</span>
         <span  v-if="scope.row.level === '2'">三级</span>
     </template>
    </el-table-column>
   </el-table>

   </el-card>
</template>

<script>
import mybread from '../subcom/mybread'
import axios from 'axios'
export default {
    data(){
        return{
         level1:'权限管理',
         level2:'权限列表',
         rightlist:[]
        }
    },
    components:{
        mybread
    },
    created(){
        this.getrightlist()
    },
    methods:{
       async getrightlist(){
           const res = await this.$http.get(`rights/list`)
           console.log(res)
           this.rightlist=res.data.data
       }
    }
}
</script>


<style scoped>
.table1{
    margin-top: 20px;
}
</style>

