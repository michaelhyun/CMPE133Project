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
    // const found = state.shoppingCart.find(p => p.itemName === product.name)
    state.shoppingCart.push({
      itemName: product,
      quantity: product.quantity
    })
  },
  removeFromCart (state, product) {
    const index = state.shoppingCart.findIndex(shoppingCart => shoppingCart.itemName === product.name)
    state.shoppingCart.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
