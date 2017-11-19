// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Import Components used by App
import App from './App'
import Sidebar from './components/core/sidebar'
import ProductCard from './components/core/productCard'
import PromoCard from './components/core/promoCard'

// Import VueX store and Vue-Router
import router from './router'
// Import Firebase to use Firebase Auth and Firebase Database
import { store } from './store'

// Import plugins used for mini-safeway
/* Plugins Used For mini-safeway
 *
 * Vuefire: Used to update the Vue application in real-time
 * whenever the Firebase Database is updated.
 *
 * Vuetify: Contains prebaked components and styling that follows
 * Google's Material design.
 *
 */
import VueFire from 'vuefire'
import Vuetify from 'vuetify'

// Import styling for Vuetify
import '../node_modules/vuetify/src/stylus/main.styl'

Vue.config.productionTip = false

// Install plugins
Vue.use(VueFire)
Vue.use(Vuetify)

// Register components
Vue.component('sidebar', Sidebar)
Vue.component('productCard', ProductCard)
Vue.component('promoCard', PromoCard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    this.$store.dispatch('initializeStoreData')
  }
})
