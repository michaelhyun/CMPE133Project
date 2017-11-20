const state = {
  showSidebar: false
}

const getters = {
  getShowSidebar (state) {
    return state.showSidebar
  }
}

const actions = {
}

const mutations = {
  toggleSidebar (state) {
    state.showSidebar = !state.showSidebar
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
