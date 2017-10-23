<template>
  <v-content>

    <v-container grid-list-xl>
      <v-layout row wrap align-center>

        <v-flex xs12 md4>
          <v-card class="elevation-0 transparent">
    
            <v-card-media src="https://www.riteaid.com/shop/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/2/028400147408.jpg"
            height="500px">
            </v-card-media>
      
            <v-card-text class="text-xs-center">
            </v-card-text>

            <v-card-title primary-title class="layout justify-center">
            <div class="headline text-xs-center">Product Name</div>
            </v-card-title>
          
            <v-card-text>
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
              <v-text-field name="Quantity" value="1" class="input-group--focused">
              </v-text-field>
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
  <v-container align-center>
    <v-layout align-center>
      <v-card-title primary-title class="layout justify-center">
      <div class="headline text-xs-center">Recommended Items</div>
      </v-card-title>
    </v-layout>
  </v-container>

  <v-container grid-list-xl>
    <v-layout row wrap align-center>

      <v-flex xs12 md4>
        <v-card class="elevation-0 transparent">
          <v-card-media src="https://parkseed.com/images/xxl/52503-pk-p1.jpg"
          height="300px">
          </v-card-media>
        </v-card>
      </v-flex>

      <v-flex xs12 md4>
        <v-card class="elevation-0 transparent"
          <v-card-media src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/1200px-Patates.jpg"
          height="300px">
          </v-card-media>
        </v-card>
      </v-flex>

      <v-flex xs12 md4>
        <v-card class="elevation-0 transparent">
          <v-card-media src="http://cdn.phillymag.com/wp-content/uploads/sites/3/2017/04/PRIMAL-SUPPLY_BEEF_3941-FINAL-Credit-Jason-Varney.jpg"
          height="300px">
          </v-card-media>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>

  <v-container align-center>
    <v-layout align-center>
      <v-card-title primary-title class="layout justify-center">
      <div class="headline text-xl-center">Recommended Recipes</div>
      </v-card-title>

    </v-layout>
  </v-container>
  
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

<template>
  <div class="text-xs-center">
    <v-pagination :length="4" v-model="page"></v-pagination>
  </div>
</template> 

    </v-container>
   </v-container>

    
  </v-content>
</template>
<script>
  export default {
    // import {db} from '../../../firebase'
    data: () => ({
      showMenu: false,
      items: [
        { title: 'Go To Recipe Page' },
        { title: 'Potato' },
        { title: 'Beef' },
        { title: 'Carrot' },
        { title: 'Green Bean' },
        { title: 'Onion' },
        { title: 'Garlic' }
      ]
    })
  }
  // // import {db} from '../../../firebase'
  // export default {
  //   data: () => ({
  //     // Hard code this for now, so the view has a model to display.
  //     aisle: {
  //       products: [
  //                  'aisle1',
  //                  'aisle2',
  //                  'aisle3',
  //                  ...etc,
  //                  ]
  //     }
  //     // As of now, the current design for a product is:
  //     //
  //     // aisle: {
  //     //   products: Array
  //     // }
  //     //
  //     // where Array is an array of Strings that contain product names.
  //     //
  //     // The final version of this should be empty because firebase will handle the values for this model.
  //     }
  //   }),
  //   props: ['aisleName']
  //   // ,
  //   // firebase: {
  //   //   aisle: {
  //   //     source: db.ref('endpoint-to-aisle), // ie. db.ref('aisle/[aisleName]'), where aisleName is acquired as a prop
  //   //     cancelCallback (err) {
  //   //       console.error(err)
  //   //     }
  //   //   }
  //   // }
  // }
  
  // PS: To comment or uncomment multiple lines of code using Sublime, highlight all lines you want to comment, then hit ctrl + '/'.
</script>
