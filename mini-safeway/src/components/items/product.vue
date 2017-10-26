<template>
  <v-content>
    <v-container>
      <v-layout row wrap justify-center>
        <!-- Product Image, Name, and Description -->
        <v-flex xs12 justify-center>
          <v-card>
            <v-card-media :src="product.imageSrc" height="400px"></v-card-media>
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

        <!-- Quantity Picker -->
        <v-flex xs2>
          <v-card class="elevation-0 transparent">
            <v-card-text class="text-xs-left">
              <v-icon x-large class="blue--text text--lighten-2">keyboard_arrow_left</v-icon>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs8>
          <v-card class="elevation-0 transparent">
            <v-card-text class="text-xs-center">
              <v-text-field
                name="Quantity"
                value="1"
                class="input-group--focused"
              >
              </v-text-field>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs2>
          <v-card class="elevation-0 transparent">
            <v-card-text class="text-xs-right">
              <v-icon x-large class="blue--text text--lighten-2">keyboard_arrow_right</v-icon>
            </v-card-text>
          </v-card>
        </v-flex>

        <!-- Product Price, Additional Information, and Add To Cart Btn -->
        <v-flex xs12>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Quantity</div>
            </v-card-title>
            <v-card-text class="text-xs-center">
              ${{product.price}}
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="red" class="layout justify-center">Add To Cart</v-btn>
            </v-card-actions>
            <v-card-text class="text-xs-center">
              More blah bla blablabla bla bla  blablabla blabla bla  blabla blabla bla
              blablabla blabla bla  bla blablabla bla
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
  import { firebase } from '../../../firebase'
  export default {
    data: () => ({
      // Hard code this for now, so the view has a model to display.
      product: { }
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
    }
  }
</script>

