import { firebase } from '../../../firebase'

const state = {
  // /aisles keys
  aisles: [ ],
  // /products keys
  productNames: [ ],
  // /products keys in current aisle
  aisleProducts: [ ]
}

const getters = {
  getAisles: (state) => {
    return state.aisles
  },
  getAisle: (state, getters) => (name) => {
    return state.aisles.find(aisle => aisle.name === name)
  },
  getAisleProducts (state) {
    return state.aisleProducts
  },
  getProductNames: (state) => {
    return state.productNames
  }
}

const actions = {
  // This action sets the store's productNames to all products found in state.aisles.
  // Precondition: state.aisles has been populated.
  // Elements in productNames are Strings.
  populateProductNames ({ commit, state }, aisleName) {
    const productNames = []
    for (let aisle in state.aisles) {
      for (let key in aisle.products) {
        if (!(productNames.hasOwnProperty(aisle.products[key]))) {
          productNames.push(aisle.products[key])
        }
      }
    }
  },
  // This action sets the store's aisleProducts to the data in the database
  // Elements in aisleProducts will have the following definition:
  //
  // {
  //   name: String,
  //   price: String,
  //   description: String,
  //   imageSrc: String
  // }
  //
  populateAisleProducts ({ commit, dispatch, state }, aisleName) {
    const productNames = state.aisles.find(aisle => aisle.name === aisleName).products
    const products = []

    for (let key in productNames) {
      // Since key must be used to access the correct element in productNames and key is used within a callback (asynchronous),
      // it must be passed to a function or else it will be overwritten in the next for-loop iteration.
      (function (key) {
        // Get data that refers to productNames[key]
        firebase.database().ref('products/' + productNames[key]).once('value')
          .then(function (snapshot) {
            // Store details in var productDetails so callback of firebase.storage.ref('').getDownloadURL() can access them.
            var productDetails = snapshot.val()
            // Get products corresponding imageUrl
            firebase.storage().ref('products/' + productNames[key] + '.jpg').getDownloadURL()
              .then(function (url) {
                var product = {
                  name: productNames[key],
                  price: productDetails.price,
                  description: productDetails.description,
                  imageSrc: url
                }
                console.log('Fetched ' + productNames[key] + ' image from storage')
                products.push(product)
              })
          })
      })(key)
    }

    (function waitUntilPopulated () {
      setTimeout(function () {
        if (Object.keys(products).length !== Object.keys(productNames).length) {
          waitUntilPopulated()
        } else {
          dispatch('populateProductNames')
          commit('setAisleProducts', products)
        }
      }, 100)
    })()
  }
}

const mutations = {
  // state.aisles mutations
  setAisles (state, aisles) {
    state.aisles = aisles
  },
  addAisle (state, aisle) {
    state.aisles.push(aisle)
  },
  // state.productNames mutations
  setProductNames (state, productNames) {
    state.productNames = productNames
  },
  // state.aisleProducts mutations
  setAisleProducts (state, products) {
    state.aisleProducts = products
  },
  addAisleProduct (state, product) {
    state.aisleProducts.push(product)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
