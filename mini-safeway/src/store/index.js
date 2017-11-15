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
import users from './modules/users'

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
    users: users
  }
})
