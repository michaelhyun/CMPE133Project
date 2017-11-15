<template>
  <v-container align-center elevation-1 class="grey lighten-4">
    <!-- Product Card (Consists of two clickable cards, the image, and a control card) -->
    <!-- Image Card -->
    <v-layout row align-center>
      <v-flex xs12 class="ml-0 mr-0 mt-0 mb-0 pl-0 pr-0 pt-0 pb-1">
        <v-card
          @click=""
          :to="'/product/' + product.name"
          flat
          hover
          raised
          class="ma-0 pa-0"
          height="300px"
        >
          <v-card-media
            v-if="!product.imageSrc"
            contain
            class="ma-0 pa-0"
          >
            <img src="./loading.gif">
          </v-card-media>
          <v-card-media
            contain
            :src="product.imageSrc"
            height="200px"
            class="ma-0 pa-0"
          >
          </v-card-media>
          <v-card-title>
            <div class="text-xs-left">
              <h6 class="my-0 pa-0 text-xs-left"> {{name}} <br></h6>
              <p class="my-0 pa-0 text-xs-left"> Price per unit: ${{product.price}} </p>
              <div class="amber lighten-4">
                <p v-if="product.clubSavings"> Club Savings: ${{product.clubSavings.toFixed(2)}} </p>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Card Actions (Situated directly below picture) -->
    <v-layout row>
      <v-flex xs12 class="ml-0 mr-0 pl-0 pr-0">
        <v-card flat>
          <v-card-text class="my-0 py-0">
            <v-layout row>
              <v-flex xs4 justify-center>
                <v-text-field
                  auto-grow
                  v-model="quantity"
                  type="number"
                  class="my-0 pt-2 mx-2 px-2 input-group--focused"
                  :rules="[rules.isNumber, rules.max, rules.min]"
                  ></v-text-field>
              </v-flex>
              <v-flex xs8 justify-center>
                <v-btn
                  @click="addToCart"
                  :disabled="!validQuantity"
                  class="white--text justify-center"
                  :color="colorButton"
                  medium
                  block
                >
                <transition name="slide-fade" mode="out-in">
                  <v-icon v-if="animatingButton">check</v-icon>
                  <span v-if="!animatingButton">
                    Add To Cart
                  </span>
                </transition>
                </v-btn>
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
  // ProductCard handles firebase transactions so that parent components only need
  // to pass the key (productName) as a prop.
  import { firebase } from '../../../firebase'
  export default {
    data: () => ({
      // text-field view-model
      animatingButton: false,
      quantity: 1,
      validQuantity: true,
      rules: {
        isNumber: (value) => !isNaN(value) || 'Value must be a number',
        min: (value) => (isNaN(value) || value > 0) || 'Value must be greater than 0',
        max: (value) => (isNaN(value) || value < 100) || 'Must be less than 99'
      },
      // Product card data retrieved from firebase
      product: { }
    }),
    computed: {
      name () {
        var name = this.product.name
        if (name === undefined || name === null || name.length < 25) {
          return name
        } else if (name.length <= 25) {
          return name
        }
        return name.slice(0, 32) + '...'
      },
      animateButton () {
        if (this.animatingButton === true) {
          return true
        } else {
          return false
        }
      },
      colorButton () {
        if (this.animatingButton === true) {
          return 'green'
        } else {
          return 'blue-grey darken-2'
        }
      }
    },
    // Key for database (productName)
    props: ['productName'],
    methods: {
      // Methods for quantity picker.
      addToCart () {
        const payload = {
          name: this.product.name,
          quantity: parseInt(this.quantity),
          imageSrc: this.product.imageSrc,
          price: this.product.price
        }
        this.$store.commit('addToCart', payload)
        this.initButtonChange()
      },
      initButtonChange () {
        this.animatingButton = true
        setTimeout(() => { this.animatingButton = false }, 750)
      }
    },

    watch: {
      // Watch the text-field for changes
      quantity: function (context) {
        if (this.quantity !== 0) {
          if (isNaN(this.quantity)) {
            this.validQuantity = false
          } else {
            this.quantity = this.quantity
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
    },
    created () {
      // When the component is mounted, populate this.product with data from database.
      var self = this
      firebase.database().ref('products/' + this.productName).once('value')
        .then(function (snapshot) {
          // Save product details so callback can access them
          var productDetails = snapshot.val()
          // Get Download URL
          firebase.storage().ref('products/' + self.productName + '.jpg').getDownloadURL()
            .then(function (url) {
              var productUrl = url
              firebase.database().ref('promotions/clubSavings/' + self.productName).once('value')
                .then(function (snapshot) {
                  self.product = {
                    name: self.productName,
                    price: productDetails.price,
                    description: productDetails.description,
                    imageSrc: productUrl,
                    clubSavings: snapshot.val()
                  }
                })
            })
        })
    }
  }
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .1s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>