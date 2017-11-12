<template>
  <v-container align-center elevation-1>
    <!-- Product Card (Consists of a clickable card, the image, and a control card) -->
    <v-card flat>

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
            <v-card-title class="justify-center">
              {{product.name}}, ${{product.price}}
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- Card Actions (Situated directly below picture) -->
      <v-layout row align-center>
        <v-flex xs12 class="ml-0 mr-0 pl-0 pr-0">
          <v-card flat>
            <v-card-text class="ma-0 pt-0 pb-0">
              <v-layout row align-center>
                <v-flex xs2>
                  <v-text-field
                    v-model="quantity"
                    class="ma-0 pt-0 pb-0 input-group--focused"
                    :rules="[rules.isNumber, rules.max]"
                    ></v-text-field>
                </v-flex>
                <v-flex xs10>
                  <v-btn class="ma-0 pt-0 pb-0 justify-center" color="white--text red darken-2">Add To Cart</v-btn>
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
        isNumber: (value) => !isNaN(value) || 'Quantity must be a number',
        max: (value) => (isNaN(value) || value < 100) || 'Maximum value is 99'
      },
      // Product card data retrieved from firebase
      product: { }
    }),
    // Key for database (productName)
    props: ['productName'],
    watch: {
      // Watch the text-field for changes
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