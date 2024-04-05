import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

//全局修改element默认配置  全局设置表格内容超出显示   showOverflowTooltip
ElementUI.TableColumn.props.showOverflowTooltip ={type:Boolean, default: true}

Vue.config.productionTip = false



Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
