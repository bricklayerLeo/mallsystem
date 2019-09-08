// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import '@/assets/css/reset.css'
import MyHttpServer from '@/plugin/http.js'
import moment from 'moment'

Vue.use(ElementUI);
Vue.use(MyHttpServer)

Vue.config.productionTip = false

Vue.filter('fmtdate',(value,formatString)=>{
  let date = new Date(value);
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(date).format(formatString);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
