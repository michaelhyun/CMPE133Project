<template>
  <v-content>

    <v-container grid-list-xl>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    <img height="500px" v-bind:src="product.image">
                    <v-card>
                       <v-card-title primary-title class="layout justify-center">
                           <div class="headline text-xs-center">
                          <v-subheader class = "display-1 font-weight: 200" v-if="product.name">
                      {{ product.name }}
                      </v-subheader>
                           </div>
                        </v-card-title>
                        <v-card-text>
                        <v-subheader v-if="product.description">
                      {{ product.description }}
                    </v-subheader>
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
                      <v-card-text>
                        {{product.price}}
                      </v-card-text>
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
      // Hard code this for now, so the view has a model to display.
      product: {
        name: 'Sunchips Garden Salsa Flavored Wholegrain Snacks - 7oz',
        price: '$4.00',
        description: '\nSUNCHIPS snacks are wavy, ripple-y squares full of whole-grain goodness. Grab a bag of SUNCHIPS multigrain snacks in your favorite flavor, and tell your taste buds to meet you at the corner of delicious and wholesome.',
        image: 'https://www.riteaid.com/shop/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/2/028400147408.jpg'
        // As of now, the current design for a product is:
        //
        // product: {
        //   name: String
        //   price: String
        //   description: String
        // }
        //
        // The final version of this should be empty because firebase will handle the values for this model.
      }
    }),
    props: ['productName']
    // ,
    // firebase: {
    //   product: {
    //     source: db.ref('endpoint-to-product), // ie. db.ref('product/[productName]'), where productName is acquired as a prop
    //     cancelCallback (err) {
    //       console.error(err)
    //     }
    //   }
    // }
  }
</script>

