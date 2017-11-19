<template>
  <v-card>
    <v-card-media src="https://static-communitytable.parade.com/wp-content/uploads/2014/04/super-save-grocery-shopping-ftr.jpg" height="200px">
    </v-card-media>
    <v-card-title primary-title>
      <div>
        <div class="headline">GET ${{ promoCode.savings.toFixed(2) }} Off</div> 
          <v-icon>check_circle</v-icon><span class="grey--text"> Promo Code: {{ promoCode.code }}</span>
        </div>
      </div>
    </v-card-title>
    <v-card-actions>
    <v-spacer></v-spacer>
      <v-btn flat color="deep-orange">Getcode</v-btn>
      <v-btn flat color="orange">Cart</v-btn>
    </v-card-actions>
    <v-card-text>
      <div><span class="black--text">1. Purchase {{ promoCode.quantity }} of any {{ promoCode.brand }} product.</span></div>
      <div><span class="black--text">2. Apply Promo Code </span><span class="red--text">{{ promoCode.code }}</span><span class="black--text"> at Checkout</span></div>
      <div></div>
    </v-card-text>
  </v-card>
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
            quantity: promoObj.quantity,
            savings: promoObj.savings
          }
        })
    }
  }
</script>