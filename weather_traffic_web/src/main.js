import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

new Vue({
  el: '#app',
  components: { App },
  render: h => h(App)
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)