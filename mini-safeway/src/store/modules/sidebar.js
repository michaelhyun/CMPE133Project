const state = {
  sideBarListObjects: [
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': 'keyboard_arrow_down',
      text: 'Explore Aisles',
      model: false,
      expandable: true
    },
    { icon: 'history', text: 'Explore History', link: '/exploreHistory' },
    { icon: 'local_atm', text: 'Explore Savings', link: '/savings' },
    { icon: 'help', text: 'Help', link: '/help' },
    { icon: 'chat_bubble', text: 'Contact Us', link: '/contactUs' }
  ],
  showSidebar: false
}

const getters = {
  getShowSidebar (state) {
    return state.showSidebar
  },
  getSideBarListObjects (state) {
    return state.sideBarListObjects
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
