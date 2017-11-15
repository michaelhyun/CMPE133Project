import { firebase } from '../../../firebase'

const state = {
}

const getters = {
}

const actions = {
  addToOrderHistory ({commit}, payload) {
    for (var i = payload.length - 1; i >= 0; i--) {
      firebase.database().ref('orders/' + firebase.auth().currentUser.uid).child('Orders').push(payload[i].name)
    }
  }
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
