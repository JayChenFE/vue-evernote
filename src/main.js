// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import filters from '@/helpers/filter'
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

// 全局过滤器
for (let key in filters) {
    Vue.filter(key, filters[key])
}

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ElementUI)

/* eslint-disable no-new */
window.vm = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
