import { firebase } from '../../../firebase'

const state = {
  orders: []
}

const getters = {
  loadedOrders (state) {
    return state.orders
  }
}

const actions = {
  addToOrderHistory ({commit}, payload) {
    for (var i = payload.length - 1; i >= 0; i--) {
      var product = {
        name: payload[i].name,
        imageSrc: payload[i].imageSrc,
        price: payload[i].price
      }
      firebase.database().ref('orders/' + firebase.auth().currentUser.uid).push(product)
    }
  },
  retrieveOrderHistory ({commit}) {
    firebase.database().ref('orders/' + firebase.auth().currentUser.uid).once('value')
      .then((data) => {
        const products = []
        const obj = data.val()
        for (let key in obj) {
          products.push({
            name: obj[key].name,
            imageSrc: obj[key].imageSrc,
            price: obj[key].price
          })
        }
        commit('setOrderHistory', products)
      })
  }
}

const mutations = {
  setOrderHistory (state, payload) {
    state.orders = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
