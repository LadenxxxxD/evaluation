import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd, { message, notification, Modal, Form } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$modal = Modal
Vue.prototype.$form = Form

Vue.use(Antd);
Vue.use(Buefy);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
