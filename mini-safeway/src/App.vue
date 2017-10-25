<template>
  <v-app light>
<!--     <sidebar v-bind:visible="showSidebar">
    </sidebar> -->
    
    <sidebar v-bind:visible="showSidebar"
             v-bind:drawerItemsName="drawerItemsName">
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
        <v-toolbar-side-icon @click.stop="showSidebar = !showSidebar"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">MiniSafeway</router-link>
      </v-toolbar-title>
      <v-text-field
        solo
        prepend-icon="search"
        placeholder="Search"
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
      showSidebar: false,
      drawerItemsName: 'shopItems'
    }),
    // When the Vue application is created, we want it to load some data.
    // Of special note: Don't use an arrow function here. 'this' is
    // intended to refer to the Vue instance being created.
    // See: https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks
    created: function () {

    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>