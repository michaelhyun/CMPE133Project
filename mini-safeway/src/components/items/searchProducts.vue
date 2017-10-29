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

  <!-- Aisles -->

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
    props: ['searchQuery'],
    computed: {
      aisle () {
        return this.$store.getters.getAisle(this.aisleName)
      },
      products () {
        return this.$store.getters.getAisleProducts
      }
    },
    // The earliest a prop can be accessed in a Vue component's lifecycle is when it is mounted.
    // So, when the component is mounted, populate the products in the aisle.
    mounted () {
      this.$store.dispatch('populateSearchQueryItems', this.searchQuery)
    }
  }
</script>