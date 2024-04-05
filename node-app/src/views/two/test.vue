<template>
    <div class="sidebar">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- 一级菜单 -->
        <el-menu-item index="1">
          <i class="el-icon-location"></i>
          <span slot="title">菜单1</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>    
            <span>菜单2</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isCollapse: false, // 是否折叠侧边栏
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
  }
  
  .el-menu-vertical-demo {
    border: none;
  }
  </style>
  