<template>
  <v-content>
      <v-flex xs12 v-if="products.length!=0">
        <h2 primary-title class="layout justify-center"> Order History </h2>
      </v-flex>
      <v-flex xs12 v-if="products.length==0">
        <h2> Must have a Purchase History to use this feature </h2>
      </v-flex>
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
      <!-- Product Cards (repeated for every product in the search) -->
      <v-flex
        xs12 md4 lg3
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
      sortOptions: ['Sort by name', 'Sort by price'],
      sort: 'Sort by name'
    }),
    computed: {
      products () {
        var prod = this.$store.getters.loadedOrders
        if (this.sort === this.sortOptions[1]) {
          prod.sort((a, b) => a.price.localeCompare(b.price))
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