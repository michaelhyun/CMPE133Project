<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-top >
        <v-flex xs12 sm10>
          <v-card flat class= "mb-2">
            <v-snackbar
              v-model="snackbar"
              absolute
              top
              right
              color="success"
            >
              <span>Registration successful!</span>
              <v-icon dark>check_circle</v-icon>
            </v-snackbar>
            <v-form @submit.prevent="submit" ref="form">
              <v-container grid-list-xl fluid>
                <v-layout wrap class="mb-2">


<v-flex xs12>
                    <span class="title">1. Shipping Information</span>
                    </v-flex>
               <v-expansion-panel expand popout>
    <v-expansion-panel-content v-bind:
      <div slot="header">1. Shipping Information</div>
    
        <v-flex xs12 sm6>
                    <v-text-field
                      color="red darken-2"
                      label="First name"
                      required
                      v-model="form.first"
                      :rules="rules.name"
                    ></v-text-field>

                  </v-flex>

                  <v-flex xs12 sm6>
                    <v-text-field
                      color="red darken-2"
                      label="Last name"
                      v-model="form.last"
                      required
                      :rules="rules.name"
                    ></v-text-field>
                  </v-flex>
                   <v-flex xs12>
                  <v-text-field
                    label="Address Line"
                    hint="Address must be less than 25 characters"
                    :rules="rules.name"
                    v-model="form.address"
                    ref="address"
                    counter="25"
                    required
                  ></v-text-field>
                   </v-flex>
                   <v-flex>
                  <v-text-field
                    label="City"
                    :rules="rules.name"
                    v-model="form.city"
                    ref="city"
                    required
                  ></v-text-field>
                </v-flex>
                 <v-flex>
                  <v-text-field
                    label="State/Province/Region"
                    v-model="form.state"
                    :rules="rules.name"
                    required
                    ref="form.state"
                    
                  ></v-text-field>
                </v-flex>
                 <v-flex>
                  <v-text-field
                    label="ZIP / Postal Code"
                    required
                    :rules="rules.name"
                    v-model="form.zip"
                    ref="zip"
                    
                  ></v-text-field>
                </v-flex>

                  <v-flex xs12 >
                    <v-text-field
                      color="red darken-2"
                      label="Email Address"
                      required
                      v-model="form.email"
                      type="email"
                    ></v-text-field>
                  </v-flex>
              
                       <v-flex xs12>
                    <v-text-field
                      label="Phone Number"
                      v-model="form.phone"
                      :rules="rules.phone"
                      required
                    ></v-text-field>
                  </v-flex>
                  

    </v-expansion-panel-content>
    
  </v-expansion-panel>
 </v-layout>
<v-card flat>
      <v-layout wrap>
            <v-flex xs12>
                    <span class="title">2. Payment Information</span>
                    </v-flex>
    <v-expansion-panel-content v-bind:
     </div>

      <v-flex xs12 sm6>
                    <v-text-field
                      color="red darken-2"
                      label="First Name On Card"
                      required
                      v-model="form.cardFirst"
                      :rules="rules.name"
                    ></v-text-field>

                  </v-flex>

                  <v-flex xs12 sm6>
                    <v-text-field
                      color="red darken-2"
                      label="Last Name On Card"
                      v-model="form.cardLast"
                      required
                      :rules="rules.name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>

                  <v-text-field
                    label="Credit Card Number"
                    :rules="rules.name"
                    v-model="form.creditCardNumber"
                    ref="creditCardNumber"
                    counter="16"
                    required
                  ></v-text-field>
                   </v-flex>
                   <v-flex xs12 sm5>
                  <v-text-field
                    label="Expiration Date"
                    placeholder = 'MM/YY'
                    :rules="rules.name"
                    v-model="form.expiration"
                    ref="expiration"
                    required
                  ></v-text-field>
                </v-flex>
                 <v-flex xs12 sm3>
                  <v-text-field
                    label="CVV"
                    v-model="form.cvv"
                    :rules="rules.name"
                    required
                   ></v-text-field>
                </v-flex>
                 <v-flex xs12 sm4>
                  <v-text-field
                    label="ZIP / Postal Code"
                    required
                    :rules="rules.name"
                    v-model="form.zip"
                    ref="zip"
                  ></v-text-field>
                </v-flex>
                       
    </v-expansion-panel-content>
  </v-layout>
</v-card>
       <v-layout wrap>
            <v-flex xs12>
                    <span class="title">3. Order Summary</span>
                    </v-flex>
    <v-expansion-panel-content v-bind:
       </div>



            <!-- Column Headers -->
            <v-flex xs12>
            <v-list two-line>
              <v-subheader>
                <v-flex xs12> 
                  Items
                </v-flex>
                <v-flex> 
                  Quantity
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

                    <div align="justify-right">
                      {{product.quantity}}
                    </div>
                   
                        
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-flex>
              </template>
            </v-list>
</v-flex>

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
    </v-expansion-panel-content>
  </v-layout>

 </v-container>
             
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
   
            </v-list-tile-content>
              
                <div>
             
            </div>
            </v-flex>
          </v-layout>


        </v-container>
          <!-- </v-container> -->
        <!-- </v-flex> -->

        <v-flex xs4 class="layout justify-center">
                  <div>
                    <v-btn @click='addToOrderHistory'
                    color="success">
                      Place Order <br>
                      <v-icon>
                        send
                      </v-icon>
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
  const defaultForm = {
    first: '',
    last: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardFirst: '',
    cardLast: '',
    creditCardNumber: '',
    expiration: '',
    ccv: '',
    creditZip: ''
  }

  export default {
    data: () => ({
      form: Object.assign({}, defaultForm),
      rules: {
        name: [val => (val || '').length > 0 || 'This field is required'],
        password: [val => (val || '').length > 7 || 'Password requires at least 8 characters']
      },
      days: [{ text: 'Day 1' }, { text: 'Day 2' }, { text: 'Day 3' }, { text: 'Day 4' }],
      snackbar: false
    }),
    computed: {
      // Products should be retrieved from the vuex store
      products () {
        return this.$store.getters.getShoppingCart
      },
      // Subtotal calculated as the sum of each product's price times its quantity
      subTotal () {
        var total = 0
        for (var i = this.products.length - 1; i >= 0; i--) {
          total += this.products[i].price * this.products[i].quantity
        }
        // Round to two decimal places
        return total.toFixed(2)
      },
      user () {
        return this.$store.getters.user
      },
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.email &&
          this.form.phone &&
          this.form.type &&
          this.form.address &&
          this.form.phone &&
          this.form.city &&
          this.form.state &&
          this.form.zip &&
          this.form.cardFirst &&
          this.form.cardLast &&
          this.form.creditCardNumber &&
          this.form.expiration &&
          this.form.cvv &&
          this.form.creditZip
        )
      }
    },

    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, defaultForm)
        this.$refs.form.reset()
      },
      addToOrderHistory () {
        this.$store.dispatch('addToOrderHistory', this.$store.getters.getShoppingCart)
        this.$store.dispatch('retrieveOrderHistory')
      },
      submit () {
        this.snackbar = true
        this.$store.dispatch('registerUser', {
          first: this.form.first,
          last: this.form.last,
          email: this.form.email,
          address: this.form.address,
          phone: this.form.phone,
          city: this.form.city,
          state: this.form.state,
          zip: this.form.zip,
          cardFirst: this.form.cardFirst,
          cardLast: this.form.cardLast,
          creditCardNumber: this.form.creditCardNumber,
          expiration: this.form.expiration,
          cvv: this.form.cvv,
          creditZip: this.form.creditZip
        })
        this.resetForm()
      }
    }
  }
</script>



