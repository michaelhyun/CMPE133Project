// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Import Firebase to use Firebase Auth and Firebase Database
import firebase from 'firebase'
import { store } from './store'

// Initialize Firebase
// **Not the recommended way of initializing Firebase. Initialize in an
//   external file and import it.
var config = {
  apiKey: 'AIzaSyDY8eaiPOZ_SVzKaqBm3D8yC8QKUsnUeBk',
  authDomain: 'mini-safeway-cmpe133-cloud8.firebaseapp.com',
  databaseURL: 'https://mini-safeway-cmpe133-cloud8.firebaseio.com',
  projectId: 'mini-safeway-cmpe133-cloud8',
  storageBucket: 'mini-safeway-cmpe133-cloud8.appspot.com',
  messagingSenderId: '320781320502'
}
firebase.initializeApp(config)

// Import plugins used for mini-safeway
import VueFire from 'vuefire'
import Vuetify from 'vuetify'

// Import styling for Vuetify
import '../node_modules/vuetify/src/stylus/main.styl'

Vue.config.productionTip = false

/* Plugins Used For mini-safeway
 *
 * Vuefire: Used to update the Vue application in real-time
 * whenever the Firebase Database is updated.
 *
 * Vuetify: Contains prebaked components and styling that follows
 * Google's Material design.
 *
 */
Vue.use(VueFire)
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
