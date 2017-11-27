import { firebase } from '../../../firebase'

const state = {
  shoppingCart: [ ],
  discounts: [ ]
}

const getters = {
  getShoppingCart (state) {
    return state.shoppingCart
  },
  getDiscounts (state) {
    return state.discounts
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
            if (snapshot.val() !== null) {
              var obj = snapshot.val()
              var discount = {
                'code': code,
                'discount': obj.savings,
                'quantity': obj.quantity,
                'type': obj.type
              }
              switch (obj.type) {
                // Product promotions
                case 'product':
                  // First, check if the requirements have been met.
                  var product = state.shoppingCart.find(shoppingCart => shoppingCart.name === obj.product)
                  // If the requirements have been met, proceed and apply savings based on 'savings'
                  if (product !== undefined && product.quantity >= obj.quantity) {
                    // Dollar amount off if savings is integer, free product if savings is string
                    if (typeof obj.savings === 'number') {
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
                              discount.discount = freeProduct.price
                              discount.savings = obj.savings
                              commit('addToDiscounts', discount)
                            })
                        })
                    }
                  } else {
                    reject('Product Quantity not met.')
                  }
                  break
                // Brand promotions
                case 'brand':
                  discount.brand = obj.brand
                  var brandProductsArr = state.shoppingCart.filter(shoppingCart => shoppingCart.brand === obj.brand)
                  var brandProductsNum = 0
                  for (let key in brandProductsArr) {
                    brandProductsNum += brandProductsArr[key].quantity
                  }
                  if (brandProductsNum >= obj.quantity) {
                    // Dollar amount off if savings is integer, free product if savings is string
                    if (typeof obj.savings === 'number') {
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
                                imageSrc: url,
                                price: freeProduct.price
                              })
                              discount.discount = freeProduct.price
                              discount.savings = obj.savings
                              commit('addToDiscounts', discount)
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
              reject('Promotion not found.')
            }
          })
      }
    })
  },
  updateDiscounts ({commit, state}) {
    if (state.discounts.length > 0) {
      for (let key in state.discounts) {
        if (!checkDiscount(state.discounts[key])) {
          commit('removeDiscount', state.discounts[key])
        }
      }
    }

    function checkDiscount (discount) {
      if (state.shoppingCart !== undefined) {
        switch (discount.type) {
          // Product promotions
          case 'product':
            // First, check if the requirements have been met.
            var product = state.shoppingCart.find(shoppingCart => shoppingCart.name === discount.product)
            // If the requirements have been met, proceed and apply savings based on 'savings'
            if (product !== undefined && product.quantity >= discount.quantity) {
              if (typeof discount.savings === 'string') {
                if (parseInt(product.quantity) === parseInt(discount.quantity)) {
                  return false
                }
              }
              return true
            } else {
              return false
            }
          // Brand promotions
          case 'brand':
            var brandProductsArr = state.shoppingCart.filter(shoppingCart => shoppingCart.brand === discount.brand)
            var brandProductsNum = 0
            for (let key in brandProductsArr) {
              brandProductsNum += brandProductsArr[key].quantity
            }
            if (parseInt(brandProductsNum) >= parseInt(discount.quantity)) {
              // Dollar amount off if savings is integer, free product if savings is string
              console.log(discount.quantity)
              if (typeof discount.savings === 'string') {
                if (parseInt(brandProductsNum) === discount.quantity) {
                  return false
                }
              }
              return true
            } else {
              return false
            }
        }
      } else {
        return false
      }
    }
  }
}

const mutations = {
  addToCart (state, product) {
    const index = state.shoppingCart.findIndex(shoppingCart => shoppingCart.name === product.name)
    console.log(index)
    if (index > -1) {
      state.shoppingCart[index].quantity = parseInt(state.shoppingCart[index].quantity)
      state.shoppingCart[index].quantity += parseInt(product.quantity)
    } else {
      state.shoppingCart.push(product)
    }
  },
  removeFromCart (state, product) {
    state.shoppingCart.splice(state.shoppingCart.indexOf(product), 1)
  },
  clearCart (state) {
    state.shoppingCart = [ ]
    state.appliedPromotionCodes = [ ]
    state.discounts = [ ]
  },
  addToDiscounts (state, discount) {
    state.discounts.push(discount)
  },
  removeDiscount (state, discount) {
    state.discounts.splice(state.discounts.indexOf(discount), 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
