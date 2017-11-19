<template>
  <v-content>
    <v-container fluid >
      <h2 class="red--text text--darken-2" style="text-align: center;">Welcome to MiniSafeway</h2>
      <v-layout justify-center >
        <v-flex xs12 lg10>
          <v-carousel hide-controls>
            <v-carousel-item v-for="(promotion, i) in promotions" v-bind:src="promotion.src" :key="i"></v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-md class="grey lighten-4">
      <h4 class="red--text text--darken-2" style="text-align: center">EXPLORE OUR AISLES</h4>
      <v-layout row wrap>
        <v-flex
          v-bind="{ [`lg4`]: true, [`xs12`]: true }"
          v-for="aisle in aisles"
          :key="aisle.name"
        >
          <v-card
            @click=""
            :to="'/aisles/' + aisle.name">
            <v-card-media
              :src="aisle.imageSrc"
              height="200px"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline white--text" style="text-shadow: 1px 1px 1px #000000;" v-text="aisle.name"></span>
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
    computed: {
      aisles () {
        var aisles = this.$store.getters.getAisles
        aisles.sort((a, b) => a.name.localeCompare(b.name))
        return aisles
      },
      promotions () {
        return this.$store.getters.promotions
      }
    },
    mounted () {
      this.$store.commit('setTitle', 'Home')
    }
  }
</script>