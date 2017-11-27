<template>
  <v-container fluid mx-0 my-0 px-0 py-0 elevation-4>
    <v-card height="320px">
      <v-card-media src="https://static-communitytable.parade.com/wp-content/uploads/2014/04/super-save-grocery-shopping-ftr.jpg" height="45px">
      </v-card-media>
      <v-card flat height="150">
      <v-card-title primary-title>
        <div>
          <div v-if="typeof promoCode.savings === 'number'" class="headline">GET ${{ promoCode.savings.toFixed(2) }} Off</div>
          <div v-else class="headline">GET {{ promoCode.savings }}</div> 
            <v-icon>check_circle</v-icon><span class="grey--text"> Promo Code: {{ promoCode.code }}</span>
          </div>
        </div>
      </v-card-title>
      </v-card>
      <v-card flat height="170">
      <v-card-text>
        <div v-if="promoCode.brand"><span class="black--text">1. Purchase {{ promoCode.quantity }} of any {{ promoCode.brand }} product.</span></div>
        <div v-if="promoCode.product"><span class="black--text">1. Purchase {{ promoCode.quantity }} of any {{ promoCode.product }}.</span></div>
        <div><span class="black--text">2. Apply Promo Code </span><span class="red--text">{{ promoCode.code }}</span><span class="black--text"> at Checkout</span></div>
        <div></div>
      </v-card-text>
    </v-card>
    </v-card>
    <v-card>
    <v-card-actions>
      <v-btn
            block 
            flat
            :color="colorButton"
            type="button"
            v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
      >
        <transition name="slide-fade" mode="out-in">
          <v-icon v-if="animatingButton">check</v-icon>
          <span v-if="!animatingButton">
            GET CODE
          </span>
        </transition>
      </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  // promoCard handles firebase transactions so that parent components only need
  // to pass the key (productName) as a prop.
  import { firebase } from '../../../firebase'
  export default {
    data: () => ({
      promoCode: { },
      animatingButton: false
    }),
    // Key for database (productName)
    props: ['promoCodeName'],
    mounted () {
      firebase.database().ref('savings/codes/' + this.promoCodeName).once('value')
        .then((snapshot) => {
          var promoObj = snapshot.val()
          this.promoCode = {
            code: this.promoCodeName,
            type: promoObj.type,
            brand: promoObj.brand,
            product: promoObj.product,
            quantity: promoObj.quantity,
            savings: promoObj.savings
          }
        })
    },
    computed: {
      message () {
        return this.promoCode.code
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
          return 'orange'
        }
      }
    },
    methods: {
      onCopy: function (e) {
        this.initButtonChange()
      },
      initButtonChange () {
        this.animatingButton = true
        setTimeout(() => { this.animatingButton = false }, 750)
      }
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