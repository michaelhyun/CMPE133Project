<template>
  <v-app light>   
    <sidebar></sidebar>

    <!-- Top navigation bar -->
    <v-toolbar
      class="primary"
      dark
      app
      clipped-left
      fixed
      :extended="showSearchBar"
    >
      <!-- Left-aligned Affordances -->
      <v-toolbar-title style="width: 300px">
        <!-- Hamburger Icon for Sidebar -->
        <v-toolbar-side-icon @click.stop="toggleSidebar"></v-toolbar-side-icon>
        <!-- MiniSafeway Text -->
        <router-link to="/" tag="span" style="cursor: pointer">MiniSafeway<v-avatar> 
      <img src="https://cbssacramento.files.wordpress.com/2013/06/safeway-logo.jpg?w=420" alt="Safeway"></v-avatar></router-link>
      </v-toolbar-title>

      <!-- Toolbar Title -->
      <v-spacer></v-spacer>
      <v-toolbar-title>
        {{ toolbarTitle }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Right-aligned Affordances -->
      <!-- Search -->
      <v-btn
        icon
        @click="toggleSearchBar"
      >
        <v-icon>search</v-icon>
      </v-btn>
      <!-- Cart -->
      <v-btn
        icon
        to="/cart"
      >
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <!-- Register -->
      <v-btn
        icon
        v-if="!userSignedIn"
        to="/register"
      >
        <v-icon>person_add</v-icon>
      </v-btn>
      <!-- Sign-in -->
      <v-btn
        icon
        v-if="!userSignedIn"
        @click.stop="setLoginDialog(true)"
      >
        <v-icon>lock_open</v-icon>
      </v-btn>
      <v-btn
        icon
        v-if="userSignedIn"
        to="/profile"
      >
        <v-icon>person</v-icon>
      </v-btn>
      <v-btn v-if="userSignedIn" icon @click="onLogout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <!-- Toolbar Extension for Search Text-Field -->
      <v-text-field
        solo
        slot="extension"
        v-if="showSearchBar"
        v-model="searchQuery"
        label="Search products..."
        @keyup="updateLiveSearchQuery"
        @keyup.enter="searchProducts"
      ></v-text-field>
      <!-- Snackbar Popup to indicate Successful Login -->
      <v-snackbar
        :top="y===top"
        :timeout="3000"
        v-model="userSignedIn"
        v-if="loginSuccessMessage"
      >
        User Login Successful
        <v-btn
          flat
          color="red"
          @click.native="loginSuccessMessage=false"
        >
          Close
        </v-btn>
      </v-snackbar>
      <!-- Snackbar Popup to indicate Unsuccessful Login -->
      <v-snackbar
        :top="y===top"
        :timeout="3000"
        v-model="authenticationFailedMessage"
      >
        Authentication Failed. 
        <br>
        Please Try Again.
        <v-btn flat color = "red" @click.native="authenticationFailedMessage = false">
          Close
          <br>
        </v-btn>
        <br>
        <br>
      </v-snackbar>
      <!-- Snackbar Popup to indicate User Logged Out -->
      <v-snackbar
          :top="y===top"
          :timeout="3000"
          v-model="logoutMessage"
      >
        User Logged Out
        <v-btn
          flat
          color="red"
          @click.native="logoutMessage=false"
        >
          Close
        </v-btn>
      </v-snackbar>

    </v-toolbar>
    <!-- Views Template -->
    <main>
      <router-view></router-view>
    </main>
    <v-dialog v-model="loginDialog" width="400px">
      <v-card>
        <v-card-title
          class="secondary py-4 title"
        >
          Log In
        </v-card-title>
        <v-card-text>
          <v-container grid-list-sm class="pa-4">
            <form @submit.prevent="onSignin">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    name="email"
                    label="E-mail"
                    id="email"
                    v-model="email"
                    type="email"
                    required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn flat color="primary">Forgot Password?
                  </v-btn>
                  <v-spacer>
                  </v-spacer>
                  <v-btn flat color="primary" 
                  @click="setLoginDialog(false)">
                  Cancel
                  </v-btn>
                  <v-btn flat color="primary"
                  type="submit" 
                  :disabled="loading" 
                  :loading="loading">
                    Sign in
                     <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                     </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      searchQuery: '',
      drawerItemsName: 'shopItems',
      email: '',
      password: '',
      loginSuccessMessage: false,
      logoutMessage: false,
      authenticationFailedMessage: false
    }),
    computed: {
      toolbarTitle () {
        return this.$store.getters.getTitle
      },
      showSidebar () {
        return this.$store.getters.getShowSidebar
      },
      showSearchBar () {
        return this.$store.getters.getShowSearchBar
      },
      loginDialog () {
        return this.$store.getters.getLoginDialog
      },
      userSignedIn () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      setLoginDialog (show) {
        this.$store.commit('setLoginDialog', show)
      },
      setTitle (title) {
        this.$store.toolbar.commit('setTitle', title)
      },
      searchProducts () {
        this.$store.commit('setLiveSearchQuery', this.searchQuery)
        this.$store.dispatch('populateSearchQueryProducts', this.searchQuery)
        this.$router.replace('/search/')
      },
      updateLiveSearchQuery () {
        this.$store.commit('setLiveSearchQuery', this.searchQuery)
      },
      toggleSidebar: function (context) {
        this.$store.commit('toggleSidebar')
      },
      toggleSearchBar: function (context) {
        this.$store.dispatch('toggleSearchBar')
      },
      onSignin () {
        this.$store.dispatch('loginUser', {
          email: this.email,
          password: this.password
        })
          .then((obj) => {
            this.$store.commit('setLoginDialog', false)
            this.loginSuccessMessage = true
          }, (obj) => {
            this.authenticationFailedMessage = true
          })
          .catch((err) => {
            console.log(err)
          })
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      onLogout () {
        this.$store.dispatch('logout')
        this.$store.commit('clearCart')
        this.$store.commit('clearOrderHistory')
        this.$router.push('/')
        this.logoutMessage = true
      }
    },
    mounted () {
      this.$store.dispatch('initializeStoreData')
    },
    props: {
      source: String
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>