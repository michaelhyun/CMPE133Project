<template>
  <v-content>
    <v-container fluid>
      <v-layout row wrap mt-5 pt-5>
        <v-flex>
        	<v-card>
        		<v-card-title>
        			<div>
        				Shopping Cart
        			</div>
        		</v-card-title>
	        	<v-list two-line>
	        		<!-- <template 
	        		v-for="product in products"
	        		:key = "product.name"
	        		> -->
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
	        			<spacer>
	        			</spacer>
	        			<v-flex
	        			v-for="product in products"
	        			:key="product.name"
	        			pa-2 pl-3
	        			>
	        			<v-divider>
	        			</v-divider>
	        			<v-list-tile>
	        				<!-- <v-flex pl-2 pr-2> -->
	        				<v-list-tile-avatar>
	        					<img v-bind:src="product.imageSrc">
	        				</v-list-tile-avatar>
	        				<v-list-tile-content>
	        					<v-flex pt-3 pl-4>
	        					<v-list-tile-title>
	        				
	    							{{ product.name }}
	        					
	        					<!-- <a href = '/product/'> -->
	        						
	        					<!-- </a> -->
	        					</v-list-tile-title>
	        					<v-list-tile-sub-title>
	        							{{ product.price }}
	        						</v-list-tile-sub-title>
	        					</v-flex>
	        				</v-list-tile-content>
		        			<!-- </v-flex> -->
		        		<v-btn
		        		@click="subtract(product.quantity)"
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
		        		@click="add(product.quantity)"
		        		class="elevation-0 transparent"
		        		>
			        		<v-icon>
				        		radd
				        	</v-icon>
			        	</v-btn>
	        			</v-btn>
	        				<v-list-tile-action>
	        					<v-btn xs-2 class="elevation-0 transparent">
		        					<v-icon>
		        						delete
		        					</v-icon>
		        				</v-btn>
	        				</v-list-tile-action>
	        			</v-list-tile>
	        		<!-- 	<v-divider>
	        			</v-divider> -->
        		</v-flex>
        		<!-- </template> -->
        	</v-list>
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
        <v-card>
          <v-flex pa-3>
            <v-list-tile>
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
              <!-- <v-flex xs3> -->
                <v-flex xs12>
                <v-btn
                color="error">
                  APPLY
                </v-btn>
              </v-flex>
              <!-- </v-flex>       -->
             <!-- <v-flex xs3> -->
            <!-- <v-container fluid="fluid" class="text-xs-right"> -->
              <v-flex xs4 class="layout justify-center">
                <div>
              <v-btn
              color="success"
              :loading="loading2"
              @click.native="loader = 'loading2'"
              :disabled="loading2"
              >
                Proceed to Checkout <br>
                <v-icon>
                  send
                </v-icon>
                <span slot="loader">Please Wait...</span>
              </v-btn>
            </div>
            </v-flex>
          <!-- </v-container> -->
        <!-- </v-flex> -->
            </v-list-tile>

            <!-- <v-card>
              <v-card-text>
                Promotion Code
              </v-card-text>
              <v-flex xs6>
              <v-text-field
              v-model="promotionCode"
              >
              </v-text-field>
              </v-flex>
              <v-flex xs6>
              <v-btn round color="primary">
                Apply
              </v-btn>
            </v-flex>
            </v-card> -->
          </v-flex>
        </v-card>
          <!-- <v-flex>
            <v-container fluid="fluid" class="text-xs-center">
              <v-btn
              color="success"
              :loading="loading2"
              @click.native="loader = 'loading2'"
              :disabled="loading2"
              >
                Proceed to Checkout
                <span slot="loader">Please Wait...</span>
                <v-icon>
                  cart
                </v-icon>
              </v-btn>
          </v-container>
        </v-flex> -->
      
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
      quantity: 1,
      subTotal: 0,
      validQuantity: true,
      rules: {
        isNumber: (value) => !isNaN(value) || 'Quantity must be a number',
        max: (value) => (isNaN(value) || value < 100) || 'Maximum value is 99'
      },
      showMenu: false,
      products: [
        { name: 'Banana', imageSrc: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3-1020x765.jpg', price: '0.99', quantity: 3 },
        { name: 'Banana', imageSrc: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3-1020x765.jpg', price: '0.99', quantity: 0 },
        { name: 'Banana', imageSrc: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3-1020x765.jpg', price: '0.99', quantity: 12 },
        { name: 'Banana', imageSrc: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3-1020x765.jpg', price: '0.99', quantity: 4 },
        { name: 'Banana', imageSrc: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Banana3-1020x765.jpg', price: '0.99', quantity: 'j' }
      ]
    }),
    computed: {
      cart () {
        return this.$store.getters.getShoppingCart
      }
    },
    methods: {
      // method for + icon in Quantity
      add () {
        if (this.validQuantity) {
          // var p = product
          this.p += 1
          this.subTotal += this.p
        }
      },
      // method for - icon in Quantity
      subtract () {
        if (this.validQauntity) {
          if (this.product.quantity !== 0) {
            this.product.quantity -= 1
            this.subTotal -= this.product.price
          }
        }
      }
    }
    // constantly monitor textfield for incorrect inputs
    // ****need to figure out how to modify product.quantity
    // watch: {
    //   quantity: function (context) {
    //     if (this.product.quantity !== '') {
    //       if (isNaN(this.product.quantity)) {
    //         console.log('false')
    //         this.validQuantity = false
    //       } else {
    //         this.product.quantity = parseInt(this.product.quantity)
    //         if (this.product.quantity > 0 && this.product.quantity < 100) {
    //           this.validQuantity = true
    //         } else {
    //           this.validQuantity = false
    //         }
    //       }
    //     }
    //   }
    // }
  }
</script>
