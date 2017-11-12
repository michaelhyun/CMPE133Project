<template>
  <v-content>
  
  <v-container align-center>
    <v-layout align-center>
      <!-- Header image -->
      <v-flex>
      <v-card-media src="https://www.soilassociation.org/media/10124/creditablepluscole.jpg?anchor=center&mode=crop&width=1903&height=479&rnd=131318177090000000"
      	height="80px" class="layout justify-center">
      </v-card-media>	

      <!-- Aisle Title -->
      <v-card-title primary-title class="layout justify-center">
      <div class="headline text-xl-center">{{ aisle.name }}</div>
      </v-card-title>
      </v-flex>
    
    </v-layout>
  </v-container>

  <v-container grid-list-xl fluid>
    <v-layout row wrap align-center>
      <!-- Product Cards (repeated for every product in the aisle) -->
      <v-flex
        xs12 md3
        v-for="product in products"
        :key="product.name"
      >
        <productCard :productName="product.name"></productCard>
      </v-flex>
    </v-layout>
  </v-container>

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
      // Number of products to add to cart (also exists in product.vue, may need to merge later)
      quantity: 1,
      // Rules for textfield input
      validQuantity: true,
      rules: {
        isNumber: (value) => !isNaN(value) || 'Quantity must be a number',
        max: (value) => (isNaN(value) || value < 100) || 'Maximum value is 99'
      },
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
    props: ['aisleName'],
    computed: {
      aisle () {
        return this.$store.getters.getAisle(this.aisleName)
      },
      products () {
        return this.$store.getters.getAisleProducts
      }
    },
    // Whenever the user navigates to a different aisle, repopulate the products in the aisle.
    watch: {
      aisleName: function (context) {
        this.$store.dispatch('populateAisleProducts', this.aisleName)
      },
      quantity: function (context) {
        if (this.quantity !== '') {
          if (isNaN(this.quantity)) {
            console.log('false')
            this.validQuantity = false
          } else {
            this.quantity = parseInt(this.quantity)
            if (this.quantity > 0 && this.quantity < 100) {
              this.validQuantity = true
            } else {
              this.validQuantity = false
            }
          }
        }
      }
    },
    beforeCreate () {
      if (Object.keys(this.$store.state.productNames).length === 0) {
        this.$store.dispatch('initializeStoreData').then(() => {
          this.$store.dispatch('populateAisleProducts', this.aisleName)
        })
      }
    },
    // The earliest a prop can be accessed in a Vue component's lifecycle is when it is mounted.
    // So, when the component is mounted, populate the products in the aisle.
    mounted () {
      this.$store.dispatch('populateAisleProducts', this.aisleName)
    }
  }
</script>
