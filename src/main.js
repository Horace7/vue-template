import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import './assets/styles/index.less'

// import ElementUI from 'element-ui'

import './plugins/element.js'
import i18n from '@/lang'

Vue.config.productionTip = false

Vue.prototype.$listener = {
  callback: {},
  bind: function (name, fn) {
    if (typeof fn === 'function') {
      this.callback[name] = fn
    }
  },
  emit: function (name) {
    return this.callback[name]()
  },
  remove: function (name) {
    if (name in this.callback) {
      delete this.callback[name]
    }
  }
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
