const MyHttpServer = {}
import axios from 'axios'
MyHttpServer.install = function (Vue, options) {
  
    axios.defaults.baseURL='http://3.112.132.86:8888/api/private/v1/'
    // 4. 添加实例方法
    Vue.prototype.$http = axios
    }
  
    export default MyHttpServer