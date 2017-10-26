<template>
  <!--
  Enabling the resize-watcher directive makes the toolbar inactive when
  using the hamburger icon to open/close the sidebar. This causes problems
  (the child component 'sidebar' can only close by mutating the 'visible'
  prop, which cannot be done because props are a 'one-way' data flow from
  parent to child) so removed 'resize-watcher' directive for now.

  Note: VueX can be used to solve this problem by storing 'visible' as a
  state.
  -->

  <v-navigation-drawer
    persistent
    clipped
    app
    v-model="visible"
  >
    <v-list dense>
      <template v-for="(item, i) in drawerItems" :to="item.link">
        <v-layout
          row
          v-if="item.heading"
          align-center
          :key="i"
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group v-else-if="item.expandable" v-model="item.model" no-action>
          <v-list-tile slot="item" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(aisle, i) in aisles"
            :key="i"
            @click=""
            :to="'/aisles/' + aisle.name"
          >
            <v-list-tile-content>
              <v-list-tile-title class="black--text">
                {{ aisle.name }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  import { store } from '../../store'

  export default {
    props: {
      visible: Boolean,
      drawerItemsName: String
    //  links: Array
    },
    computed: {
      drawerItems () {
        return store.state[this.drawerItemsName]
      },
      aisles () {
        return store.state['aisles']
      }
    }
  }
</script>