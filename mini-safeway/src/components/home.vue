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
      <v-layout align-center>
        <v-flex xs6>
          <v-container fluid>
            <v-layout align-center row wrap>
              <v-flex xs1>
                <v-btn flat icon color="red darken--2" @click.stop="prevClubSavings()">
                  <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs10>
                <productCard :productName="currentClubSavings.name"></productCard>
              </v-flex>
              <v-flex xs1>
                <v-btn flat icon color="red darken--2" @click.stop="nextClubSavings()">
                  <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs6>
          <v-container fluid>
            <v-layout align-center row wrap>
              <v-flex xs1>
                <v-btn flat icon color="red darken--2" @click.stop="prevPromotion()">
                  <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs10>
                <promoCard :promoCodeName="promotions[promotionsIndex]"></promoCard>
              </v-flex>
              <v-flex xs1>
                <v-btn flat icon color="red darken--2" @click.stop="nextPromotion()">
                  <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
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
                    <span class="headline white--text" style="text-shadow: 2px 2px 1px #000000;" v-text="aisle.name"></span>
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
        clubSavingsIndex: 0,
        promotionsIndex: 0
      }
    },
    computed: {
      aisles () {
        var aisles = this.$store.getters.getAisles
        aisles.sort((a, b) => a.name.localeCompare(b.name))
        return aisles
      },
      promotions () {
        return this.$store.getters.getPromoCodes
      },
      clubSavings () {
        return this.$store.getters.getSavingsItems
      },
      currentPromotion () {
        return this.promotions[this.promotionsIndex]
      },
      currentClubSavings () {
        return this.clubSavings[this.clubSavingsIndex]
      }
    },
    methods: {
      prevClubSavings () {
        if (this.clubSavingsIndex === 0) {
          this.clubSavingsIndex = this.clubSavings.length - 1
        } else {
          this.clubSavingsIndex--
        }
      },
      nextClubSavings () {
        if (this.clubSavingsIndex === this.clubSavings.length - 1) {
          this.clubSavingsIndex = 0
        } else {
          this.clubSavingsIndex++
        }
      },
      prevPromotion () {
        if (this.promotionsIndex === 0) {
          this.promotionsIndex = this.promotions.length - 1
        } else {
          this.promotionsIndex--
        }
      },
      nextPromotion () {
        if (this.promotionsIndex === this.promotions.length - 1) {
          this.promotionsIndex = 0
        } else {
          this.promotionsIndex++
        }
      }
    },
    mounted () {
      this.$store.commit('setTitle', 'Home')
    }
  }
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .1s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
