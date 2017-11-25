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

    <!-- Sort -->
    <v-container fluid>
      <v-layout align-center>
        <v-flex xs5 sm8 lg10>
          <h4> {{aisle.name}} </h4>
          <h6> {{ Object.keys(products).length }} result(s) </h6>
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
      sortOptions: ['Sort by name', 'Sort by price, low to high', 'Sort by price, high to low'],
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
          products.sort((a, b) => a.price - b.price)
        } else if (this.sort === this.sortOptions[2]) {
          products.sort((a, b) => b.price.localeCompare(a.price))
        } else {
          products.sort((a, b) => a.name.localeCompare(b.name))
        }
        return products
      }
    },
    // Whenever the user navigates to a different aisle, repopulate the products in the aisle.
    watch: {
      aisleName: function (context) {
        this.$store.commit('setTitle', 'Aisle')
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
