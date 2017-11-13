import { firebase } from '../../../firebase'

const state = {
  liveSearchQuery: '',
  liveSearch: false,
  // /product keys that match search query
  searchQueryProducts: [ ]
}

const getters = {
  getSearchQueryProducts (state) {
    return state.searchQueryProducts
  },
  getLiveSearch (state) {
    return state.liveSearch
  },
  getLiveSearchQuery (state) {
    return state.liveSearchQuery
  },
  getProductNames (rootState) {
    return rootState.products.getters.getProductNames
  }
}

const actions = {
  // This action toggles live search.
  toggleLiveSearch ({ commit, state }) {
    commit('setLiveSearch', !state.liveSearch)
  },
  // This action set's the store's searchQueryProducts to any matches in the list
  // of product names. It will parse the names in searchQueryProducts first, then
  // retrieve those products from the database.
  populateSearchQueryProducts ({ commit, state, getters }, searchQuery) {
    const productNames = []
    const products = []
    // If the searchQuery string matches any part of a product name in productNames, put that product in the result of the search.
    if (searchQuery !== '') {
      for (let key in getters.getProductNames) {
        if (getters.getProductNames[key].toLowerCase().match(searchQuery.toLowerCase())) {
          productNames.push(getters.getProductNames[key])
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
    } else {
      // For an empty string, set searchQueryProducts to empty
      commit('setSearchQueryProducts', products)
    }
  }
}

const mutations = {
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
}

export default {
  state,
  getters,
  actions,
  mutations
}
