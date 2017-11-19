<template>
  <v-content>
  <v-container fluid>

  <v-tabs fluid dark fixed centered>
    <!--  Top bar -->
     <v-card-media src="https://alittleyum.files.wordpress.com/2015/10/mealbox-grocery-spread.jpg"
        height="200px" class="layout justify-center">
      </v-card-media>
      <v-tabs-bar class="red darken-1">
      <v-tabs-slider color="red accent-1"></v-tabs-slider>
      <v-tabs-item
        v-for="(tabmenu, i) in tabmenus"
        :key="i"
        :href="'#tab-' + i"
      >
        {{ tabmenu }}
      </v-tabs-item>
    </v-tabs-bar>

    <!--  Content of each tab -->
    <v-tabs-items>
      <!--  Member Specialst (Tab 1/3) -->
      <v-tabs-content
        :key="0"
        :id="'tab-' + 0"
      >
        <v-card-text primary-title class="layout justify-center">
            <div class="headline text-xs-center">Member Specials</div>
          </v-card-text>
        <template>
          <v-container>                
            <v-layout>
              <v-flex xs6 offset-xs3>
                <v-carousel hide-controls>
                 <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i" fill-height></v-carousel-item></v-carousel>
              </v-flex>
            </v-layout>
          </v-container>

        </template>

      </v-tabs-content>

      <!-- Popular Deals (Tab 2/3) -->
      <v-tabs-content
        :key="1"
        :id="'tab-' + 1"
      >
        <v-card-text primary-title class="layout justify-center">
          <div class="headline text-xs-center">Popular Deals</div>
        </v-card-text>
        <v-container grid-list-xl>
          <v-layout row wrap align-center>

            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-media src="https://parkseed.com/images/xxl/52503-pk-p1.jpg"
                height="300px">
                </v-card-media>
              </v-card>
            </v-flex>

            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent"
                <v-card-media src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/1200px-Patates.jpg"
                height="300px">
                </v-card-media>
              </v-card>
            </v-flex>

            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-media src="http://cdn.phillymag.com/wp-content/uploads/sites/3/2017/04/PRIMAL-SUPPLY_BEEF_3941-FINAL-Credit-Jason-Varney.jpg"
                height="300px">
                </v-card-media>
              </v-card>
            </v-flex>

          </v-layout>
        </v-container>
        <template>
          <v-layout d-flex justify-center>
            <v-menu offset-y v-model="showMenu" absolute full-width>
              <v-card class="portrait" img="https://d3cizcpymoenau.cloudfront.net/images/34864/SFS_Best_Beef_Stew-4.jpg" height="500px" slot="activator"></v-card>
              <v-list>
                <v-list-tile v-for="menu in menus" :key="menu.title" @click="">
                  <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-layout>
        </template>
      </v-tabs-content>
      
      <!-- Promo Codes (Tab 3/3) -->
      <v-tabs-content
        :key="2"
        :id="'tab-' + 2"
      >
        <v-card-text primary-title class="layout justify-center">
          <div class="headline text-xs-center">Promo Codes</div>
        </v-card-text>
        <template>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 sm3 offset-sm1 v-for="item in promoCodes" :key="item">
                <promoCard :promoCodeName="item"></promoCard>
              </v-flex>        
            </v-layout>
          </v-container>
        </template>
      </v-tabs-content>

    </v-tabs-items>
  </v-tabs>
</v-container>
</v-content>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'http://ct.safeway.com/circular/302/pages/B_3090278_6cb77e63de12.jpg'
          },
          {
            src: 'http://ct.safeway.com/circular/302/pages/B_3090279_252c11fdf58e.jpg'
          },
          {
            src: 'http://ct.safeway.com/circular/302/pages/B_3090280_7c5b1b95b2bc.jpg'
          },
          {
            src: 'http://ct.safeway.com/circular/302/pages/B_3090281_cef274d4125b.jpg'
          }
        ],
        showMenu: false,
        menus: [
          { title: 'Go To Recipe Page' },
          { title: 'Potato' },
          { title: 'Beef' },
          { title: 'Carrot' },
          { title: 'Green Bean' },
          { title: 'Onion' },
          { title: 'Garlic' }
        ],
        tabmenus: [
          'Member Specials', 'Popular Deals', 'Promo Codes'
        ]
      }
    },
    computed: {
      promoCodes () {
        return this.$store.getters.getPromoCodes
      }
    },
    mounted () {
      this.$store.commit('setTitle', 'Savings')
    }
  }
</script>