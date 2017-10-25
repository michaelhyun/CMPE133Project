import Vue from 'vue'
import Vuex from 'vuex'
import { firebase } from '../../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
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
    aisles: [ ],
    user: {
      id: 'dvnsljbfn'
    }
  },
  // Synchronous
  mutations: {
    setAisles (state, aisles) {
      state.aisles = aisles
    },
    addToAisles (state, aisle) {
      state.aisles.push(aisle)
    }
  },
  // Asynchrounous
  actions: {
    populateAisles ({ commit, state }) {
      firebase.database().ref('aisles').once('value')
        .then((data) => {
          const aisles = []
          const obj = data.val()
          var numAislesAdded = 0
          var numAisles = Object.keys(obj).length
          for (let key in obj) {
            var imageUrl
            firebase.storage().ref('aisles/' + key + '.jpg').getDownloadURL()
              .then(function (url) {
                imageUrl = url
                aisles.push({
                  name: key,
                  imageSrc: imageUrl
                })
                numAislesAdded++
              })
          }

          (function waitUntilPopulated () {
            setTimeout(function () {
              if (numAislesAdded !== numAisles) {
                waitUntilPopulated()
              } else {
                commit('setAisles', aisles)
              }
            }, 200)
          })()
        })
    }
  },
  getters: {
    shopItems (state) {
      return state.shopItems
    },
    promotions (state) {
      return state.promotions
    },
    aisles (state) {
      return state.aisles
    }
  }
})
