<template>
  <v-content>
  <v-container fluid>

  <v-tabs fluid dark fixed centered>
    <!--  Top bar -->
     <v-card-media src="https://alittleyum.files.wordpress.com/2015/10/mealbox-grocery-spread.jpg"
        height="200px" class="layout justify-center">
      </v-card-media>
      <v-tabs-bar class="red darken-1">
      <v-tabs-slider color="red accent-1"></v-tabs-slider>
      <v-tabs-item
        v-for="(tabmenu, i) in tabmenus"
        :key="i"
        :href="'#tab-' + i"
      >
        {{ tabmenu }}
      </v-tabs-item>
    </v-tabs-bar>

    <!--  Content of each tab -->
    <v-tabs-items>

<!--  1st content -->
      <v-tabs-content
        :key="0"
        :id="'tab-' + 0"
      >
        <v-card-text primary-title class="layout justify-center">
            <div class="headline text-xs-center">Member Specials</div>
          </v-card-text>
        <template>
          <v-container>                
            <v-layout>
              <v-flex xs6 offset-xs3>
                <v-carousel hide-controls>
                 <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i" fill-height></v-carousel-item></v-carousel>
              </v-flex>
            </v-layout>
          </v-container>

        </template>

      </v-tabs-content>

      <!--  2nd content -->
      <v-tabs-content
        :key="1"
        :id="'tab-' + 1"
      >
          <v-card-text primary-title class="layout justify-center">
            <div class="headline text-xs-center">Popular Deals</div>
          </v-card-text>
  <v-container grid-list-xl>
    <v-layout row wrap align-center>

      <v-flex xs12 md4>
        <v-card class="elevation-0 transparent">
          <v-card-media src="https://parkseed.com/images/xxl/52503-pk-p1.jpg"
          height="300px">
          </v-card-media>
        </v-card>
      </v-flex>

      <v-flex xs12 md4>
        <v-card class="elevation-0 transparent"
          <v-card-media src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/1200px-Patates.jpg"
          height="300px">
          </v-card-media>
        </v-card>
      </v-flex>

      <v-flex xs12 md4>
        <v-card class="elevation-0 transparent">
          <v-card-media src="http://cdn.phillymag.com/wp-content/uploads/sites/3/2017/04/PRIMAL-SUPPLY_BEEF_3941-FINAL-Credit-Jason-Varney.jpg"
          height="300px">
          </v-card-media>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
  <template>
    <v-layout d-flex justify-center>
      <v-menu offset-y v-model="showMenu" absolute full-width>
        <v-card class="portrait" img="https://d3cizcpymoenau.cloudfront.net/images/34864/SFS_Best_Beef_Stew-4.jpg" height="500px" slot="activator"></v-card>
        <v-list>
          <v-list-tile v-for="menu in menus" :key="menu.title" @click="">
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-layout>
  </template>
      </v-tabs-content>
      
      <!--  3rd content -->
      <v-tabs-content
        :key="2"
        :id="'tab-' + 2"
      >
      <v-card-text primary-title class="layout justify-center">
      
            <div class="headline text-xs-center">Promo Codes</div>
          </v-card-text>
      <template>
        <v-container grid-list-xl>
          <v-layout row wrap align-center>
            <v-flex xs12 sm3 offset-sm1>
              <v-card>
                <v-card-media src="https://static-communitytable.parade.com/wp-content/uploads/2014/04/super-save-grocery-shopping-ftr.jpg" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">GET 10% Off</div> 
                      <v-icon>check_circle</v-icon><span class="grey--text"> Promo Code: 10off</span>
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                  <v-btn flat color="deep-orange">Getcode</v-btn>
                  <v-btn flat color="orange">Cart</v-btn>
                </v-card-actions>
                <v-card-text>
                  <div><span class="black--text">1. Min Purchase $100 (excluding shipping)</span></div>
                  <div><span class="black--text">2. Apply Promo Code </span><span class="red--text">10off</span><span class="black--text"> at Checkout</span></div>
                  <div></div>
                </v-card-text>         
              </v-card>
            </v-flex>
            
            <v-flex sm3>
                <v-card>
                  <v-card-media src="https://www.wikihow.com/images/3/31/Go-Grocery-Shopping-With-Fifty-Dollars-in-the-Bank-Step-7.jpg" height="200px">
                  </v-card-media>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">GET $5 Off</div> 
                         <v-icon>check_circle</v-icon><span class="grey--text"> Promo Code: giveme5</span>
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn flat color="deep-orange">Getcode</v-btn>
                    <v-btn flat color="orange">Cart</v-btn>
                  </v-card-actions>
                  <v-card-text>
                    <div><span class="black--text">1. Min Purchase $40 (excluding shipping)</span></div>
                    <div><span class="black--text">2. Apply Promo Code </span><span class="red--text">giveme5</span><span class="black--text"> at Checkout</span></div>
                    <div></div>
                  </v-card-text>         
                </v-card>
            </v-flex>

            <v-flex sm3>
                <v-card>
                  <v-card-media src="https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2594,w_4167,x_0,y_750/c_limit,f_auto,fl_lossy,q_80,w_1080/shutterstock_422690395_veiqr5.jpg" height="200px">
                  </v-card-media>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">Free Delivery</div> 
                         <v-icon>check_circle</v-icon><span class="grey--text"> Promo Code: freeship</span>
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn flat color="deep-orange">Getcode</v-btn>
                    <v-btn flat color="orange">Cart</v-btn>
                  </v-card-actions>
                  <v-card-text>
                    <div><span class="black--text">1. First Purchase Only</span></div>
                    <div><span class="black--text">2. Min Purchase $25 (excluding shipping)</span></div>
                    <div><span class="black--text">3. Apply Promo Code </span><span class="red--text">freeship</span><span class="black--text"> at Checkout</span></div>
                  </v-card-text>         
                </v-card>
            </v-flex>          
          </v-layout>
        </v-container>
      </template>
      

      </v-tabs-content>

    </v-tabs-items>
  </v-tabs>
</v-container>
</v-content>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'http://ct.safeway.com/circular/302/pages/B_3090278_6cb77e63de12.jpg'
          },
          {
            src: 'http://ct.safeway.com/circular/302/pages/B_3090279_252c11fdf58e.jpg'
          },
          {
            src: 'http://ct.safeway.com/circular/302/pages/B_3090280_7c5b1b95b2bc.jpg'
          },
          {
            src: 'http://ct.safeway.com/circular/302/pages/B_3090281_cef274d4125b.jpg'
          }
        ],
        showMenu: false,
        menus: [
          { title: 'Go To Recipe Page' },
          { title: 'Potato' },
          { title: 'Beef' },
          { title: 'Carrot' },
          { title: 'Green Bean' },
          { title: 'Onion' },
          { title: 'Garlic' }
        ],
        tabmenus: [
          'Member Specials', 'Popular Deals', 'Promo Codes'
        ]
      }
    }
  }
</script>