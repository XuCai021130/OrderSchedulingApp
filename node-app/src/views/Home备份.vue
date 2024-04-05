<template>
  <div class="page">
    <!-- <h1>Welcome to Home Page!</h1> -->

    <el-container style="height: 100vh;">
      <!-- 侧边栏 -->
      <el-aside width="200px" class="el-scrollbar">
        <el-menu :default-openeds="['1', '3']">
          <router-link :to="{ path: '/home/one', query: { id: 1 } }" class="style-a">
            <el-menu-item index="1-1">
              新建文章
            </el-menu-item>
          </router-link>
          <router-link :to="{ path: '/home/two', query: { id: 1 } }" class="style-a">
            <el-menu-item index="1-2">
              文章列表
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>用户信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>返回登录页</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>admin</span>
        </el-header>
        <!-- 路由部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>




  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
};
</script>
<style>
/* 一级菜单hover */
.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0;
  color: #fff;
  background-color: transparent !important;
}

.style-a {
  text-decoration: none;
}

.style-a :hover {
  color: #fff !important;
}

.el-submenu.is-active .el-submenu__title {
  color: red !important;
}

.is-active {
  color: #fff !important;
  background-color: #2d8cf0 !important;
}


.el-submenu__title {
  color: #bbbbbb;
}
</style>

<style lang="scss" scoped>
.el-header {
  background-color: #fff !important;
  box-shadow: 0 1px 4px #00152914;
  color: #333639;
  transition: all .2s ease-in-out;
  z-index: 11;
}

.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: rgb(0, 20, 40);
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-submenu {
  background-color: rgb(0, 20, 40);
}

.el-menu-item {
  background-color: rgb(0, 20, 40);
  //  color: rgb(191, 203, 217);
  color: #bbbbbb;

}

.el-menu-item-group {
  background-color: rgb(0, 20, 40);
}



.el-main {
  background-color: #fff;
}


body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
