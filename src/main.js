import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuefeather from 'vue-feather'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import VueFormulate from '@braid/vue-formulate'
import '@/assets/formulate.css';
//import '@/assets/vuegoodtable.css';
import VueApexCharts from 'vue-apexcharts'
import Select2 from 'v-select2-component';

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
Vue.component('Select2', Select2)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuefeather)
Vue.use(VueGoodTablePlugin)
Vue.use(VueFormulate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
