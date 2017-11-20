const state = {
  shoppingCart: [ ]
}

const getters = {
  getShoppingCart (state) {
    return state.shoppingCart
  }
}

const actions = {
}

const mutations = {
  addToCart (state, product) {
    const index = state.shoppingCart.findIndex(shoppingCart => shoppingCart.name === product.name)
    console.log(index)
    if (index > -1) {
      state.shoppingCart[index].quantity += product.quantity
    } else {
      state.shoppingCart.push(product)
    }
  },
  removeFromCart (state, index) {
    state.shoppingCart.splice(index, 1)
  },
  clearCart (state) {
    state.shoppingCart = [ ]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
