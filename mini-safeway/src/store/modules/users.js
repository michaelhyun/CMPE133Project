import { firebase } from '../../../firebase'

const state = {
  user: null,
  loading: false,
  error: null
}

const getters = {
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

const actions = {
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
          const firebaseUser = {
            history: [],
            first: payload.first,
            last: payload.last,
            phone: payload.phone,
            type: payload.type,
            address: payload.address,
            city: payload.city,
            state: payload.state,
            zip: payload.zip
          }
          firebase.database().ref('users/' + user.uid).set(firebaseUser)
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
}

const mutations = {
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
  // vivian
  updateEmail (state, payload) {
    state.user.updateEmail('payload').then(function () { console.log('update successful') }).catch(function () {
      console.log('update failed')
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
