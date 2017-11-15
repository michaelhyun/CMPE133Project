<!-- Shortcut for transparent cards here:
class="elevation-0 transparent" -->
<template>
  <v-content>
    <v-container fluid grid-list-sm pa-5>
      <v-layout justify-center>
      <v-flex xs12>
      <v-card pt-5>
      <v-layout row wrap pt-5 pb-5>
        <v-flex d-flex>
          <v-layout column pa-3>
            <v-flex pb-3>
              <!-- Header -->
              <v-flex pb-3>
                <div>
                <v-breadcrumbs divider =">>">
                  <!-- Need to find a way to navigate to router w/o refreshing the page (prefer not to use href) -->
                  <v-breadcrumbs-item
                  :href="'/aisles/' + product.aisle"
                  >
                    {{ product.aisle }}
                  </v-breadcrumbs-item>
                  <v-breadcrumbs-item
                  href="/aisles/"
                  :disabled="false"
                  >
                    {{ product.name }}
                  </v-breadcrumbs-item>
                </v-breadcrumbs>
              </div>
              </v-flex>
              <!-- Star & Item Title -->
              <!-- Star -->
              <v-layout justify-center>
                <!-- Title -->
              <v-flex>
              <v-card class="elevation-0 transparent">
                <!-- <v-flex d-flex> -->
              <!-- </v-flex> -->
                <h4 class="red--text text--darken-2 text-xs-center">
                <v-btn 
                :ripple="false"
                flat icon
                @click = "star"
                v-if="!starred">
                <v-icon

                @click="star"
                  color="grey lighten-1"
                  v-if="!starred"
                >star_border</v-icon></v-btn>
                <v-btn 
                :ripple="false"
                flat icon
                @click = "star"
                v-else>
                  <v-icon
                  large
                    color="yellow darken-2"
                    @click="star"
                  >star</v-icon>
                </v-btn>
              {{ product.name }}</h4>
              </v-card>
            </v-flex>
          </v-layout>
            </v-flex>
            <!-- Stuff Under Header (Includes all rows) -->
            <!-- Consider adding "align-center" or "justify-space-around" to layout tag below -->
            <v-flex xs12 pa-2>
            <v-layout align-center pb-2>
              <!-- First Row Under Header -->
              <!-- Left Arrow -->
              <v-flex d-flex xs1 md6>
                <div class="text-xs-center">
            <v-btn large flat icon :ripple="false" :right="true">
              <v-icon color="red">
                keyboard_arrow_left
              </v-icon>
            </v-btn>
          </div>
          </v-flex>
          <!-- Left Side of First Row -->
            <v-flex d-flex xs7 md7>
            <v-card>
            <v-card-media contain :src="product.imageSrc" height="300" width="300"></v-card-media>
            <v-divider>
            </v-divider>
            <v-layout row>
              <v-flex>
                  <v-card-title primary-title>
                    <div>
                      <h6
                        v-if="product.description"
                      >
                      <p>
                      Description
                    </p>
                      </h6>
                      <p
                        v-if="product.description"
                      >
                      {{ product.description }}
                      </p>
                    </div> 
                  </v-card-title>
              </v-flex>
            </v-layout>
          </v-card>
          </v-flex>
          <!-- Right Side of First Row -->
          <v-flex xs4 md5>
            <v-card>
              <v-card-text>
                <!-- Product Price -->
                <v-card-title primary-title class = "text-xs-center">
                  <v-card-text class="text-xs-center" position: relative>
                    <div class = "headline">
                    <v-card-text class="text-xs-center">
                    ${{product.price}}
                    </v-card-text>
                  </div>
                  per unit
                  <br><br>
                  <!-- {{ product.unit }} -->
                  </v-card-text>
                </v-card-title>
                <v-divider>
                  </v-divider>
                <!-- Quantity -->
                <v-flex xs12>
                  <div class="text-xs-center">
                  <br>
                  <br>
                  <subheading>
                  Quantity:
                </subheading>
                </div>
                <v-layout justify-center>
                <v-flex xs2>
                  <v-text-field
                    v-model="quantity"
                    type="number"
                    class="input-group--focused"
                    :rules="[rules.isNumber, rules.max]"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
                </v-flex>
              </v-card-text>
              <!-- Add To Cart Button -->
              <v-divider>
              </v-divider>
              <v-layout>
              <v-flex>
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
              </v-flex>
            </v-layout>
            </v-card>
          </v-flex>
          <!-- Right Arrow -->
          <v-flex d-flex xs1 md6>
            <div class="text-xs-center">
          <v-btn large flat icon :ripple="false">
              <v-icon color="red">
                keyboard_arrow_right
              </v-icon>
            </v-btn>
          </div>
          </v-flex>
          </v-layout>
          <!-- End of First Row -->
          <!-- Second Row Under Header -->
          <!-- Instructions -->
          <v-layout column>
            <v-layout justify-center>
          <v-flex d-flex xs6 md8>
          <v-card
          v-if="product.details"
          >
            <v-card-title primary-title>
                    <div>
                      <p>
                      <h6>
                      Instructions <br>
                      </h6>
                    </p>
                      <subheading>
                      {{ product.details }}
                      </subheading>
                    </div> 
                  </v-card-title>
            </v-card>
          </v-flex>
          <!-- Nutrition Facts -->
          <v-flex d-flex xs6 md3>
              <v-card>
                <v-card-title primary-title>
                    <div>
                      <p>
                      <h6>
                      Nutrition Facts <br>
                      </h6>
                    </p>
                      <p>
                      {{ product.details }}
                      </p>
                    </div> 
                  </v-card-title>
              </v-card>
        </v-flex>
        </v-layout>
          <v-layout justify-center>
            <v-flex xs12 md11>
              <v-card>
                <v-card-title primary-title>
                    <div>
                      <p>
                      <h6>
                      Reviews <br>
                      </h6>
                    </p>
                      <p>
                      {{ product.details }}
                      </p>
                    </div> 
                  </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-layout>
        </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
  </v-card>
</v-flex>
</v-layout>
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
      // Favorited Item
      starred: false,
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
              imageSrc: url,
              aisle: productDetails.aisles[0],
              details: productDetails.details
            }
          })
      })
    },
    methods: {
      star () {
        this.starred = !this.starred
      },

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

