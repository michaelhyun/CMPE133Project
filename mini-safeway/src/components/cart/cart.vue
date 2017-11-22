<template>
  <v-content>
    <v-container fluid>
      <v-layout row wrap mt-5 pt-5>
        <v-flex>
          <!-- Card for Shopping Cart Header, Column Headers, Products, and Subtotal -->
          <v-card>
            <!-- Shopping Cart Header -->
            <v-card-title>
              <div>
                Shopping Cart
              </div>
            </v-card-title>

            <!-- Column Headers -->
            <v-list two-line>
              <v-subheader>
                <v-flex xs7> 
                  Items
                </v-flex>
                <v-flex xs4> 
                  Quantity
                </v-flex>
                <v-flex> 
                  Delete
                </v-flex>
              </v-subheader>
              <v-spacer>
              </v-spacer>

              <!-- Product List -->
              <template v-for="(product, i) in products">
                <v-flex
                  :key="i"
                  pa-2 pl-3
                >
                  <v-divider>
                  </v-divider>
                  <!-- Product Row -->
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
                          {{ product.price }}
                        </v-list-tile-sub-title>
                      </v-flex>
                    </v-list-tile-content>
                    <!-- Quantity Picker -->
                    <v-btn
                      @click="subtract(i)"
                      class="elevation-0 transparent"
                    >
                      <v-icon>
                        remove
                      </v-icon>
                    </v-btn>
                    <v-text-field
                      v-model="product.quantity"
                      :rules="[rules.isNumber, rules.max]"
                    >
                    </v-text-field>
                    <v-btn
                    @click="add(i)"
                    class="elevation-0 transparent"
                    >
                      <v-icon>
                        radd
                      </v-icon>
                    </v-btn>
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

            <v-list two-line>
              <v-subheader>
                <v-flex xs2> 
                  Code
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs2 offset-xs10> 
                  Discount
                </v-flex>
              </v-subheader>

              <!-- Discount List -->
              <template v-for="(discount, i) in discounts">
                <v-flex
                  :key="i"
                  pa-2 pl-3
                >
                  <v-divider>
                  </v-divider>
                  <!-- Discount Row -->
                  <v-list-tile>
                    <!-- Discount Code, and Price -->
                      <v-flex pt-3 pl-4>
                        <v-list-tile-title>
                          {{ discount.code }}
                        </v-list-tile-title>
                      </v-flex>
                      <v-spacer/>
                    <v-flex pt-3 xs2 offset-xs-10>
                      <div> {{ discount.discount }} </div>
                    </v-flex>
                  </v-list-tile>
                </v-flex>
              </template>
            </v-list>

            <!-- Subtotal Row -->
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
          </v-card>

          <!-- Card for Promotion Code and Checkout -->
          <v-card>
            <v-flex pa-3>
              <v-list-tile>
                <!-- Promotion Code Text-Field -->
                <v-flex xs3>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Promotion Code:
                    </v-list-tile-title>
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
                    @click="applyPromotion(promotionCode)" color="error">
                    APPLY
                  </v-btn>
                </v-flex>

                <!-- Checkout Button -->
                <v-flex xs4 class="layout justify-center">
                  <div>
                    <v-btn
                    color="success"
                    :loading="loading2"
                    @click.native="loader = 'loading2'"
                    :disabled="loading2"
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
        // Round to two decimal places
        return total.toFixed(2)
      }
    },
    methods: {
      // method for + icon in Quantity
      add (index) {
        if (this.products[index].quantity < 100) {
          this.products[index].quantity += 1
        }
      },
      // method for - icon in Quantity
      subtract (index) {
        if (this.products[index].quantity > 1) {
          this.products[index].quantity -= 1
        }
      },
      remove (index) {
        this.products.splice(index, 1)
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
    }
  }
</script>
