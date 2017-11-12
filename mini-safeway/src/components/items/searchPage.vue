<template>
  <v-content>

  <v-container grid-list-xl>
    <v-layout row wrap align-center>

      <!-- Product Cards (repeated for every product in the search) -->
      <v-flex
        xs12 md3
        v-for="product in products"
        :key="product.name"
      >
        <productCard :productName="product.name"></productCard>
      </v-flex>
    
    </v-layout>
  </v-container>

  <!-- Aisles? -->

  <!-- Recipes -->
  <v-container align-center>
    <v-layout align-center>
      <v-card-title primary-title class="layout justify-center">
      <div class="headline text-xl-center">Recommended Recipes</div>
      </v-card-title>
    </v-layout>
  </v-container>
  
  <!-- Right-click menu for Recipes -->
  <template>
    <v-layout d-flex justify-center>
      <v-menu offset-y v-model="showMenu" absolute full-width>
        <v-card class="portrait" img="https://d3cizcpymoenau.cloudfront.net/images/34864/SFS_Best_Beef_Stew-4.jpg" height="500px" slot="activator"></v-card>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title" @click="">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-layout>
  </template>

  <!-- Pagination -->
  <template>
    <div class="text-xs-center">
      <v-pagination :length="4" v-model="page"></v-pagination>
    </div>
  </template>
  </v-content>
</template>
<script>
  // Known issues:
  // Refreshing the aisle page resets the store's state, meaning aisleProducts resets to empty so all products disappear.
  export default {
    data: () => ({
      showMenu: false,
      items: [
        { title: 'Go To Recipe Page' },
        { title: 'Potato' },
        { title: 'Beef' },
        { title: 'Carrot' },
        { title: 'Green Bean' },
        { title: 'Onion' },
        { title: 'Garlic' }
      ]
    }),
    computed: {
      products () {
        return this.$store.getters.getSearchQueryProducts
      },
      liveSearchQuery () {
        return this.$store.getters.getLiveSearchQuery
      }
    },
    // Watchers for when a new search is entered.
    watch: {
      // Search while user is typing
      liveSearchQuery () {
        this.$store.dispatch('populateSearchQueryProducts', this.liveSearchQuery)
      }
    },
    // If the page is refreshed, then the store must be re-initialized before populating the store's
    // searchQueryProducts member. However, I don't know how the prop is accessed.
    // (maybe it's because the refresh includes the route prop?).
    beforeCreate () {
      this.$store.dispatch('toggleLiveSearch')
      if (Object.keys(this.$store.state.productNames).length === 0) {
        this.$store.dispatch('initializeStoreData').then(() => {
          this.$store.dispatch('populateSearchQueryProducts', this.liveSearchQuery)
        })
      }
    },
    // The earliest a prop can be accessed in a Vue component's lifecycle is when it is mounted.
    // So, when the component is mounted, populate the products in the aisle.
    mounted () {
      // this.$store.dispatch('populateSearchQueryProducts', this.searchQuery)
      this.$store.dispatch('populateSearchQueryProducts', this.$store.getLiveSearchQuery)
    },
    destroyed () {
      this.$store.dispatch('toggleLiveSearch')
    }
  }
</script>