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
          <v-list-group v-else-if="item.children" v-model="item.model" no-action>
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
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
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
      login: false,
      drawer: true,
      items: [
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Explore Aisles',
          model: false,
          children: [
            { text: 'Baby Care' },
            { text: 'Beverages' },
            { text: 'Bread & Bakery' },
            { text: 'Breakfast & Cereal' },
            { text: 'Canned Goods & Soups' },
            { text: 'Condiments, Spice & Bake' },
            { text: 'Cookies, Snacks & Candy' },
            { text: 'Dairy, Eggs & Cheese' },
            { text: 'Deli' },
            { text: 'Flowers' },
            { text: 'Frozen Foods' },
            { text: 'Fruits & Vegetables' },
            { text: 'Grains, Pasta & Sides' },
            { text: 'International Cuisine' },
            { text: 'Meat & Seafood' },
            { text: 'Paper, Cleaning & Home' },
            { text: 'Personal Care & Health' },
            { text: 'Pet Care' },
            { text: 'Tobacco' },
            { text: 'Wine, Beer & Spirits' }
          ]
        },
        { icon: 'history', text: 'Explore History' },
        { icon: 'local_atm', text: 'Explore Savings' },
        { icon: 'help', text: 'Help' },
        { icon: 'chat_bubble', text: 'Contact Us' }
      ]
    }),
    props: {
      source: String
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>