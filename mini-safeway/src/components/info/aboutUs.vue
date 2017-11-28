<template>
  <v-content>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-card-media src="http://locatahousingservices.org.uk/wp-content/uploads/2016/07/g-cloud-8.jpg" height="500px">
            <v-layout column class="media">
              <v-card-title>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-card-title class="black--text pl-5 pt-5">
                <div class="display-1 pl-5 pt-5"></div>
              </v-card-title>
            </v-layout>
          </v-card-media>
          <v-list   one-line>
            <template v-for="(item, index) in items">
              <v-list-tile
              :key="item.title"
              >
              <v-list-tile-content>
                <v-list-tile-title class="text-xs-center">{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
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
      {title: 'MiniSafeway Inc. was established in 2017 and holds its headquarters in SJSU, San Jose, CA. The company is considered as '},
      {title: 'the first largest mini supermarket chain in San Jose and serves nationwide. Our products and services include bakery, dairy, deli '},
      {title: 'dry cleaning, photographic processing, green goods, seafood, snack food, liquor, and flowers. We earn the loyality of the people '},
      {title: 'we serve by first anticipating, then fulfilling their needs with our superior-quality products, a unique shopping experiance '},
      {title: 'customer-focused service and continuous innovation, while generating long-term profitable growth for our shareholders.'},
      {title: 'Our mission is also to be also a leaderin the distribution and merchandising of food, pharmacy, health and personal care items,'},
      {title: 'seasonal merchandise, and related products and services. We place considerable importance on foring strong supplier partnerships.'},
      {title: 'Our suppliers, large or small, local or global, are essential components in accomplishing our mission. Minisafeway web-application'},
      {title: 'developed by "Cloud 8" group. '}
      ]
    }
  },
  methods: {
  },
  mounted () {
    this.$store.commit('setTitle', 'About Us')
  }
}
</script>