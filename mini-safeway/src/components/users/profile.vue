<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center >
        <v-flex xs12 sm8>
        	<template v-model="user">
          PROFILE
          {{ user.email }} {{ user.last }} <br>
          {{ user.phone }}
          change to {{ this.email }}
          <v-snackbar
              v-model="sucessMessage"
              absolute
              top
              right
              color="success"
            >
              <span>Registration successful!</span>
              <v-icon dark>check_circle</v-icon>
            </v-snackbar>
           </template>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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