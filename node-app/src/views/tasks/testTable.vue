<template>
    <!-- 数据库测试 -->
    <div class="list-two">
      <el-table :data="tableData" border style="width: 100%" max-height="600" size="small" stripe  tooltip-effect="dark">
        <el-table-column fixed prop="id" label="id" width="60" class-name="custom-header">
        </el-table-column>
        <el-table-column prop="nodeName" label="节点名称" width="80">
        </el-table-column>
        <el-table-column prop="taskName" label="任务名称" width="80">
        </el-table-column>
        <el-table-column prop="urgencyLevel" label="紧急程度" width="80">
        </el-table-column> 
        <el-table-column prop="customerName" label="客户名称" width="100">
        </el-table-column>
        <el-table-column prop="customerPhone" label="客户电话" width="120">
        </el-table-column>
        <el-table-column prop="administrativeDivision" label="行政区划" width="220">
        </el-table-column>
        <el-table-column prop="customerAddress" label="客户地址" width="180">
        </el-table-column>
        <el-table-column prop="no" label="服务单号" width="120">
        </el-table-column>
        <el-table-column prop="serviceNumber" label="服务号" width="120">
        </el-table-column>
        <el-table-column prop="brandName" label="品牌" width="120">
        </el-table-column>
        <el-table-column prop="categoryName" label="品类" width="120">
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态" width="120">
        </el-table-column>
        <el-table-column prop="isComplete" label="是否齐套" width="120">
        </el-table-column>
        <el-table-column prop="contractDeliveryTime" label="合同交期" width="120">
        </el-table-column>
        <el-table-column prop="contractAmount" label="合同款" width="120">
        </el-table-column>
        <el-table-column prop="amountReceived" label="已收" width="120">
        </el-table-column>
        <el-table-column prop="amountDue" label="欠款" width="120">
        </el-table-column>
        <el-table-column prop="contractConfirmationTime" label="合同确认时间" width="120">
        </el-table-column>
        <el-table-column prop="plannedStartTime" label="计划开始时间" width="120">
        </el-table-column>
        <el-table-column prop="plannedEndTime" label="计划完成时间" width="120">
        </el-table-column>
        <el-table-column prop="assigneeName" label="责任人" width="120">
        </el-table-column>
        <el-table-column prop="debtRatio" label="欠款比例" width="120">
        </el-table-column>
        <el-table-column prop="store" label="门店" width="120">
        </el-table-column>
        <el-table-column prop="salesperson" label="导购" width="120">
        </el-table-column>
      </el-table>

    </div>
  </template>
  
  
  <script>
  // 可以忽略eslint检查未使用变量错误
  // eslint-disable-next-line no-unused-vars
  // ... 这里是你的代码 ...
  </script>
  
  
  <script>
  
  import { getTaskList } from '../../api/user'
  
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
      // 获取列表
      getList() {
        getTaskList().then((res) => {
          this.loading = true
          this.$message.success("获取数据成功");
          this.tableData = res.data.data;
          console.log(res,"ressss");
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
  

  <style>


  .el-table thead{
    color: #1f2225;
  }
  </style>
  
  <style lang="scss" scoped>
  .el-main {
    padding: 0 !important;
  }


  </style>