<template>
  <v-content>
        <!--  Top bar -->
    <v-container fluid mx-0 my-0 px-0 py-0 elevation-4>
      <v-card-media
        src="https://alittleyum.files.wordpress.com/2015/10/mealbox-grocery-spread.jpg"
        height="200px"
        class="layout justify-center">
      </v-card-media>
    </v-container>

    <v-container fluid>
      <v-layout row wrap>
        <!-- Product Row: Item image, name, and price -->
        <v-flex xs10>
          <v-list two-line>
            <v-subheader> 
              Items
            </v-subheader>
            <v-spacer></v-spacer>
            <!-- Product List -->
            <template v-for="(product, i) in products">
              <v-flex
                :key="i"
                pa-2 pl-3
              >
                <v-divider></v-divider>
                <!-- Product List Row -->
                <v-list-tile>
                  <!-- Product Image, Name, and Price -->
                  <v-list-tile-avatar>
                    <img v-bind:src="product.imageSrc">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-flex pt-3 pl-4>
                      <v-list-tile-title>
                        {{ product.name }}
                      </v-list-tile-title>
                      <v-list-tile-sub-title>
                        ${{ product.price }} per unit
                      </v-list-tile-sub-title>
                    </v-flex>
                  </v-list-tile-content>
                  <v-spacer></v-spacer>
                </v-list-tile>
              </v-flex>
            </template>
          </v-list>
        </v-flex>

        <!-- Product Row: Quantity Picker -->
        <v-flex xs2>
          <v-list two-line>
            <v-flex class="pl-3">
            <v-subheader>
              Quantity
            </v-subheader>
          </v-flex>
            <v-spacer></v-spacer>
            <template v-for="(product, i) in products">
              <v-flex
                :key="i"
                pa-2 pl-3
              >
                <v-divider></v-divider>
                <v-list-tile>
                  <!-- Quantity Picker -->
                  <v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-text-field
                      type="number"
                      v-model="product.quantity" 
                      :rules="[rules.isNumber, rules.max]"
                      class="pa-1 px-2 input-group--focused"
                    >
                    </v-text-field>
                  </v-list-tile-content>
                </v-list-tile-avatar>
                  <v-list-tile-action>
                    <v-btn
                      xs-2
                      class="elevation-0 transparent"
                      @click="remove(i)"
                    >
                      <v-icon>
                        delete
                      </v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-flex>
            </template>
          </v-list>
        </v-flex>

        <v-flex xs12>
          <v-divider></v-divider>
        </v-flex>

        <!-- Discount Row: Discount Code -->
        <v-flex xs10>
          <v-list two-line>
            <v-subheader> 
              Code
            </v-subheader>
            <!-- Discount List -->
            <template v-for="(discount, i) in discounts">
              <v-flex
                :key="i"
                pa-2 pl-3
              >
                <v-divider></v-divider>
                <!-- Discount List Row -->
                <v-list-tile>
                  <!-- Discount Code, and Price -->
                  <v-flex pt-3 pl-4>
                    <v-list-tile-title>
                      {{ discount.code }}
                    </v-list-tile-title>
                  </v-flex>
                </v-list-tile>
              </v-flex>
            </template>
          </v-list>
        </v-flex>

        <!-- Discount Row: Discount Price, Delete Button -->
        <v-flex xs2>
          <v-list two-line>
            <v-flex class="pl-3">
            <v-subheader>
              Discount
            </v-subheader>
          </v-flex>
            <v-spacer></v-spacer>
            <template v-for="(discount, i) in discounts">
              <v-flex
                :key="i"
                pa-2 pl-3
              >
                <v-divider></v-divider>
                <v-list-tile>
                  <!-- Quantity Picker -->
                  <v-list-tile-content>
                    <v-flex pt-3 mt-2 pr-0 mr-0>
                      <div> ${{ parseFloat(discount.discount).toFixed(2) }} Off </div>
                    </v-flex>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn
                      xs-2
                      class="elevation-0 transparent"
                      @click="removeDiscount(i)"
                    >
                      <v-icon>
                        delete
                      </v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-flex>
            </template>
          </v-list>
        </v-flex>

        <!-- Subtotal Row -->
        <v-flex xs12>
          <template>
            <v-footer>
              <v-flex class="text-xs-left" pa-3>
                <div>
                  Subtotal: 
                </div>
              </v-flex>
              <v-flex class="text-xs-right" pa-3>
                <div>
                   $ {{ subTotal }}
                </div>
              </v-flex>
            </v-footer>
          </template>
        </v-flex>

        <!-- Card for Promotion Code and Checkout -->
        <v-flex xs12>
          <v-card>
            <v-flex pa-5>
              <v-list-tile>
                <!-- Promotion Code Text-Field -->
                <v-flex xs3>
                  <v-list-tile-title>
                    Promotion Code:
                  </v-list-tile-title>
                  <v-list-tile-content>
                    <v-flex xs12>
                      <v-text-field
                      v-model="promotionCode"
                      label='ex: MINIS123'
                      single-line
                      >
                      </v-text-field>
                    </v-flex>
                  </v-list-tile-content>
                </v-flex>

                <!-- Apply Promotion Button -->
                <v-flex xs12>
                  <v-btn
                    @click="applyPromotion(promotionCode)"
                    :color="applyButtonColor"
                    :disabled="!validPromoString"
                  >
                  <transition name="slide-fade" mode="out-in">
                    <v-icon v-if="applyButtonAnimationState && validPromo">check</v-icon>
                    <v-icon v-if="applyButtonAnimationState && !validPromo">clear</v-icon>
                    <span v-if="!applyButtonAnimationState">
                      APPLY
                    </span>
                  </transition>
                  </v-btn>
                </v-flex>

                <!-- Checkout Button -->
                <v-flex xs4 class="layout justify-center">
                  <div>
                    <v-btn
                    color="white--text blue-grey darken-2"
                    :to="'/checkout'"
                    >
                      Proceed to Checkout <br>
                      <v-icon>
                        send
                      </v-icon>
                      <span slot="loader">Please Wait...</span>
                    </v-btn>
                  </div>
                </v-flex>

              </v-list-tile>
            </v-flex>
          </v-card>
        </v-flex>
        <v-snackbar
          :timeout="3000"
          v-model="promoCodeFailedToast"
        >
          {{ toastReason }}
          <v-btn flat color = "red" @click.native="promoCodeFailedToast=false">
            Close
            <br>
          </v-btn>
          <br>
          <br>
        </v-snackbar>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
// ****Need to figure out how to store the state of quantity for each Item
  export default {
    data: () => ({
      // *****Need to figure out how to keep state of quantity of products to add to cart (also exists in product.vue and aisle.vue)
      // Rules for textfield input
      animatingApplyButton: false,
      validPromo: false,
      loadingPromo: false,
      promoCodeFailedToast: false,
      toastReason: '',
      promotionCode: '',
      // quantity: 1,
      validQuantity: true,
      rules: {
        isNumber: (value) => !isNaN(value) || 'Quantity must be a number',
        max: (value) => (isNaN(value) || value < 100) || 'Maximum value is 99'
      },
      showMenu: false
    }),
    computed: {
      validPromoString () {
        if (this.promotionCode.length === 0) {
          return false
        } else {
          return true
        }
      },
      // Products should be retrieved from the vuex store
      products () {
        return this.$store.getters.getShoppingCart
      },
      discounts () {
        return this.$store.getters.getDiscounts
      },
      // Subtotal calculated as the sum of each product's price times its quantity
      subTotal () {
        var total = 0
        for (var i = this.products.length - 1; i >= 0; i--) {
          total += this.products[i].price * this.products[i].quantity
        }
        for (i = 0; i < this.discounts.length; i++) {
          total -= this.discounts[i].discount
        }
        // Round to two decimal places
        return total.toFixed(2)
      },
      applyButtonAnimationState () {
        if (this.animatingApplyButton === true) {
          return true
        } else {
          return false
        }
      },
      applyButtonColor () {
        if (this.animatingApplyButton === true) {
          if (this.loadingPromo) {
            return 'grey lighten-2'
          } else if (this.validPromo) {
            return 'white--text green'
          } else {
            return 'white--text red'
          }
        } else {
          return 'white--text blue-grey darken-2'
        }
      }
    },
    watch: {
      products: {
        handler: function (context) {
          this.$store.dispatch('updateDiscounts')
        },
        deep: true
      }
    },
    methods: {
      remove (index) {
        this.$store.commit('removeFromCart', this.products[index])
        this.$store.dispatch('updateDiscounts')
      },
      removeDiscount (index) {
        this.$store.commit('removeDiscount', this.discounts[index])
      },
      applyPromotion (code) {
        var self = this
        this.loadingPromo = true
        this.$store.dispatch('applyPromotion', this.promotionCode)
          .then(function successCallback (result) {
            self.validPromo = true
            self.loadingPromo = false
            self.animateApplyButtonSuccess()
          }, function errorCallback (reason) {
            self.validPromo = false
            self.loadingPromo = false
            self.toastReason = reason
            self.animateApplyButtonError()
          })
      },
      animateApplyButtonLoading () {
        this.loadingPromo = true
      },
      animateApplyButtonSuccess () {
        this.animatingApplyButton = true
        setTimeout(() => {
          this.animatingApplyButton = false
        }, 750)
      },
      animateApplyButtonError () {
        this.promoCodeFailedToast = true
        this.animatingApplyButton = true
        setTimeout(() => {
          this.animatingApplyButton = false
        }, 750)
      }
    },
    mounted () {
      this.$store.commit('setTitle', 'Shopping Cart')
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