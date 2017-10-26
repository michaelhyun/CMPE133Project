import Vue from 'vue'
import Vuex from 'vuex'
import { firebase } from '../../firebase'

Vue.use(Vuex)

// TODO: Modularize store to make it more readable
export const store = new Vuex.Store({
  state: {
    // Used in sidebar when sidebar needs to display shopping options
    shopItems: [
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Explore Aisles',
        model: false,
        expandable: true
      },
      { icon: 'history', text: 'Explore History' },
      { icon: 'local_atm', text: 'Explore Savings' },
      { icon: 'help', text: 'Help' },
      { icon: 'chat_bubble', text: 'Contact Us' }
    ],
    // Promotions
    promotions: [
      {
        src: 'https://images-na.ssl-images-amazon.com/images/I/61Z2neTKPuL._SL1024_.jpg'
      },
      {
        src: 'https://farm1.static.flickr.com/501/19632759782_4c84e1a742_b.jpg'
      },
      {
        src: 'http://truenaturetravels.com/wp-content/uploads/42_explore-1024x720.jpg'
      },
      {
        src: 'https://www.shipt.com/wp-content/uploads/2016/03/IMG_8484-1024x720.jpg'
      }
    ],
    // Aisles
    aisles: [ ],
    // Products found in a specific aisle
    aisleProducts: [ ],
    user: {
      id: 'dvnsljbfn'
    }
  },
  // Synchronous
  mutations: {
    setAisles (state, aisles) {
      state.aisles = aisles
    },
    setAisleProducts (state, products) {
      state.aisleProducts = products
    },
    addAisleProduct (state, product) {
      state.aisleProducts.push(product)
    },
    addToAisles (state, aisle) {
      state.aisles.push(aisle)
    }
  },
  // Asynchrounous
  actions: {
    // This action set's the store's aisles to the data in the database
    // Elements in aisles will have the following definition:
    //
    // {
    //   name: String,
    //   products: Array
    // }
    //
    populateAisles ({ commit, state }) {
      // Read the data at 'aisles' once (asynchronous)
      firebase.database().ref('aisles').once('value')
        .then((data) => {
          const aisles = []
          const obj = data.val()

          // For every key in the returned data, get the associated image url (asynchronous get), then add it to the local variable aisles
          for (let key in obj) {
            firebase.storage().ref('aisles/' + key + '.jpg').getDownloadURL()
              .then(function (url) {
                aisles.push({
                  name: key,
                  products: obj[key],
                  imageSrc: url
                })
                console.log('Fetched ' + key + ' image from storage')
              })
          }

          // Self-executing, recursive timeout function to ensure that all necessary data has been set to the local variable aisles.
          (function waitUntilPopulated () {
            setTimeout(function () {
              if (Object.keys(aisles).length !== Object.keys(obj).length) {
                waitUntilPopulated()
              } else {
                // Local variable aisles has been populated. Set store's aisle to local variable aisle.
                commit('setAisles', aisles)
              }
            }, 200)
          })()
        })
    },
    // This action set's the store's aisleProducts to the data in the database
    // Elements in aisleProducts will have the following definition:
    //
    // {
    //   name: String,
    //   price: String,
    //   description: String,
    //   imageSrc: String
    // }
    //
    populateAisleProducts ({ commit, state }, aisleName) {
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
            commit('setAisleProducts', products)
          }
        }, 200)
      })()
    }
  },
  getters: {
    shopItems (state) {
      return state.shopItems
    },
    promotions (state) {
      return state.promotions
    },
    getAisle: (state, getters) => (name) => {
      return state.aisles.find(aisle => aisle.name === name)
    },
    getAisleProducts (state) {
      return state.aisleProducts
    }
  }
})
