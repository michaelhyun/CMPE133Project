<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center >
        <v-flex xs12 sm8>
          <v-carousel>
            <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    data: () => ({
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
    })
  }
</script>