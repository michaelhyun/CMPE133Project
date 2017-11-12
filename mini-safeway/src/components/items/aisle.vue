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

  <v-container grid-list-xl>
    <v-layout row wrap align-center>

      <!-- Product Cards (repeated for every product in the aisle) -->
      <v-flex
        xs12 md4
        v-for="(product,i) in products"
        :key="i"
      >
        <v-card>
          <v-card
            @click=""
            :to="'/product/' + product.name"
          >
          <v-card-media
            :src="product.imageSrc"
            height="200px"
          >
          </v-card-media>
           <div>
            <v-card-title class = "justify-center">
              {{product.name}}, ${{product.price}}
            </v-card-title>
          </div> 
        </v-card>
        <v-card>
          <v-layout row wrap justify-center align-center>
            <!-- <v-flex xs6> -->
            <v-flex xs3>
              <v-btn
                @click="subtract(i)"
                class="elevation-0 transparent"
                >
                <v-icon>
                  remove
                </v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs3 ml-5>
              <v-text-field
                v-model="quantities[i]"
                :rules="[rules.isNumber, rules.max]"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs3 mr-4>
              <v-btn
              @click="add(i)"
              class="elevation-0 transparent"
              >
                <v-icon>
                  radd
                </v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs5>
              <v-btn @click="addToCart(i)" class="justify-center" flat color="red darken-2">Add To Cart
              </v-btn>
            </v-flex>
          
          </v-layout>
        </v-card>
        <!-- Recommended stuff at the bottom -->
   </v-card>
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
      // quantity: 1,
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
      ],
      amounts: [ ]
    }),
    props: ['aisleName'],
    methods: {
      addToCart (i) {
        const p = {
          name: this.products[i].name,
          quantity: this.quantities[i],
          imageSrc: this.products[i].imageSrc,
          price: this.products[i].price
        }
        this.$store.commit('addToCart', p)
      },
      add (index) {
        if (this.quantities[index] < 99) {
          this.quantities[index] += 1
        }
        console.log(this.amounts)
      },
      // method for - icon in Quantity
      subtract (index) {
        if (this.quantities[index] > 1) {
          this.quantities[index] -= 1
        }
      }
    },
    computed: {
      aisle () {
        return this.$store.getters.getAisle(this.aisleName)
      },
      products () {
        return this.$store.getters.getAisleProducts
      },
      quantities () {
        if (this.amounts.length === 0 && this.products !== null && this.products !== undefined && this.products.length > 0) {
          for (var i = 0; i < this.products.length; i++) {
            this.amounts.push(1)
          }
        }
        return this.amounts
      }
    },
    watch: {
      aisleName: function (context) {
        this.$store.dispatch('populateAisleProducts', this.aisleName)
      },
      quantities: function (context) {
        for (var i = 0; i < this.quantities.length; i++) {
          if (this.quantities[i] !== '') {
            if (isNaN(this.quantities[i])) {
              console.log('false')
              this.validQuantity = false
            } else {
              this.quantities[i] = parseInt(this.quantities[i])
              if (this.quantities[i] > 0 && this.quantities[i] < 100) {
                this.validQuantity = true
              } else {
                this.validQuantity = false
              }
            }
          }
        }
      },
      // The earliest a prop can be accessed in a Vue component's lifecycle is when it is mounted.
      // So, when the component is mounted, populate the products in the aisle.
      mounted () {
        this.$store.dispatch('populateAisleProducts', this.aisleName)
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

