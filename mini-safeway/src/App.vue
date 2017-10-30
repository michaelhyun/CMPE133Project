<template>
  <v-app light>
    <!-- Aisles Side Bar -->
    <v-navigation-drawer
      persistent
      clipped
      app
      v-model="drawer"
      enable-resize-watcher
    >
      <v-list dense>
        <template v-for="(item, i) in items" :to="item.link">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.expandable" v-model="item.model" no-action>
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(aisle, i) in aisles"
              :key="i"
              @click=""
              :to="'/aisles/' + aisle.title"
            >
              <v-list-tile-action v-if="aisle.icon">
                <v-icon>{{ aisle.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ aisle.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- Top navigation bar -->
    <v-toolbar
      class="primary"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title style="width: 300px">
        <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
      <v-btn v-if="!userSignedIn" icon to="/register">
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-btn v-if="!userSignedIn" icon @click.stop="login = !login">
        <v-icon>lock_open</v-icon>
      </v-btn>
      <v-btn v-if="userSignedIn" icon to="/profile">
        <v-icon>person</v-icon>
      </v-btn>
      <v-btn v-if="userSignedIn" icon @click="onLogout">
        <v-icon>exit_to_app</v-icon>
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
                  <v-btn flat color="primary">Forgot Password?</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="login = false">Cancel</v-btn>
                  <v-btn type="submit" :disabled="loading" :loading="loading">
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
      login: false,
      drawer: true,
      email: '',
      password: '',
      items: [
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Explore Aisles',
          model: false,
          expandable: true
        },
        { icon: 'history', text: 'Explore History' },
        { icon: 'local_atm', text: 'Explore Savings' },
        { icon: 'help', text: 'Help' },
        { icon: 'chat_bubble', text: 'Contact Us' }
      ]
    }),
    props: {
      source: String
    },
    computed: {
      aisles () {
        return this.$store.getters.aisles
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
      onSignin () {
        this.$store.dispatch('loginUser', {
          email: this.email,
          password: this.password
        })
        this.login = false
        console.log(this.userSignedIn)
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>