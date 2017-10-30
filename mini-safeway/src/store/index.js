import Vue from 'vue'
import Vuex from 'vuex'
import { firebase } from '../../firebase'

Vue.use(Vuex)

// TODO: Modularize store to make it more readable
// TODO: Refactor sidebar back into app.vue
export const store = new Vuex.Store({
  state: {
    // Used for live search
    liveSearchQuery: '',
    liveSearch: false,
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
    showSidebar: false,
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
    // All aisles
    aisles: [ ],
    // All product names (used for search)
    productNames: [ ],
    // Products found in a specific aisle
    aisleProducts: [ ],
    user: null,
    loading: false,
    error: null,
    // Products found in a search
    searchQueryProducts: [ ]
  },
  // Synchronous
  mutations: {
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
    },
    toggleSidebar (state) {
      state.showSidebar = !state.showSidebar
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    // state.searchQueryProducts mutations
    setSearchQueryProducts (state, searchQueryProducts) {
      state.searchQueryProducts = searchQueryProducts
    },
    setLiveSearch (state, activate) {
      state.liveSearch = activate
    },
    // state.liveSearchQuery mutatations
    setLiveSearchQuery (state, liveSearchQuery) {
      state.liveSearchQuery = liveSearchQuery
    }
  },
  // Asynchrounous
  actions: {
    // This action toggles live search.
    toggleLiveSearch ({ commit, state }) {
      commit('setLiveSearch', !state.liveSearch)
    },
    // This action set's the store's aisles and productNames to the data in Firebase
    // Elements in aisles will have the following definition:
    //
    // {
    //   name: String,
    //   products: Array
    // }
    //
    registerUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              history: [],
              first: payload.first,
              last: payload.last,
              phone: payload.phone,
              type: payload.type,
              address: payload.address,
              city: payload.city,
              state: payload.state,
              zip: payload.zip
              // code to commit to database
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    loginUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
            console.log('Welcome, user ' + newUser.id)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    },

    initializeStoreData ({ commit, state }) {
      return new Promise(function (resolve, reject) {
        // Read the data at 'aisles' once (asynchronous)
        firebase.database().ref('aisles').once('value')
          .then((data) => {
            if (!data) {
              reject(data)
            }
            const aisles = []
            const obj = data.val()

            // For every key in the returned data, get the associated image url (asynchronous get), then add it to the local variable aisles
            for (let key in obj) {
              firebase.storage().ref('aisles/' + key + '.jpg').getDownloadURL()
                .then(function (url) {
                  if (!url) {
                    reject(url)
                  }
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
                  const productNames = []
                  for (let aislesKey in aisles) {
                    for (let productsKey in aisles[aislesKey].products) {
                      if (!(productNames.includes(aisles[aislesKey].products[productsKey]))) {
                        productNames.push(aisles[aislesKey].products[productsKey])
                      }
                    }
                  }
                  commit('setProductNames', productNames)
                  // Local variable aisles has been populated. Set store's aisle to local variable aisle.
                  commit('setAisles', aisles)
                  resolve('Success')
                }
              }, 100)
            })()
          })
      })
    },
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
            store.dispatch('populateProductNames')
            commit('setAisleProducts', products)
          }
        }, 100)
      })()
    },
    // This action set's the store's searchQueryProducts to any matches in the list
    // of product names. It will parse the names in searchQueryProducts first, then
    // retrieve those products from the database.
    populateSearchQueryProducts ({ commit, state }, searchQuery) {
      const productNames = []
      const products = []
      // If the searchQuery string matches any part of a product name in productNames, put that product in the result of the search.
      for (let key in state.productNames) {
        if (state.productNames[key].toLowerCase().match(searchQuery.toLowerCase())) {
          productNames.push(state.productNames[key])
        }
      }

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
            commit('setSearchQueryProducts', products)
          }
        }, 100)
      })()
    }
  },
  // Used for synchronous computations
  getters: {
    promotions (state) {
      return state.promotions
    },
    getAisle: (state, getters) => (name) => {
      return state.aisles.find(aisle => aisle.name === name)
    },
    getAisleProducts (state) {
      return state.aisleProducts
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    getSearchQueryProducts (state) {
      return state.searchQueryProducts
    },
    getLiveSearchQuery (state) {
      return state.liveSearchQuery
    }
  }
})
