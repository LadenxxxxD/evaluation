import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd, { message, notification, Modal, Form } from 'ant-design-vue'
import Buefy, { ToastProgrammatic as Toast } from 'buefy'
import ElementUI from 'element-ui'
import 'ant-design-vue/dist/antd.css'
import 'buefy/dist/buefy.css'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$modal = Modal
Vue.prototype.$form = Form
Vue.prototype.$toast = Toast

Vue.use(Antd)
Vue.use(ElementUI)
Vue.use(Buefy)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
