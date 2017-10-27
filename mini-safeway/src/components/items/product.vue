<template>
  <v-content>
    <v-container>
      <v-layout row wrap justify-space-around>
        <!-- Product Image, Name, and Description -->
        <v-flex xs12 sm6 justify-center>
          <v-card>
            <v-card-media :src="product.imageSrc" height = "400"></v-card-media>
          </v-card>
          <v-card>
            <v-card-title primary-title class="layout justify-center">
              <div class="headline text-xs-center">
                <v-subheader class = "display-1 font-weight: 200" v-if="product.name">
                {{ product.name }}
                </v-subheader>
              </div>
            </v-card-title>
            <v-card-text>
              <v-subheader
                v-if="product.description"
                class="justify-center"
              >
              {{ product.description }}
              </v-subheader>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- QUANTITY, PRICE, ADD TO CART -->
      <v-card>
        <v-flex xs12 sm6 justify-center>
         <!-- TITLE -->
          <v-card-title primary-title class="layout justify-center">
              <div class="headline">Quantity</div>
            </v-card-title> 
            <!-- LEFT ARROW -->
          <v-flex xs2>
           <v-btn @click="subtract">
             <v-icon x-large class="blue--text text--lighten-2" @click="add">keyboard_arrow_left
             </v-icon>
           </v-btn>
         </v-flex>
          <!-- QUANTITY -->
         <v-flex xs12>  
           <v-card-text class="text-xs-center" position: relative>
             <v-text-field
                  autogrow = "true"
                  name="Quantity"
                  value= this.quantity
                  class="input-group--focused"
                >
             </v-text-field>
           </v-card-text>
         </v-flex>
          <!-- RIGHT ARROW -->
          <v-flex xs2>
           <v-btn @click="add">
              <v-icon x-large class="blue--text text--lighten-2">keyboard_arrow_right</v-icon>
           </v-btn>
          </v-flex>

        </v-flex>
        <!-- PRICE (doesn't show up for some reason), CART, DESCRIP -->
        <v-flex xs12>
          <v-card class="elevation-0 transparent">
            <v-card-text class="text-xs-center">
              ${{product.price}}
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="red" class="layout justify-center">Add To Cart</v-btn>
            </v-card-actions>
            <v-card-text class="text-xs-center">
              More
              blablabla blabla bla  bla blablabla bla
            </v-card-text>
          </v-card>
        </v-flex>
      </v-card>
   

      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
  import { firebase } from '../../../firebase'
  export default {
    data: () => ({
      // Hard code this for now, so the view has a model to display.
      // TRYING TO ADD QUANTITY VARIABLE - VIVIAN
      quantity: 0,
      product: {}
        // As of now, the current design for a product is:
        //
        // product: {
        //   name: String
        //   price: String
        //   description: String
        // }
        //
        // The final version of this should be empty because firebase will handle the values for this model.
    }),
    props: ['productName'],
  
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
    // TRYING TO ADD FUNCTIONS TO THE LEFT & RIGHT ARROW BUTTONS
    add () {
      this.quantity += 1
    },
    subtract () {
      this.quantity -= 1
    }
  }
  
</script>

