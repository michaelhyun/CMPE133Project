<template>
  <v-content>
    <v-container fluid grid-list-sm pa-5>
      <v-card pt-5>
      <v-layout row wrap pt-5>
        <v-flex d-flex xs12 order-xs5 pt-5>
          <v-layout column>
            <v-card xs12 class="elevation-0 transparent">
              <h4 class="red--text text--darken-2 text-xs-center">{{ product.name }}</h4>
            </v-card>
            <v-layout row>
            <v-flex xs6>
            <v-card class="elevation-0 transparent">
            <v-card-media contain :src="product.imageSrc" height="300" width="300"></v-card-media>
            </v-card>
            <v-divider>
            </v-divider>
            <v-layout row>
              <v-flex>
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title>
                    <div>
                      <h6
                        v-if="product.description"
                        class="ma-0 pa-0 text-xs-left"
                      >
                      Description <br>
                      </h6>
                      <p
                        v-if="product.description"
                        class="ma-0 pa-0 text-xs-left"
                      >
                      {{ product.description }}
                      </p>
                    </div> 
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center" position: relative>
                <v-card-title primary-title class = "text-xs-center">
                  <v-card-text class="text-xs-center" position: relative>
                    <div class = "headline">
                    <v-card-text class="text-xs-center">
                    ${{product.price}}
                    </v-card-text>
                  </div>
                  per unit {{ product.unit }}
                    <!-- <div class="headline"> -->
                  
                  
                  <!-- </div> -->
                  </v-card-text>
                </v-card-title>
                <v-divider>
                  </v-divider>
                <v-layout justify-center>

                <v-flex xs2>
                  <!-- Quantity: -->
                  <br>
                  <br>
                  Quantity:
                  <v-text-field
                    v-model="quantity"
                    type="number"
                    class="input-group--focused"
                    :rules="[rules.isNumber, rules.max]"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              </v-card-text>
              <v-divider>
                  </v-divider>
              <!-- </v-card-text> -->
              <v-layout row>
              <v-flex>
                <!-- <v-flex d-flex> -->

                <v-card class="elevation-0 transparent">
                  <v-card-actions>
                    <v-btn
                      @click="addToCart"
                      flat
                      color="red"
                      class="layout justify-center"
                      :disabled="!validQuantity"
                    >
                      Add To Cart
                    </v-btn>
                  </v-card-actions>
                </v-card>
          <!-- </v-flex> -->
              </v-flex>
            </v-layout>
            </v-card>
          </v-flex>
          </v-layout>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm7>
          <v-layout row wrap>
            <v-flex d-flex>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
  </v-card>
    </v-container>
  </v-content>
</template>
<script>
  import { firebase } from '../../../firebase'
  export default {
    // As of now, the current design for a product is:
    //
    // productName: {
    //   price: String
    //   description: String
    //   imageURL: String
    // }
    //
    // The final version of this should be empty because firebase will handle the values for this model.
    data: () => ({
      // Number of products to add to cart.
      quantity: 1,
      // Product details populated by firebase.
      product: { },
      // Boolean to check if the quantity entered is valid.
      validQuantity: true,
      // Rules for text field input.
      rules: {
        isNumber: (value) => !isNaN(value) || 'Quantity must be a number',
        max: (value) => (isNaN(value) || value < 100) || 'Maximum value is 99'
      }
    }),
    // Prop passed by vue-router that serves as the key to the database
    props: ['productName'],
    // When component is mounted, load product details.
    mounted () {
      var self = this
      firebase.database().ref('products/' + self.productName).once('value')
      .then(function (snapshot) {
        var productDetails = snapshot.val()
        firebase.storage().ref('products/' + self.productName + '.jpg').getDownloadURL()
          .then(function (url) {
            self.product = {
              name: self.productName, // Not necessary (can just use the prop productName), but adding just to be safe
              price: productDetails.price,
              description: productDetails.description,
              imageSrc: url
            }
          })
      })
    },
    methods: {
      addToCart () {
        const payload = {
          name: this.product.name,
          quantity: parseInt(this.quantity),
          imageSrc: this.product.imageSrc,
          price: this.product.price
        }
        this.$store.commit('addToCart', payload)
      }
    },
    watch: {
      // On changes to text-field, check if string is valid.
      quantity: function (context) {
        // If value entered is not a number, set validQuantity to false.
        // Otherwise, check if quantity is in range and set validQuantity accordingly.
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
        } else {
          this.validQuantity = false
        }
      }
    }
  }
  
</script>

