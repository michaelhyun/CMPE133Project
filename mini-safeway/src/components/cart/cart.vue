<template>
  <v-content>
    <v-container fluid>
      <v-layout row wrap>
        <!-- Header Row -->
        <v-flex xs12>
          <!-- Card for Shopping Cart Header, Column Headers, Products, and Subtotal -->
          <v-card flat>
            <!-- Shopping Cart Header -->
            <v-card-title>
              <div>
                Shopping Cart
              </div>
            </v-card-title>
          </v-card>
        </v-flex>

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
            <v-subheader>
              Quantity
            </v-subheader>
            <v-spacer></v-spacer>
            <template v-for="(product, i) in products">
              <v-flex
                :key="i"
                pa-2 pl-3
              >
                <v-divider></v-divider>
                <v-list-tile>
                  <!-- Quantity Picker -->
                  <v-list-tile-content>
                    <v-text-field
                      type="number"
                      v-model="product.quantity"
                      :rules="[rules.isNumber, rules.max]"
                      class="pr-2 mr-2 px-5 input-group--focused"
                    >
                    </v-text-field>
                  </v-list-tile-content>
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
            <v-subheader>
              Discount
            </v-subheader>
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
                      <div> ${{ parseInt(discount.discount).toFixed(2) }} Off </div>
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
            <v-flex pa-3>
              <v-list-tile>
                <!-- Promotion Code Text-Field -->
                <v-flex xs3>
                  <v-list-tile-title>
                    Promotion Code:
                  </v-list-tile-title>
                  <v-list-tile-content>
                    <v-flex xs12>
                      <v-text-field
                      name="input-1-3"
                      v-model="promotionCode"
                      label='ex: NY2018'
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
                    color="white--text blue-grey darken-2">
                    APPLY
                  </v-btn>
                </v-flex>

                <!-- Checkout Button -->
                <v-flex xs4 class="layout justify-center">
                  <div>
                    <v-btn
                    color="green lighten-1"
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
      }
    },
    methods: {
      // method for + icon in Quantity
      add (index) {
        if (this.products[index].quantity < 100) {
          this.products[index].quantity++
        }
      },
      // method for - icon in Quantity
      subtract (index) {
        if (this.products[index].quantity > 1) {
          this.products[index].quantity--
        }
      },
      remove (index) {
        this.products.splice(index, 1)
      },
      removeDiscount (index) {
        this.discounts.splice(index, 1)
      },
      applyPromotion (code) {
        this.$store.dispatch('applyPromotion', this.promotionCode)
          .then((result) => {
            if (result) {
              // Finished applying
            } else {
              // Could not apply
            }
          })
      }
    },
    mounted () {
      this.$store.commit('setTitle', 'Cart')
    }
  }
</script>
