<template>
  <v-content>
    <!--  Top bar -->
    <v-container fluid mx-0 my-0 px-0 py-0 elevation-4>
      <v-card-media
        src="https://alittleyum.files.wordpress.com/2015/10/mealbox-grocery-spread.jpg"
        height="200px"
        class="layout justify-center">
      </v-card-media>
    </v-container>
    <v-container fluid>
      <v-layout align-center>
        <v-flex xs5 sm8 lg10>
          <h4>Order History</h4>
          <h6>{{ Object.keys(products).length }} result(s) </h6>
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

    <v-container fluid grid-list-xl>
      <v-layout row wrap align-center>
        <v-flex xs12 v-if="products.length==0">
          <h2> Must have a Purchase History to use this feature </h2>
        </v-flex>

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
    data: () => ({
      sortOptions: ['Sort by name', 'Sort by price, low to high', 'Sort by price, high to low'],
      sort: 'Sort by name'
    }),
    computed: {
      products () {
        var prod = this.$store.getters.loadedOrders
        if (this.sort === this.sortOptions[1]) {
          prod.sort((a, b) => a.price - b.price)
        } else if (this.sort === this.sortOptions[2]) {
          prod.sort((a, b) => b.price.localeCompare(a.price))
        } else {
          prod.sort((a, b) => a.name.localeCompare(b.name))
        }
        return prod
      }
    },
    // The earliest a prop can be accessed in a Vue component's lifecycle is when it is mounted.
    // So, when the component is mounted, populate the products in the aisle.
    mounted () {
      // this.$store.dispatch('populateSearchQueryProducts', this.searchQuery)
      this.$store.commit('setTitle', 'Explore History')
      this.$store.dispatch('retrieveOrderHistory')
    }
  }
</script>