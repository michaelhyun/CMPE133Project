<template>
  <v-content>
    <v-container fluid>
      <v-layout align-center>
        <v-flex xs5 sm8 lg10>
          <h4> Search returned {{ Object.keys(products).length }} result(s) </h4>
        </v-flex>
        <v-flex xs7 justify-end>
          <v-select
            v-bind:items="sortOptions"
            v-model="sort"
            label="Sort by"
            single-line
            bottom
          ></v-select>
        </v-flex>
      </v-layout>
      <hr>
    </v-container>

    <v-container grid-list-xl fluid>
      <v-layout row wrap align-center>

        <!-- Product Cards (repeated for every product in the search) -->
        <v-flex
          xs12 md4 xl3
          v-for="product in products"
          :key="product.name"
        >
          <productCard :productName="product.name"></productCard>
        </v-flex>
      
      </v-layout>
    </v-container>

  </v-content>
</template>
<script>
  // Known issues:
  // Refreshing the aisle page resets the store's state, meaning aisleProducts resets to empty so all products disappear.
  export default {
    data () {
      return {
        sortOptions: ['Sort by name', 'Sort by price, low to high', 'Sort by price, high to low'],
        sort: 'Sort by name'
      }
    },
    computed: {
      products () {
        var products = this.$store.getters.getSearchQueryProducts
        if (this.sort === this.sortOptions[1]) {
          products.sort((a, b) => a.price - b.price)
        } else if (this.sort === this.sortOptions[2]) {
          products.sort((a, b) => b.price.localeCompare(a.price))
        } else {
          products.sort((a, b) => a.name.localeCompare(b.name))
        }
        return products
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
      if (Object.keys(this.$store.getters.getProductNames).length === 0) {
        this.$store.dispatch('initializeStoreData').then(() => {
          this.$store.dispatch('populateSearchQueryProducts', this.liveSearchQuery)
        })
      }
    },
    // The earliest a prop can be accessed in a Vue component's lifecycle is when it is mounted.
    // So, when the component is mounted, populate the products in the aisle.
    mounted () {
      // this.$store.dispatch('populateSearchQueryProducts', this.searchQuery)
      this.$store.commit('setTitle', 'Search')
      this.$store.dispatch('populateSearchQueryProducts', this.$store.getLiveSearchQuery)
    },
    destroyed () {
      this.$store.dispatch('toggleLiveSearch')
    }
  }
</script>