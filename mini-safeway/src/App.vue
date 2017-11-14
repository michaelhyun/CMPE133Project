<template>
  <v-app light>   
    <sidebar v-bind:drawerItemsName="drawerItemsName">
    </sidebar>

    <!-- Top navigation bar -->
    <v-toolbar
      class="primary"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title style="width: 300px">
        <v-toolbar-side-icon @click.stop="toggleSidebar"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">MiniSafeway</router-link>
      </v-toolbar-title>
      <v-text-field
        solo
        v-model="searchQuery"
        label="Search products..."
        @keyup="updateLiveSearchQuery"
        @keyup.enter="searchProducts"
      ></v-text-field>
      <v-btn icon @click="searchProducts">
        <v-icon>search</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon to="/cart">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <v-btn v-if="!userSignedIn" icon to="/register">
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-btn v-if="!userSignedIn" icon @click.stop="loginDialog = true">
        <v-icon>lock_open</v-icon>
      </v-btn>
      <v-btn v-if="userSignedIn" icon to="/profile">
        <v-icon>person</v-icon>
      </v-btn>
      <v-btn v-if="userSignedIn" icon @click="onLogout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <!-- Snackbar Popup to indicate Successful Login -->
      <v-snackbar
        :timeout="3000"
        :top="y===top"
        :right="x===right"
        v-model="userSignedIn"
        v-if="loginSuccessMessage"
      >
      User Login Successful
      <v-btn flat color = "red" @click.native="loginSuccessMessage = false">
        Close
      </v-btn>
    </v-snackbar>
    <!-- Snackbar Popup to indicate User Logged Out -->
    <v-snackbar
        :timeout="3000"
        :top="y===top"
        :right="x===right"
        v-model="logoutMessage"
      >
      User Logged Out
      <v-btn flat color = "red" @click.native="logoutMessage = false">
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
                  @click="loginDialog = false">
                  Cancel
                  </v-btn>
                  <v-btn flat color="green"
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
      loginDialog: false,
      loginSuccessMessage: false,
      logoutMessage: false
    }),
    computed: {
      showSidebar () {
        return this.$store.state.showSidebar
      },
      productNames () {
        return this.$store.state.productNames
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
      onSignin () {
        this.$store.dispatch('loginUser', {
          email: this.email,
          password: this.password
        })
        this.loginDialog = false
        console.log(this.userSignedIn)
        this.loginSuccessMessage = true
        // if (this.userSignedIn) {
        //   this.loginSuccessMessage = true
        // }
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      onLogout () {
        this.$store.dispatch('logout')
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