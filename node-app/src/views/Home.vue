<template>
  <div class="page">
    <el-container style="height:100vh;">
        <el-aside width="200px" class="sidebar el-scrollbar">
          <!-- 刷新选中 -->
          <!-- background-color="#545c64" -->
          <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#304156" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>文章首页</span>
              </template>
              <router-link :to="{ path: '/home/one'}" class="style-a">
                <el-menu-item index="/home/one">
                  创建文章  
                </el-menu-item>
              </router-link>
              <router-link :to="{ path: '/home/two' }" class="style-a">
                <el-menu-item index="/home/two">
                  文章列表
                </el-menu-item>
              </router-link>
              <!-- <el-menu-item index="1-3">选项3</el-menu-item> -->
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>任务中心</span>
              </template>
              <!-- <el-menu-item index="2-1">
                <span slot="title">数据库测试</span>
              </el-menu-item> -->
              <router-link :to="{ path: '/home/testTable'}" class="style-a">
                <el-menu-item index="/home/testTable">
                  数据库测试
                </el-menu-item>
              </router-link>
              <router-link :to="{ path: '/home/tasks'}" class="style-a">
                <el-menu-item index="/home/tasks">
                  智能排序
                </el-menu-item>
              </router-link>
            </el-submenu>
          </el-menu>
        </el-aside>

      <!-- 内容区域 -->
      <el-container>
        <!-- header -->
        <el-header style="text-align: right;">
          <!-- <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>用户信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>返回登录页</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>admin</span> -->
          <div class="navbar">
      <div class="navbar-left">
        <el-button icon="el-icon-full-screen" @click="toggleFullScreen"></el-button>
      </div>
      <div class="navbar-right">
        <el-dropdown trigger="click">
          <span class="avatar-wrapper">
            <img :src="avatarUrl" alt="Avatar">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="showProfile">个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
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
      isCollapse: false, // 是否折叠侧边栏
      activeIndex: '', // 初始化 activeIndex

      isFullScreen: false,
      avatarUrl: require('@/assets/touxiang.png'), // 替换为你的头像路径
    }
  },
  methods: {
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
      if (this.isFullScreen) {
        // 进入全屏模式
        document.documentElement.requestFullscreen();
      } else {
        // 退出全屏模式
        document.exitFullscreen();
      }
    },
    showProfile() {
      // 展示个人中心相关操作
    },
    logout() {
      // 执行退出登录操作
    },




    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created(){
    // localStorage读取当前选中的侧边栏菜单值 activeIndex
   let index = localStorage.getItem('activeIndex'); 
   this.activeIndex=index;
  }
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
.is-active {
  color: #fff !important;
  background-color: #2d8cf0 !important;
}


.el-submenu__title {
  color: #bbbbbb;
}
</style>

<style lang="scss" scoped>

// el-header
.navbar {
  display: flex;
  justify-content: space-between;
}

.navbar-left {
  margin-right: 20px;
}

.avatar-wrapper {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: middle;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-wrapper img {
  width: 100%;
  height: 100%;
}

.el-menu {
  /* //去掉菜单栏右边多出一像素的线条 */
  border-right: none;
}

.page {
  // border: 1px solid red;
}

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

.el-menu-item-group {
  background-color: rgb(0, 20, 40);
}

.el-main {
  background-color: #fff;
}
body>.el-container {
  margin-bottom: 40px;
}

</style>
