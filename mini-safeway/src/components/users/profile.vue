<template>
    <v-container fluid fill-height>
      <v-layout row justify-center>
        <v-flex xs10 md6 sm6>
        <v-card>
          <v-card-media src="https://steamuserimages-a.akamaihd.net/ugc/269463939060234411/47F1E70BD90DB25A97F3B761B07764F7F947287E/"
          height="300px">
            <v-layout column class="media">
              <v-card-title>
              <v-btn dark icon class = "mr-3">
                <v-icon>
                  edit
                </v-icon>
              </v-btn>
              <v-btn dark icon>
              <v-icon>
                more_vert
              </v-icon>
            </v-btn>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-title class="white--text justify-center">
              <div class="display-2 justify-center"> Account Settings </div>
            </v-card-title>
          </v-layout>
        </v-card-media>
        <v-list two-line>
          <!-- NAME -->
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title> Vivian Leung</v-list-tile-title>
              <v-list-tile-sub-title>Name</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- PHONE NUMBER -->
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title> (916) 833-8138</v-list-tile-title>
              <v-list-tile-sub-title>Phone</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- EMAIL -->
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title> vivian.leung01@sjsu.edu</v-list-tile-title>
              <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- ADDRESS -->
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title> 101 E San Fernando St.</v-list-tile-title>
              <v-list-tile-sub-title>San Jose, CA 95112</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

      </v-card>
    </v-flex>
    </v-layout>
 </v-container>
</template>

<script>
  export default {
    data: () => ({
      sucessMessage: false,
      email: 'poop@gmail.com'
    // variables
    }),
    computed: {

      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      updateProfile () {
        this.$store.dispatch('updateEmail', this.email)
      }
    }
  }

</script>