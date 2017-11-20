import Vue from 'vue'
import Vuex from 'vuex'
// Rootstore actions, getters
import * as actions from './actions'
import * as getters from './getters'
// Store Modules
import cart from './modules/cart'
import checkout from './modules/checkout'
import products from './modules/products'
import promotions from './modules/promotions'
import search from './modules/search'
import sidebar from './modules/sidebar'
import toolbar from './modules/toolbar'
import users from './modules/users'
// Store module
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    cart: cart,
    checkout: checkout,
    products: products,
    promotions: promotions,
    search: search,
    sidebar: sidebar,
    toolbar: toolbar,
    users: users
  },
  plugins: [createPersistedState()]
})
