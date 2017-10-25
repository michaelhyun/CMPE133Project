<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center >
        <v-flex xs12 sm10>
		  <v-card flat>
    <v-snackbar
      v-model="snackbar"
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
              :rules="rules.email"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              name="input-10-2"
              label="Enter your password"
              hint="At least 8 characters"
              min="8"
              :append-icon-cb="() => (e1 = !e1)"
              type="password"
              class="input-group--focused"
            ></v-text-field>
          </v-flex>
           <v-flex xs12 sm6>
            <v-text-field
              name="input-10-2"
              label="Confirm your password"
              hint="At least 8 characters"
              min="8"
              :append-icon-cb="() => (e2 = !e2)"
              type="password"
            ></v-text-field>
          </v-flex>
           <v-flex xs12 sm5>
            <v-text-field
              name="input-3-3"
              label="Phone number or club card number"
              hint="Club card number can be found on the front of your Safeway Card"
              single-line
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
            <v-select v-bind:items="[{ text: 'Club Card' }, { text: 'Phone Number' }]" label="Type"></v-select>
          </v-flex>
           <v-flex xs12>
          	<span class="title">Delivery Information</span>
          	</v-flex>
          <v-flex xs12 sm6>
          <v-text-field
            label="Address Line"
            placeholder="1 Washington Square"
            hint="Address must be less than 25 characters"
            :rules="[
              () => !!address || 'This field is required',
         
              this.addressCheck
            ]"
            v-model="address"
            ref="address"
            counter="25"
            required
          ></v-text-field>
           </v-flex>
          <v-text-field
            label="City"
            placeholder="San Jose"
            :rules="[() => !!city || 'This field is required', this.addressCheck]"
            v-model="city"
            ref="city"
            required
          ></v-text-field>
          <v-text-field
            label="State/Province/Region"
            v-model="state"
            :rules="[() => !!state || 'This field is required']"
            required
            ref="state"
            placeholder="CA"
          ></v-text-field>
          <v-text-field
            label="ZIP / Postal Code"
            required
            :rules="[() => !!zip || 'This field is required']"
            v-model="zip"
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
    <v-dialog v-model="terms" width="70%">
      <v-card>
        <v-card-title class="title">Terms</v-card-title>
        <v-card-text v-for="n in 5" :key="n">
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            color="purple"
            @click="terms = false"
          >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="conditions" width="70%">
      <v-card>
        <v-card-title class="title">Conditions</v-card-title>
        <v-card-text v-for="n in 5" :key="n">
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            color="purple"
            @click="conditions = false"
          >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    age: null,
    terms: false
  }

  export default {
    data: () => ({
      form: Object.assign({}, defaultForm),
      rules: {
        name: [val => (val || '').length > 0 || 'This field is required']
      },
      terms: false
    }),

    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.terms
        )
      }
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.snackbar = true
        this.resetForm()
      }
    }
  }
</script>