 <template>
  <v-content>
    <v-container fluid fill-height>
      <v-flex xs12 md4>
          <v-card>
            <v-card-media  height="400" width="400"></v-card-media>
          </v-card>
          <v-card>
            <v-card-title primary-title class="layout justify-center">
              <div class="headline text-xs-center">
                
              </div>
            </v-card-title>
            
          </v-card>
        </v-flex>

      
      <v-flex d-flex xs12 md8>
        <v-layout row wrap>
          <v-flex xs12 md4>
            <v-card class="elevation-0 layout justify-center">
              <div>
            <span><v-card-title primary-title>
                <div class="headline">Order Summary</div>
              </v-card-title></span><br>
            <span class="grey--text">Items in Cart: 0</span><br>
            
            <span><v-card-title primary-title>
                <div class="headline">Subtotal: $0.00</div>
              </v-card-title></span>
          </div>
              <v-card-title>
          
        </v-card-title>
            </v-card> 
          </v-flex>
        </v-layout>
      </v-flex>
    </v-container>
  </v-content>
</template>
