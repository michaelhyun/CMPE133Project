import { firebase } from '../../../firebase'
const state = {
  promoCodes: [],
  savings: []
}

const getters = {
  getPromoCodes (state) {
    return state.promoCodes
  },
  getSavingsItems (state) {
    return state.savings
  }
}

const actions = {
  getSavingsItems ({commit}) {
    var productNames = []
    var products = []
    firebase.database().ref('savings/club').once('value')
      .then((data) => {
        const obj = data.val()
        for (let key in obj) {
          productNames.push({
            name: key
          })
        }
      })
    firebase.database().ref('products/').once('value')
      .then((data) => {
        const obj = data.val()
        for (let key in obj) {
          for (var i = 0; i < productNames.length; i++) {
            if (productNames[i].name === key) {
              products.push({
                name: key,
                price: obj[key].price
              })
            }
          }
        }
        commit('setSavingsItems', products)
      })
  }
}

const mutations = {
  setPromoCodes (state, promoCodes) {
    state.promoCodes = promoCodes
  },
  setSavingsItems (state, products) {
    state.savings = products
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
