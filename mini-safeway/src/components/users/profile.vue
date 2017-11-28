<template>
  <v-content>
    <v-container>
      <v-layout row>
        <v-flex xs11>
        <v-card pa-5>
          <v-card-media src="https://steamuserimages-a.akamaihd.net/ugc/269463939060234411/47F1E70BD90DB25A97F3B761B07764F7F947287E/"
          height="300px">
            <v-layout column class="media">
              <v-card-title>
              <v-btn dark icon class = "mr-3"
              @click="deleteConfirm">
                <v-icon>
                  delete
                </v-icon>
              </v-btn>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-title class="white--text justify-center">
              <div class="display-2 justify-center"> Profile </div>
            </v-card-title>
          </v-layout>
        </v-card-media>
        <v-list two-line>
          <!-- NAME -->
          <v-list-tile @click.stop="editNameDialog= !editNameDialog">
            <v-list-tile-action>
              <v-icon color="indigo">person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title> {{ user.first }} {{ user.last }} </v-list-tile-title>
              <v-list-tile-sub-title>Name</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-icon>
                  edit
                </v-icon>
          </v-list-tile>
          <!-- PHONE NUMBER -->
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title> {{ user.phone }}</v-list-tile-title>
              <v-list-tile-sub-title>Phone</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- EMAIL -->
          <v-list-tile @click.stop="editEmailDialog=!editEmailDialog">
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title> {{ user.email }} </v-list-tile-title>
              <v-list-tile-sub-title>Email</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-icon>
                  edit
                </v-icon>
          </v-list-tile>
          <!-- ADDRESS -->
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title> {{ user.address }},
              {{ user.city }}, {{ user.state }} {{ user.zip }}
            </v-list-tile-title>
              <v-list-tile-sub-title> Address</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <!-- Name Dialog -->
    <v-container
    <v-dialog v-model="editNameDialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Name</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="first" label="First Name">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="last" label="Last Name">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click.stop="editNameDialog=!editNameDialog"> Cancel
                    </v-btn>
                    <v-btn color="red darken-1" flat @click.native="updateName"> Save
                    </v-btn>
                  </v-card-actions>
          </v-card>
    </v-dialog>
        <!-- Email Dialog -->

        <v-dialog v-model="editEmailDialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Email</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="email" label="E-mail">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click.stop="editEmailDialog=!editEmailDialog"> Cancel
                    </v-btn>
                    <v-btn color="red darken-1" flat @click.stop="updateEmail"> Save
                    </v-btn>
                  </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Delete Dialog -->
        <v-dialog v-model="deleteDialog" max-width="600px">
          <v-card>
            <v-card-title class="headline">
              Delete Account?
            </v-card-title>
            <v-card-text>
              Are you sure you want to delete this account?
            </v-card-text>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click.stop="deleteDialog=!deleteDialog"> No
                    </v-btn>
                    <v-btn color="red darken-1" flat @click.stop="deleteAccount"> Yes
                    </v-btn>
                  </v-card-actions>
          </v-card>
        </v-dialog>
    </v-layout>
 </v-container>
</v-content>

</template>

<script>
  export default {
    data: () => ({
      first: '',
      last: '',
      email: '',
      editNameDialog: false,
      editEmailDialog: false,
      deleteDialog: false,
      dialog: false
    // variables
    }),
    computed: {
      userSignedIn () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      user () {
        var user = this.$store.getters.user
        return user
      }
    },
    methods: {
      updateEmail () {
        this.editEmailDialog = !this.editEmailDialog
        this.$store.dispatch('updateEmail', {
          email: this.email
        })
      },
      updateName () {
        this.editNameDialog = !this.editNameDialog
        this.$store.dispatch('updateUser', {
          first: this.first,
          last: this.last
        })
      },
      deleteConfirm () {
        this.deleteDialog = !this.deleteDialog
        console.log('deleteDialog')
      },
      deleteAccount () {
        this.deleteDialog = !this.deleteDialog
        this.$store.dispatch('deleteUser')
        this.$store.dispatch('logout')
        this.$store.commit('clearCart')
        this.$store.commit('clearOrderHistory')
        this.$router.push('/')
      },
      // NOT WORKING
      updateProfile () {
        this.$store.dispatch('updateUser', {
          first: this.first,
          last: this.last,
          email: this.email
        })
      }
    }
  }

</script>