<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center >
        <v-flex xs12 sm10>
		      <v-card flat>
            <v-snackbar
              v-model="successMessage"
              absolute
              top
              right
              color="success"
            >
              <span>Registration successful!</span>
              <v-icon dark>check_circle</v-icon>
            </v-snackbar>
            <v-form @submit.prevent="submit" ref="form">
              <v-container grid-list-xl fluid>
                <v-layout wrap>
                  <v-flex xs12>
                  	<span class="title">Personal Information</span>
                  	</v-flex>
                  	<v-flex xs12 sm6>
                    <v-text-field
                      color="red darken-2"
                      label="First name"
                      required
                      v-model="form.first"
                      :rules="rules.name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      color="red darken-2"
                      label="Last name"
                      v-model="form.last"
                      required
                      :rules="rules.name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 >
                    <v-text-field
                      color="red darken-2"
                      label="Email Address"
                      required
                      v-model="form.email"
                      type="email"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      label="Enter your password"
                      v-model="form.password"
                      :rules="rules.password"
                      required
                      type="password"
                    ></v-text-field>
                  </v-flex>
                   <v-flex xs12 sm6>
                    <v-text-field
                      label="Confirm your password"
                      v-model="form.confirmPassword"
                      required
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-flex>
                   <v-flex xs12 sm5>
                    <v-text-field
                      label="Phone/Club card number"
                      v-model="form.phone"
                      :rules="rules.phone"
                      required
                      hint="Club card number can be found on the front of your Safeway Card"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm3>
                    <v-select v-bind:items="types"
                      label="Type"
                      v-model="form.type"></v-select>
                  </v-flex>
                   <v-flex xs12>
                  	<span class="title">Delivery Information</span>
                  	</v-flex>
                  <v-flex xs12 sm6>
                  <v-text-field
                    label="Address Line"
                    placeholder="1 Washington Square"
                    hint="Address must be less than 25 characters"
                    :rules="rules.name"
                    v-model="form.address"
                    ref="address"
                    counter="25"
                    required
                  ></v-text-field>
                   </v-flex>
                  <v-text-field
                    label="City"
                    placeholder="San Jose"
                    :rules="rules.name"
                    v-model="form.city"
                    ref="city"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="State/Province/Region"
                    v-model="form.state"
                    :rules="rules.name"
                    required
                    ref="form.state"
                    placeholder="CA"
                  ></v-text-field>
                  <v-text-field
                    label="ZIP / Postal Code"
                    required
                    :rules="rules.name"
                    v-model="form.zip"
                    ref="zip"
                    placeholder="95192"
                  ></v-text-field>
                  
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-btn flat @click="resetForm">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  flat
                  color="primary"
                  type="submit"
                  :disabled="!formIsValid"
                >Register</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>


<script>
  const defaultForm = {
    first: '',
    last: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    type: 'Club Card',
    address: '',
    city: '',
    zip: ''
  }

  export default {
    data: () => ({
      form: Object.assign({}, defaultForm),
      rules: {
        name: [val => (val || '').length > 0 || 'This field is required'],
        password: [val => (val || '').length > 7 || 'Password requires at least 8 characters'],
        phone: [val => (val || '').length > 9 || 'Phone/Club card number is too short']
      },
      types: [{ text: 'Club Card' }, { text: 'Phone Number' }],
      successMessage: false
    }),

    computed: {
      comparePasswords () {
        return this.form.password !== this.form.confirmPassword ? 'Passwords do not match' : true
      },
      user () {
        return this.$store.getters.user
      },
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.email &&
          this.form.password &&
          this.form.confirmPassword &&
          this.form.phone &&
          this.form.type &&
          this.form.address &&
          this.form.city &&
          this.form.state &&
          this.form.zip &&
          this.comparePasswords === true
        )
      }
    },

    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.successMessage = true
        this.$store.dispatch('registerUser', {
          first: this.form.first,
          last: this.form.last,
          email: this.form.email,
          password: this.form.password,
          phone: this.form.phone,
          type: this.form.type,
          address: this.form.address,
          city: this.form.city,
          state: this.form.state,
          zip: this.form.zip
        })
        this.resetForm()
      }
    }
  }
</script>