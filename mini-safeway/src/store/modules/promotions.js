const state = {
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
  ]
}

const getters = {
  promotions (state) {
    return state.promotions
  }
}

const actions = {
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
