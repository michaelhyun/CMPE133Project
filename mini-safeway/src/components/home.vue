<template>
  <v-content>
    <v-container fluid>
      <h2
        class="red--text text--darken-2 text-xs-center"
      >
        Welcome to MiniSafeway
      </h2>
      <v-layout>
        <v-flex xs6>
          <h4 class="red--text text--darken-2">Explore Our Club Savings</h4>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs6>
          <h4 class="red--text text--darken-2">Explore Our Promotions</h4>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid>
      <h4 class="red--text text--darken-2">Explore Our Aisles</h4>
      <v-divider></v-divider>
    </v-container>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex
          v-bind="{ [`lg4`]: true, [`xs12`]: true }"
          v-for="aisle in aisles"
          :key="aisle.name"
        >
          <v-card
            hover
            @click=""
            :to="'/aisles/' + aisle.name"
            px-0 py-0 mx-0 my-0
          >
            <v-card-media
              :src="aisle.imageSrc"
              height="200px"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline white--text" style="text-shadow: 1px 3px 3px #000000;" v-text="aisle.name"></span>
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