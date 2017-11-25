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
    firebase.database().ref('savings/club').once('value')
      .then((data) => {
        const products = []
        const obj = data.val()
        for (let key in obj) {
          products.push({
            name: key,
            price: obj[key]
          })
        }
        console.log(products)
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
