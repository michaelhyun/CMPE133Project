<template>
  <v-content>
    <v-container fluid >
      <h2 class="red--text text--darken-2" style="text-align: center;">Welcome to MiniSafeway</h2>
      <v-layout justify-center >
        <v-flex xs12 lg10>
          <v-carousel hide-controls>
            <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-md class="grey lighten-4">
      <h4 class="red--text text--darken-2" style="text-align: center">EXPLORE OUR AISLES</h4>
      <v-layout row wrap>
        <v-flex
          v-bind="{ [`lg${card.flex}`]: true, [`xs${card.flex2}`]: true }"
          v-for="card in cards"
          :key="card.title"
        >
          <v-card>
            <v-card-media
              :src="card.src"
              height="200px"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline white--text" style="text-shadow: 1px 1px 1px #000000;" v-text="card.title"></span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://images-na.ssl-images-amazon.com/images/I/61Z2neTKPuL._SL1024_.jpg'
          },
          {
            src: 'https://farm1.static.flickr.com/501/19632759782_4c84e1a742_b.jpg'
          },
          {
            src: 'http://truenaturetravels.com/wp-content/uploads/42_explore-1024x720.jpg'
          },
          {
            src: 'https://www.shipt.com/wp-content/uploads/2016/03/IMG_8484-1024x720.jpg'
          }
        ]
      }
    },
    computed: {
      cards () {
        return this.$store.getters.aisles
      }
    }
  }
</script>