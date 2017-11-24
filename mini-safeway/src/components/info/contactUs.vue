<template>
  <v-content>
    <v-container grid-list-md>
      <v-layout row wrap justify-space-between mt-5 mb-5>
        <v-flex d-flex xs4 pl-2 pr-2>
          <v-card>
            <v-layout justify-center class = "mt-2">
            <v-icon large color ="blue darken-2" class = "mt-5">business
            </v-icon>
            </v-layout>
            <v-flex pb-5>
            <v-card-title primary-title class = "layout justify-center">
              <div class = "text-xs-center">
              
                <div>
                  <h4>
                    Visit Our Locations
                  </h4>
                  <v-divider>
                  </v-divider>
                  <br>
                  <br>
                  <h6>
                    HQ Campus:
                  </h6>
                  <subheading>
                  San Jose State University<br>
                  1 Washington Sq. <br>
                  San Jose, CA 95112<br><br>
                  <br>
                </subheading>
                  <h6>

                    Tech Labs:
                  </h6>
                  <subheading>
                  Engineering Building Rm. #493<br>
                  San Jose State University
                </subheading>
                </div>
              </div>
            </v-card-title>
          </v-flex>
          </v-card>
        </v-flex>
        <v-flex d-flex xs4 pl-2 pr-2>
          <v-card>
            <v-layout justify-center class = "mt-2">
            <v-icon large color ="red darken-2" class = "mt-5">favorite
            </v-icon>
            </v-layout>
            <v-flex pb-5>
            <v-card-title primary-title class = "layout justify-center">
              <div class = "text-xs-center">
                <!-- <v-subheader class = "display-1 font-weight: 200">
                  {{"Like Our Social Media"}}
                </v-subheader> -->
                <h4>
                    Like Our Social Media
                  </h4>
                  <v-divider>
                  </v-divider>
                  <br>
                  <br>
                <div v-for="item in socialMedia">
                
                <v-layout justify-center align-center>
                <v-flex>
                  <v-btn flat icon
                  :ripple="false"
                  flat icon
                  :href="item.link"
                  >
                <img :src="item.imgSrc" height="25px">
              </v-btn>
                <br>
                
                <!-- <a v-bind:href="item.link
              "> -->
              <subheading>
                {{ item.name }}
              </subheading>
             <!--  </a> -->
              <br>
                <br>
              </v-flex>
            </v-layout>
              </div>
                </div>
            </v-card-title>
          </v-flex>
          </v-card>
        </v-flex>
        <v-flex d-flex xs4 pl-2 pr-2>
          <v-card>
            <v-layout justify-center class = "mt-2">
            <v-icon large color ="green darken-1" class = "mt-5">mail
            </v-icon>
            </v-layout>
            <v-flex pb-5>
            <v-card-title primary-title class = "layout justify-center">
              <div class = "text-xs-center">
                <!-- <v-subheader class = "display-1 font-weight: 200">
                  {{"Send Us A Message"}}
                </v-subheader> -->
                <div>
                  <h4>
                    Send Us A Message
                  </h4>
                  <v-divider>
                  </v-divider>
                  <br>
                  <br>
                  <h6>
                    Phone:
                  </h6>
                  <v-icon color = "cyan darken-2" class = "mr-2">
                    phone
                  </v-icon>
                  <subheading>
                    (408) 808-8008
                  </subheading>
                  <br><br><br>
                  <h6>
                    E-mail:
                  </h6>
                  
                  <v-icon color = "purple darken-2" class = "mr-2">
                    computer
                  </v-icon>
                <subheading>
                  cloud8@sjsu.edu
                </subheading>
                <br><br><br>
                
                  <h6>
                    P.O. Box:
                  </h6>
              <v-icon color = "orange darken-3" class = "mr-2">
                    inbox
                  </v-icon>
                  <subheading>
                  88 E San Fernando St., 
                    San Jose, CA 95112
                  <br><br><br>
                </subheading>

                </div>
              </div>
            </v-card-title>
          </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    data: () => ({
      socialMedia: [
      { name: 'Instagram', link: 'https://instagram.com/cloud8minisafeway', imgSrc: 'https://placester.com/wp-content/uploads/2012/04/Instagram-Logo.png' },
      { name: 'Twitter', link: 'https://twitter.com/cloud8', imgSrc: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Twitter_bird_logo_2012.svg/1259px-Twitter_bird_logo_2012.svg.png' },
      { name: 'Facebook', link: 'https://facebook.com/cloud8', imgSrc: 'https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png' }
      ]
    }),
    mounted () {
      this.$store.commit('setTitle', 'Contact Us')
    }
  }
</script>