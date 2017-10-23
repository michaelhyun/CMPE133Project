<template>
  <v-content>
  
  <v-container align-center>
    <v-layout align-center>
     
    <v-flex>
    <v-card-media src="https://www.soilassociation.org/media/10124/creditablepluscole.jpg?anchor=center&mode=crop&width=1903&height=479&rnd=131318177090000000"
    	height="80px" class="layout justify-center">
    </v-card-media>	
    <v-card-title primary-title class="layout justify-center">
    <div class="headline text-xl-center">{{ aisle.title }}</div>
    </v-card-title>
    </v-flex>
    
    </v-layout>
  </v-container>

  <v-container grid-list-xl	>
    <v-layout row wrap align-center>

      <v-flex xs12 md3>
        <v-card class="elevation-0 transparent">
          <v-card-media src="https://images-na.ssl-images-amazon.com/images/I/51YfRk88c9L._AA360_QL70_.jpg"
          height="200px">
          </v-card-media>
          <v-card-title primary-title class="layout justify-center">
          <div class="text-xl-center">Blackberries, 6oz, $1.49 ($2.99/lb)</div>
          </v-card-title>
          <v-card-actions>
          <v-btn flat color="red" class="layout justify-center">Add To Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 md3>
        <v-card class="elevation-0 transparent"
          <v-card-media src="https://images-na.ssl-images-amazon.com/images/I/51FbHJvaWVL._AA360_QL70_.jpg"
          height="200px">
          </v-card-media>
          <v-card-title primary-title class="layout justify-center">
          <div class="text-xl-center">Tomatoes, 10oz, $1.49 ($1.99/lb)</div>
          </v-card-title>
          <v-card-actions>
          <v-btn flat color="red" class="layout justify-center">Add To Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 md3>
        <v-card class="elevation-0 transparent">
          <v-card-media src="https://images-na.ssl-images-amazon.com/images/I/51NSeJbpKjL._AA360_QL70_.jpg"
          height="200px">
          </v-card-media>
          <v-card-title primary-title class="layout justify-center">
          <div class="text-xl-center">Strawberries, 6oz, $.99 ($1.99/lb)</div>
          </v-card-title>
          <v-card-actions>
          <v-btn flat color="red" class="layout justify-center">Add To Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 md3>
        <v-card class="elevation-0 transparent">
          <v-card-media src="https://images-na.ssl-images-amazon.com/images/I/41S1VsCBf7L._AA360_QL70_.jpg"
          height="200px">
          </v-card-media>
          <v-card-title primary-title class="layout justify-center">
          <div class="text-xl-center">Bananas, 12oz, $.75 ($0.99/lb)</div>
          </v-card-title>
          <v-card-actions>
          <v-btn flat color="red" class="layout justify-center">Add To Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 md3>
        <v-card class="elevation-0 transparent"
          <v-card-media src="https://images-na.ssl-images-amazon.com/images/I/51Nu5fzUVxL._AA360_QL70_.jpg"
          height="200px">
          </v-card-media>
          <v-card-title primary-title class="layout justify-center">
          <div class="text-xl-center">Watermelons, 1lb, $0.99 ($0.99/lb)</div>
          </v-card-title>	
          <v-card-actions>
          <v-btn flat color="red" class="layout justify-center">Add To Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 md3>
        <v-card class="elevation-0 transparent">
          <v-card-media src="https://images-na.ssl-images-amazon.com/images/I/31k5Ens2iKL._AA360_QL70_.jpg"
          height="200px">
          </v-card-media>
          <v-card-title primary-title class="layout justify-center">
          <div class="text-xl-center">Mushrooms, 9oz, $1.49 ($2.99/lb)</div>
          </v-card-title>	
          <v-card-actions>
          <v-btn flat color="red" class="layout justify-center">Add To Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 md3>
        <v-card class="elevation-0 transparent">
          <v-card-media src="https://images-na.ssl-images-amazon.com/images/I/41UWXFMx9iL._AA360_QL70_.jpg"
          height="200px">
          </v-card-media>
          <v-card-title primary-title class="layout justify-center">
          <div class="text-xl-center">Potatoes, 10oz, $0.75 ($0.99/lb)</div>
          </v-card-title>	
          <v-card-actions>
          <v-btn flat color="red" class="layout justify-center">Add To Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 md3>
        <v-card class="elevation-0 transparent">
          <v-card-media src="https://images-na.ssl-images-amazon.com/images/I/41CKZBcadnL._AA360_QL70_.jpg"
          height="200px">
          </v-card-media>
          <v-card-title primary-title class="layout justify-center">
          <div class="text-xl-center">Kale, 9oz, $1.49 ($2.99/lb)</div>
          </v-card-title>	
          <v-card-actions>
          <v-btn flat color="red" class="layout justify-center">Add To Cart</v-btn>
          </v-card-actions>
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
    }),
    props: ['title'],
    computed: {
      aisle () {
        return this.$store.getters.aisle(this.title)
      }
    }
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
