const state = {
  title: '',
  loginDialog: false
}

const getters = {
  getTitle (state) {
    return state.title
  },
  getLoginDialog (state) {
    return state.loginDialog
  }
}

const actions = {
}

const mutations = {
  setTitle (state, title) {
    state.title = title
  },
  setLoginDialog (state, show) {
    state.loginDialog = show
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
