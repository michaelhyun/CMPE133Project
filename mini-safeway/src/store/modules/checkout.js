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
        // Initialize products array to the first object to ensure for loop traverses
        // products array.
        products.push({
          name: obj[Object.keys(obj)[0]].name,
          imageSrc: obj[Object.keys(obj)[0]].imageSrc,
          price: obj[Object.keys(obj)[0]].price
        })

        // Every product purchased, regardless of name, has a unique key. So,
        // in order to retrieve unique products, every single node must be traversed
        // to check to see if there are repeats
        for (let key in obj) {
          var matchingProduct = false
          for (let productKey in products) {
            if (products[productKey].name === obj[key].name) {
              matchingProduct = true
            }
          }
          if (!matchingProduct) {
            products.push({
              name: obj[key].name,
              imageSrc: obj[key].imageSrc,
              price: obj[key].price
            })
          }
        }
        commit('setOrderHistory', products)
      })
  }
}

const mutations = {
  setOrderHistory (state, payload) {
    state.orders = payload
  },
  clearOrderHistory (state) {
    state.orders = [ ]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
