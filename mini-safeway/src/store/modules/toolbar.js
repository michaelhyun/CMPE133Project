const state = {
  title: ''
}

const getters = {
  getTitle (state) {
    return state.title
  }
}

const actions = {
}

const mutations = {
  setTitle (state, title) {
    state.title = title
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
