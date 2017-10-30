import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    products: [
      { title: 'something ' },
      { title: 'another thing ' }
    ],
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
    aisles: [
      { title: 'Baby Care',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Beverages',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Bread & Bakery',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Breakfast & Cereal',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Canned Goods & Soups',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Condiments, Spice & Bake',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Cookies, Snacks & Candy',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Dairy, Eggs & Cheese',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Deli',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Flowers',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Frozen Foods',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Fruits & Vegetables',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Grains, Pasta & Sides',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'International Cuisine',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Meat & Seafood',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Paper, Cleaning & Home',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Personal Care & Health',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Pet Care',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Tobacco',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      },
      { title: 'Wine, Beer & Spirits',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
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
    }
  },
  actions: {
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
    }
  },
  getters: {
    promotions (state) {
      return state.promotions
    },
    aisles (state) {
      return state.aisles
    },
    aisle (state) {
      return (aisleTitle) => {
        return state.aisles.find((aisle) => {
          return aisle.title === aisleTitle
        })
      }
    },
    products (state) {
      return state.products.sort((prodA, prodB) => {
        return prodA.title > prodB.title
      })
    },
    product (state) {
      return (productTitle) => {
        return state.products.find((product) => {
          return product.title === productTitle
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
