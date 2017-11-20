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
      <!--  Member Specialst (Tab 1/2) -->
      <v-tabs-content
        :key="0"
        :id="'tab-' + 0"
      >
        <v-card-text primary-title class="layout justify-center">
            <div class="headline text-xs-center">Member Specials</div>
          </v-card-text>
        <template>
          <v-content>

  <!-- Sort -->
  <v-container>
    <v-flex xs7 offset-xs5 sm4 offset-sm8 lg2 offset-lg10>
      <v-select
        v-bind:items="sortOptions"
        v-model="sort"
        label="Sort by"
        single-line
        bottom
      ></v-select>
    </v-flex>
  </v-container>

  <v-container grid-list-xl>
    <v-layout row wrap align-center>
      <!-- Product Cards (repeated for every product in the aisle) -->
      <v-flex
        xs12 md4 lg3
        v-for="product in savingsItems"
        :key="product.name"
      >
        <productCard :productName="product.name"></productCard>

      </v-flex>
    </v-layout>
  </v-container>

  </v-content>

        </template>

      </v-tabs-content>
      
      <!-- Promo Codes (Tab 2/2) -->
      <v-tabs-content
        :key="1"
        :id="'tab-' + 1"
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
        tabmenus: [
          'Member Specials', 'Promo Codes'
        ],
        sortOptions: ['Sort by name', 'Sort by price'],
        sort: 'Sort by name'
      }
    },
    computed: {
      promoCodes () {
        return this.$store.getters.getPromoCodes
      },
      savingsItems () {
        var products = this.$store.getters.getSavingsItems
        if (this.sort === this.sortOptions[1]) {
          products.sort((a, b) => a.price.localeCompare(b.price))
        } else {
          products.sort((a, b) => a.name.localeCompare(b.name))
        }
        console.log(products)
        return products
      }
    },
    mounted () {
      this.$store.dispatch('getSavingsItems')
      this.$store.commit('setTitle', 'Savings')
    }
  }
</script>