import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueTypedJS from 'vue-typed-js';

Vue.config.productionTip = false
Vue.use(VueTypedJS);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
