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
        <v-card 
          @click=""
          :to="'/product/' + product.name"
          class="elevation-0 transparent"
        >
          <v-card-media
            :src="product.imageSrc"
            height="200px"
          >
          </v-card-media>
          <v-card-title primary-title class="layout justify-center">
            <div class="text-xl-center">{{ product.name }}, ${{ product.price }}</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="red" class="layout justify-center">Add To Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    
    </v-layout>
  </v-container>

  </v-content>
</template>
<script>
  // Known issues:
  // Refreshing the aisle page resets the store's state, meaning aisleProducts resets to empty so all products disappear.
  export default {
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