<template>
  <v-container fluid mx-0 my-0 px-0 py-0 elevation-4>
    <v-card height="320px">
      <v-card-media src="https://static-communitytable.parade.com/wp-content/uploads/2014/04/super-save-grocery-shopping-ftr.jpg" height="45px">
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <div v-if="typeof promoCode.savings === 'number'" class="headline">GET ${{ promoCode.savings.toFixed(2) }} Off</div>
          <div v-else class="headline">GET {{ promoCode.savings }}</div> 
            <v-icon>check_circle</v-icon><span class="grey--text"> Promo Code: {{ promoCode.code }}</span>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div v-if="promoCode.brand"><span class="black--text">1. Purchase {{ promoCode.quantity }} of any {{ promoCode.brand }} product.</span></div>
        <div v-if="promoCode.product"><span class="black--text">1. Purchase {{ promoCode.quantity }} of any {{ promoCode.product }}.</span></div>
        <div><span class="black--text">2. Apply Promo Code </span><span class="red--text">{{ promoCode.code }}</span><span class="black--text"> at Checkout</span></div>
        <div></div>
      </v-card-text>
    </v-card>
    <v-card>
    <v-card-actions>
      <v-btn
            block 
            flat color="deep-orange"
            type="button"
            v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">Getcode</v-btn>
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
      promoCode: { }
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
      }
    },
    methods: {
      onCopy: function (e) {
        alert('You just copied: ' + e.text)
      },
      onError: function (e) {
        alert('Failed to copy texts')
      }
    }
  }
</script>