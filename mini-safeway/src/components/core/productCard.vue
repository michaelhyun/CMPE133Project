<template>
  <v-container align-center elevation-1>
    <!-- Product Card (Consists of two clickable cards, the image, and a control card) -->
    <!-- Image Card -->
    <v-layout row align-center>
      <v-flex xs12 class="ml-0 mr-0 mt-0 mb-0 pl-0 pr-0 pt-0 pb-1">
        <v-card
          @click=""
          :to="'/product/' + product.name"
          flat
          hover
          class="ma-0 pa-0"
        >
          <v-card-media
            contain
            :src="product.imageSrc"
            height="200px"
            class="ma-0 pa-0"
          >
          </v-card-media>
          <v-card-title>
            <div class="text-xs-left">
              <h6 class="my-0 pa-0 text-xs-left"> {{product.name}} <br></h6>
              <p class="my-0 pa-0 text-xs-left"> Price per unit: ${{product.price}} </p>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Card Actions (Situated directly below picture) -->
    <v-layout row>
      <v-flex xs12 class="ml-0 mr-0 pl-0 pr-0">
        <v-card flat>
          <v-card-text class="my-0 py-0">
            <v-layout row>
              <v-flex xs4>
                <v-text-field
                  auto-grow
                  v-model="quantity"
                  type="number"
                  class="my-0 py-0 mx-4 px-2 input-group--focused"
                  :rules="[rules.isNumber, rules.max, rules.min]"
                  ></v-text-field>
              </v-flex>
              <v-flex xs8>
                <v-btn :disabled="!validQuantity" class="my-0 py-0 justify-center" color="white--text red darken-2" small>Add To Cart</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    </v-card>
  </v-container>
</template>

<script>
  // TODO: Add <v-if> for Savings
  // (see: https://vuetifyjs.com/components/cards #2 Media With Text)

  // ProductCard handles firebase transactions so that parent components only need
  // to pass the key (productName) as a prop.
  import { firebase } from '../../../firebase'
  export default {
    data: () => ({
      // text-field view-model
      quantity: 1,
      // Rules for text-field input
      validQuantity: true,
      rules: {
        isNumber: (value) => !isNaN(value) || 'Value must be a number',
        min: (value) => (isNaN(value) || value > 0) || 'Value must be greater than 0',
        max: (value) => (isNaN(value) || value < 100) || 'Must be less than 99'
      },
      // Product card data retrieved from firebase
      product: { }
    }),
    // Key for database (productName)
    props: ['productName'],
    methods: {
      // Methods for quantity picker.
      addToCart () {
      }
    },
    watch: {
      // Watch the text-field for changes
      quantity: function (context) {
        if (this.quantity !== 0) {
          if (isNaN(this.quantity)) {
            this.validQuantity = false
          } else {
            this.quantity = this.quantity
            if (this.quantity > 0 && this.quantity < 100) {
              this.validQuantity = true
            } else {
              this.validQuantity = false
            }
          }
        } else {
          this.validQuantity = false
        }
      }
    },
    mounted () {
      // When the component is mounted, populate this.product with data from database.
      var self = this
      firebase.database().ref('products/' + this.productName).once('value')
        .then(function (snapshot) {
          // Save product details so callback can access them
          var productDetails = snapshot.val()
          // Get Download URL
          firebase.storage().ref('products/' + self.productName + '.jpg').getDownloadURL()
            .then(function (url) {
              self.product = {
                name: self.productName,
                price: productDetails.price,
                description: productDetails.description,
                imageSrc: url
              }
            })
        })
    }
  }
</script>