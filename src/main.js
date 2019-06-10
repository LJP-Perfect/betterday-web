// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
// index.js or main.js
import 'vuetify/dist/vuetify.min.css'
import store from './store.js'
// app.js
import '@mdi/font/css/materialdesignicons.css'
const Vuetify=require('vuetify')
const Router=require('vue-router')
const ElementUI=require('element-ui')
const axios=require('axios')
const Toasted=require('vue-toasted')
const Vue=require('vue')
Vue.use(Vuetify, {
  iconfont: 'mdi'
})
Vue.use(Toasted)
Vue.use(Router)
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$http= axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
