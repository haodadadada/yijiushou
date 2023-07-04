import Vue from 'vue'
import App from './App'
import API from 'api/api.js'
import store from 'store/index.js'
import Tools from 'common/tools.js'
import * as filters from "common/filters.js";
import uView from '@/uni_modules/uview-ui'
import QQMapWX from 'common/qqmap-wx-jssdk.min.js'
const qqMap = new QQMapWX({
  key: 'SH6BZ-YUHKQ-Q5N5E-BM7BJ-DYIV7-52BJX' // 替换为你自己的 QQ 地图 API Key
})
Vue.use(uView);
// api 接口管理
Vue.prototype.$api = API
// 通用工具
Vue.prototype.$tools = Tools

Vue.prototype.qqMap = qqMap
// vuex 仓库
Vue.prototype.$store = store
Vue.config.productionTip = false
// 全局过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
