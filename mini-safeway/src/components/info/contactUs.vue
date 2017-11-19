<template>
  <v-content>
    <v-container grid-list-md>
      <v-layout row wrap justify-space-between mt-5>
        <v-flex d-flex xs4>
          <v-card>
            <v-layout justify-center class = "mt-2">
            <v-icon large color ="blue darken-2" class = "mt-5">business
            </v-icon>
            </v-layout>
            <v-card-title primary-title class = "layout justify-center">
              <div class = "headline text-xs-center">
              
                <div>
                  <h2>
                    Visit Our HQ
                  </h2>
                  San Jose State University<br>
                  1 Washington Sq. <br>
                  San Jose, CA 95112
                </div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex d-flex xs4>
          <v-card>
            <v-layout justify-center class = "mt-2">
            <v-icon large color ="red darken-2" class = "mt-5">favorite
            </v-icon>
            </v-layout>
            <v-t
            <v-card-title primary-title class = "layout justify-center">
              <div class = "headline text-xs-center">
                <!-- <v-subheader class = "display-1 font-weight: 200">
                  {{"Like Our Social Media"}}
                </v-subheader> -->
                <div>
                  <h2>
                    Like Our <br> Social Media
                  </h2>
                  Twitter<br>
                  Facebook <br>
                  Instagram
                </div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex d-flex xs4>
          <v-card>
            <v-layout justify-center class = "mt-2">
            <v-icon large color ="green darken-2" class = "mt-5">delete
            </v-icon>
            </v-layout>
            <v-card-title primary-title class = "layout justify-center">
              <div class = "headline text-xs-center">
                <!-- <v-subheader class = "display-1 font-weight: 200">
                  {{"Send Us A Message"}}
                </v-subheader> -->
                <div>
                  <h2>
                    Send Us A Message
                  </h2>
                  Cloud8@sjsu.edu<br>
                  PO Box<br>
                  Online Forum
                </div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    mounted () {
      this.$store.commit('setTitle', 'Contact Us')
    }
  }
</script>