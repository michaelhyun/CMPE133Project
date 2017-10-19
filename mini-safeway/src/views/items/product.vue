<template>
  <v-content>

    <v-container grid-list-xl>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-media src="https://www.riteaid.com/shop/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/2/028400147408.jpg" height="400px">
        </v-card-media>
                      <v-card-text class="text-xs-center">
                        
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-xs-center">Product Name</div>
                      </v-card-title>
                      <v-card-text>
                        <!--
                          {{ productDescription }}
                        -->
                        Product Description blablalbablablalba blablalba blablalba blablalbablablalba blablalba blablalbablablalba  
                        blablalba blablalbablablalbablablalba blablalbablablalbablablalba blablalba
                        blablalba blablalba blablalba bla  bblablabla bla blabla
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-left">
                        <v-icon x-large class="blue--text text--lighten-2">keyboard_arrow_left</v-icon>
                      </v-card-text>

                      <v-card-text class="text-xs-center">
                        <v-text-field
                      name="Quantity"
                            value="1"
                    class="input-group--focused"
            ></v-text-field>
                      </v-card-text>
                       <v-card-text class="text-xs-right">
                        <v-icon x-large class="blue--text text--lighten-2">keyboard_arrow_right</v-icon>
                      </v-card-text>

              
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline">Quantity</div>
                      </v-card-title>

                       <v-card-actions>
                  <v-btn flat color="red">Add To Cart</v-btn>
                      </v-card-actions>
                      <v-card-text>
                        More blah bla blablabla bla bla  blablabla blabla bla  blabla blabla bla
                        blablabla blabla bla  bla blablabla bla
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
   

        

    </v-container>
</v-container>

    
  </v-content>
</template>
<script>
  // import {db} from '../../../firebase'
  export default {
    data: () => ({
      product: {
        // Hard code this for now.
        //
        // As of now, the current design for a product is:
        // product: {
        //   name: String
        //   price: String
        //   description: String
        // }
        //
        // The final version of this should be empty because firebase will handle the value of this model.
      }
    }),
    props: ['productName']
    // ,
    // firebase: {
    //   product: {
    //     source: db.ref('endpoint-to-product), // ie. db.ref('product/product-name')
    //     cancelCallback (err) {
    //       console.error(err)
    //     }
    //   }
    // }
  }
</script>