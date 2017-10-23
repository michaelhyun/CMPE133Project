<template>
  <v-content>

    <v-container fluid grid-list-xl>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    <v-container align-center>
    <v-layout align-center>
      <v-card-title primary-title class="layout justify-center">
      <img align-center height="500px" v-bind:src="product.image">
      </v-card-title>
    </v-layout>
  </v-container>
                    
                    <v-card>
                       <v-card-title primary-title class="layout justify-center">
                           <div class="headline text-xs-center">
                          <v-subheader class = "display-1 font-weight: 200" v-if="product.name">
                      {{ product.name }}
                      </v-subheader>
                           </div>
                        </v-card-title>
                        
                     </v-card>
                   </v-flex>
                 <v-flex xs12 md4>
                 
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-left">
                        
                      </v-card-text>
                       <v-card>
    
    <v-card-text>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs9>
            <v-card-text> Quantity </v-card-text>
          </v-flex>
          <v-flex xs3>
            <p></p>
            <input v-model.number ="quantity" type="number" placeholder = 0></input>
            </v-flex>
          <v-flex xs9>
            <v-card-text> Subtotal </v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text default = "$0">

                        ${{product.price * quantity }}
                      </v-card-text>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
                      
                       
                      
                       <v-card-actions align-right>
                  <v-btn flat color="red">Add To Cart</v-btn>
                      </v-card-actions>
                      <v-card-text>
                        <v-subheader v-if="product.description">
                      {{ product.description }}
                    </v-subheader>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
   </v-container>
</v-container>
<v-container align-center>
    <v-layout align-center>
      <v-card-title primary-title class="layout justify-center">
      <div class="headline text-xs-center">Recommended Items</div>
      </v-card-title>
    </v-layout>
  </v-container>

  <v-container grid-list-xl>
    <v-layout fill-height fluid row wrap align-center>

      <v-flex xs12 md4>
        <v-card class="elevation-0 transparent">
          <v-card-media src="https://parkseed.com/images/xxl/52503-pk-p1.jpg"
          height="200px">
          </v-card-media>
        </v-card>
      </v-flex>

      <v-flex xs12 md4>
        <v-card class="elevation-0 transparent"
          <v-card-media src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/1200px-Patates.jpg"
          height="200px">
          </v-card-media>
        </v-card>
      </v-flex>

      <v-flex xs12 md4>
        <v-card class="elevation-0 transparent">
          <v-card-media src="http://cdn.phillymag.com/wp-content/uploads/sites/3/2017/04/PRIMAL-SUPPLY_BEEF_3941-FINAL-Credit-Jason-Varney.jpg"
          height="200px" >
          </v-card-media>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
    
  </v-content>
</template>
<script>
  // import {db} from '../../../firebase'
  export default {
    data: () => ({
      product: {
        name: 'Sunchips Garden Salsa Flavored Wholegrain Snacks - 7oz',
        price: 3.99,
        description: 'SUNCHIPS snacks are wavy, ripple-y squares full of whole-grain goodness. Grab a bag of SUNCHIPS multigrain snacks in your favorite flavor, and tell your taste buds to meet you at the corner of delicious and wholesome.',
        image: 'https://www.riteaid.com/shop/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/2/028400147408.jpg'
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

