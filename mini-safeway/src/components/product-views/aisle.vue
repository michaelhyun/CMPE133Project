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
      // Rules for textfield input
      validQuantity: true,
      rules: {
        isNumber: (value) => !isNaN(value) || 'Quantity must be a number',
        max: (value) => (isNaN(value) || value < 100) || 'Maximum value is 99'
      },
      sortOptions: ['Sort by name', 'Sort by price'],
      sort: 'Sort by name'
    }),
    props: ['aisleName'],
    computed: {
      aisle () {
        return this.$store.getters.getAisle(this.aisleName)
      },
      products () {
        var products = this.$store.getters.getAisleProducts
        if (this.sort === this.sortOptions[1]) {
          products.sort((a, b) => a.price.localeCompare(b.price))
        } else {
          products.sort((a, b) => a.name.localeCompare(b.name))
        }
        return products
      }
    },
    // Whenever the user navigates to a different aisle, repopulate the products in the aisle.
    watch: {
      aisleName: function (context) {
        this.$store.commit('setTitle', 'Aisle - ' + this.aisleName)
        this.$store.dispatch('populateAisleProducts', this.aisleName)
      }
    },
    beforeCreate () {
      if (Object.keys(this.$store.getters.getProductNames).length === 0) {
        this.$store.dispatch('initializeStoreData').then(() => {
          this.$store.dispatch('populateAisleProducts', this.aisleName)
        })
      }
    },
    // The earliest a prop can be accessed in a Vue component's lifecycle is when it is mounted.
    // So, when the component is mounted, populate the products in the aisle.
    mounted () {
      this.$store.commit('setTitle', 'Aisle - ' + this.aisleName)
      if (Object.keys(this.$store.getters.getProductNames).length === 0) {
        this.$store.dispatch('initializeStoreData').then(() => {
          this.$store.dispatch('populateAisleProducts', this.aisleName)
        })
      } else {
        this.$store.dispatch('populateAisleProducts', this.aisleName)
      }
    }
  }
</script>
