import { firebase } from '../../../firebase'

const state = {
  shoppingCart: [ ],
  discounts: [ ]
}

const getters = {
  getShoppingCart (state) {
    return state.shoppingCart
  }
}

const actions = {
  applyPromotion ({state, commit}, code) {
    // Get reference to this scope for callback functions
    return new Promise(function (resolve, reject) {
      // If Code is not valid or was used, don't do anything
      if (code === '' || code === null || code === undefined || state.discounts.find(discount => discount.code === code)) {
        reject('Code already Applied.')
      } else {
        // Get Promotion Code Details
        firebase.database().ref('savings/codes/' + code).once('value')
          .then((snapshot) => {
            // Then, apply promotion based on 'type' and 'savings'
            if (snapshot) {
              var obj = snapshot.val()
              switch (obj.type) {
                // Product promotions
                case 'product':
                  // First, check if the requirements have been met.
                  var product = state.shoppingCart.find(shoppingCart => shoppingCart.name === obj.product)
                  // If the requirements have been met, proceed and apply savings based on 'savings'
                  if (product.quantity >= obj.quantity) {
                    // Dollar amount off if savings is integer, free product if savings is string
                    if (typeof obj.savings === 'number') {
                      var discount = {
                        'code': code,
                        'discount': obj.savings
                      }
                      console.log(discount)
                      commit('addToDiscounts', discount)
                      resolve(code)
                    } else {
                      firebase.database().ref('products/' + obj.savings).once('value')
                        .then((snapshot) => {
                          var freeProduct = snapshot.val()
                          firebase.storage().ref('products/' + obj.savings + '.jpg').getDownloadURL()
                            .then((url) => {
                              commit('addToCart', {
                                name: obj.savings,
                                quantity: 1,
                                brand: freeProduct.brand,
                                imageSrc: url,
                                price: freeProduct.price
                              })
                              commit('addToDiscounts', code, freeProduct.price)
                            })
                        })
                    }
                  } else {
                    reject('Product Quantity not met.')
                  }
                  break
                // Brand promotions
                case 'brand':
                  var brandProductsArr = state.shoppingCart.filter(shoppingCart => shoppingCart.brand === obj.brand)
                  var brandProductsNum = 0
                  for (let key in brandProductsArr) {
                    brandProductsNum += brandProductsArr[key].quantity
                  }
                  if (brandProductsNum >= obj.quantity) {
                    // Dollar amount off if savings is integer, free product if savings is string
                    if (typeof obj.savings === 'number') {
                      console.log(obj)
                      commit('addToDiscounts', {'code': code, 'discount': obj.savings})
                      resolve(code)
                    } else {
                      firebase.database().ref('products/' + obj.savings).once('value')
                        .then((snapshot) => {
                          var freeProduct = snapshot.val()
                          firebase.storage().ref('products/' + obj.savings + '.jpg').getDownloadURL()
                            .then((url) => {
                              commit('addToCart', {
                                name: obj.savings,
                                quantity: 1,
                                imageSrc: url,
                                price: freeProduct.price
                              })
                              commit('addToDiscounts', code, freeProduct.price)
                            })
                        })
                    }
                  } else {
                    reject('Brand quantity not met.')
                  }
                  break
              }
              resolve(snapshot)
            } else {
              reject('Error retrieving promotions.')
            }
          })
      }
    })
  }
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
    // TODO: WHen a promotion is applied, and a product is part of the promotion, what happens when the product is removed from cart.
    state.shoppingCart.splice(index, 1)
  },
  clearCart (state) {
    state.shoppingCart = [ ]
    state.appliedPromotionCodes = [ ]
    state.discounts = [ ]
  },
  addToDiscounts (state, discount) {
    state.discounts.push(discount)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
