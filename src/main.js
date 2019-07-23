import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { router } from './router.js'
import VueSimplemde from 'vue-simplemde'
import ChartPlugin from './plugins/ChartPlugin.js';
import animePlugin from './plugins/animePlugin.js';
import 'simplemde/dist/simplemde.min.css'
import { store } from './store.js'


import axios from 'axios'

axios.defaults.baseURL = 'https://webmobile-5.firebaseio.com'

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(VueSimplemde);
Vue.use(ChartPlugin);
Vue.use(animePlugin);
// Response Interceptor


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
