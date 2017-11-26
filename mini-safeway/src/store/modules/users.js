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
  loginUser ({commit, dispatch}, payload) {
    return new Promise(function (resolve, reject) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            var existingUser
            firebase.database().ref('users/' + user.uid).on('value', function (snapshot) {
              var userInfo = snapshot.val()
              existingUser = {
                id: user.uid,
                first: userInfo.first,
                last: userInfo.last,
                phone: userInfo.phone,
                type: userInfo.type,
                address: userInfo.address,
                city: userInfo.city,
                state: userInfo.state,
                zip: userInfo.zip,
                email: payload.email
              }
              console.log(existingUser)
              commit('setUser', existingUser)
              dispatch('retrieveOrderHistory')
              resolve(user)
            })
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
            reject(error)
          }
        )
    })
  },
  updateUser ({commit}, payload) {
    var user = firebase.auth().currentUser
    user.updateProfile({
      id: user.uid,
      first: payload.first,
      last: payload.last,
      phone: payload.phone,
      type: payload.type,
      address: payload.address,
      city: payload.city,
      state: payload.state,
      zip: payload.zip,
      email: payload.email
    })
    // this works
    user.updateEmail(payload.email)
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const updatedUser = {
          id: user.uid,
          first: payload.first,
          last: payload.last,
          phone: payload.phone,
          type: payload.type,
          address: payload.address,
          city: payload.city,
          state: payload.state,
          zip: payload.zip,
          email: payload.email
        }
        firebase.database().ref('users/' + user.uid).update(updatedUser)
        commit('setUser', updatedUser)
      }
    })
  },
  updateName ({commit}, payload) {
    // var user = firebase.auth().currentUser
    // user.updateProfile({
    //   first: payload.first,
    //   last: payload.last
    // })
    // var user = firebase.auth().currentUser
    // if (user) {
    //   const updatedUser = {
        // id: user.uid,
        // first: payload.first,
        // last: payload.last,
        // phone: user.phone,
        // type: user.type,
        // address: user.address,
        // city: user.city,
        // state: user.state,
        // zip: user.zip,
        // email: user.email
    //   }
    //   firebase.database().ref('users/' + user.uid).update(updatedUser)
    //   commit('setUser', updatedUser)
    // }
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        commit('setLoading', false)
        const updatedUser = {
          id: user.uid,
          first: payload.first,
          last: payload.last,
          phone: user.phone,
          type: user.type,
          address: user.address,
          city: user.city,
          state: user.state,
          zip: user.zip,
          email: user.email
        }
        firebase.database().ref('users/' + user.uid).update(updatedUser)
        commit('setUser', updatedUser)
      }
    })
  },
  updateEmail ({commit}, payload) {
    var user = firebase.auth().currentUser
    user.updateEmail(payload.email)
  },
  // work on this last
  deleteUser ({commit}) {
    // commit('setLoading', true)
    commit('clearError')
    var user = firebase.auth().currentUser
    user.delete().then(function () {
      // commit('setLoading', false)
      console.log('User' + user.uid + 'deleted')
    }).catch(
          error => {
            // commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', {
      id: payload.uid
    })
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
