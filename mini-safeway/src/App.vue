<template>
  <v-app light>   
    <sidebar v-bind:drawerItemsName="drawerItemsName">
    </sidebar>
    <!-- TODO: Refactor sidebar back here -->
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
        v-model="searchResults"
        label="Search products..."
        prepend-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon to="/productpage">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <v-btn icon to="/register">
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-btn icon @click.stop="login = !login">
        <v-icon>lock_open</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- Views Template -->
    <main>
      <router-view></router-view>
    </main>
    <v-dialog v-model="login" width="400px">
      <v-card>
        <v-card-title
          class="secondary py-4 title"
        >
          Log In
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field placeholder="Username"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field placeholder="Password"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">Forgot Password?</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="login = false">Cancel</v-btn>
          <v-btn flat @click="login = false">Log In</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawerItemsName: 'shopItems'
    }),
    computed: {
      showSidebar () {
        return this.$store.state.showSidebar
      },
      productNames () {
        return this.$store.state.productNames
      }
    },
    methods: {
      toggleSidebar: function (context) {
        this.$store.commit('toggleSidebar')
      }
    },
    mounted () {
      this.$store.dispatch('populateProductNames')
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>