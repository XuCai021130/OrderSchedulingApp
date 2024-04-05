import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children:[
      {
        path:'/home/one',
        component: () => import('../views/one/index'),
      },
      {
        path:'/home/two',
        component: () => import('../views/two/ListArt'),
      },
    ]
  },

  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../views/Home.vue'),
    children:[
      {
        path:'/home/tasks',
        component: () => import('../views/tasks/index'),
      },
      {
        path:'/home/testTable',
        component: () => import('../views/tasks/testTable'),
      },
    ]
  },


  // {
  //   path: '/option',
  //   name: 'option',
  //   component: () => import('../views/option'),
  //   children:[
  //     {
  //       path: '/option/',
  //       name: 'option',
  //       component: () => import('../views/option/index.vue'),
  //     }
  //   ],
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const activeIndex = to.path; // 获取当前路由路径
  // 将 activeIndex 存储到本地存储或 Vuex 中 刷新页面选中上次左侧菜单
  localStorage.setItem('activeIndex', activeIndex);
  next();
});

export default router
