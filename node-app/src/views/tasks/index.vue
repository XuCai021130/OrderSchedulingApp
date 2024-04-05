<template>
    <div class="list-two">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="body" label="文本内容" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="openEditDialog(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 编辑弹框 -->
      <el-dialog :visible.sync="dialogVisible" title="编辑" width="30%">
        <el-form :model="editedData" label-width="80px">
          <el-form-item label="ID">
            <el-input v-model="editedData.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="editedData.body"></el-input>
          </el-form-item>
          <!-- 其他表单项 -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEdit">取消</el-button>
          <!-- <el-button @click="dialogVisible = false">取消</el-button> -->
          <el-button type="primary" @click="saveEdit">保存</el-button>
        </div>
      </el-dialog>
  
  
    </div>
  </template>
  
  
  <script>
  // 可以忽略eslint检查未使用变量错误
  // eslint-disable-next-line no-unused-vars
  // ... 这里是你的代码 ...
  </script>
  
  
  <script>
  
  import { getArtList, deleteArticle,updateArticle } from '../../api/user'
  
  export default {
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        row: {}, // 传进来的行数据
        editedData: {} // 此处为示例，根据实际情况定义需要编辑的数据对象
      }
    },
  
    methods: {
      openEditDialog(row) {
        this.dialogVisible = true;
        this.editedData = {
          id:row.id,
          name:row.name,
          body:row.body
        };
      },
      cancelEdit() {
        this.dialogVisible = false;
      },
      saveEdit() {
        let arr = {
          id:this.editedData.id,
          name:this.editedData.name,
          body:this.editedData.body
        };
        console.log(arr,"arr")
  
        updateArticle(arr).then((res) => { // eslint-disable-line no-unused-vars
            this.$message.success("修改成功");
            this.getList();
            // this.loading = false
          }).catch((err) => { // eslint-disable-line no-unused-vars
            console.log('error submit!! 报错');
            this.loading = false
            return false
          })
        this.dialogVisible = false;
      },
      //删除
      handleDelete(row) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteArticle(row.id).then((res) => { // eslint-disable-line no-unused-vars
            this.loading = true;
            this.$message.success("删除成功");
            this.getList();
            this.loading = false
          }).catch((err) => { // eslint-disable-line no-unused-vars
  
            console.log('error submit!! 报错');
            this.loading = false
            return false
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      },
  
      // 获取列表
      getList() {
        getArtList().then((res) => {
          this.loading = true
          this.$message.success("获取数据成功");
          this.tableData = res.data.data;
          this.loading = false
        }).catch((err) => { // eslint-disable-line no-unused-vars
          console.log('error submit!! 报错');
          this.loading = false
        })
      },
  
    },
  
    created() {
      this.getList()
    }
  
  };
  </script>
  
  
  <style lang="scss" scoped>
  .el-main {
    padding: 0 !important;
  }
  </style>