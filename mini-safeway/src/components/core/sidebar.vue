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
    disable-route-watcher
    v-model="visible"
  >
    <v-list dense>
      <template v-for="(item, i) in sideBarListItems" :to="item.link">
        <!-- Expandable List Tiles -->
        <v-list-group v-if="item.expandable" v-model="item.model" no-action>
          <v-list-tile slot="item" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="black--text">
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

        <!-- List Tiles -->
        <v-list-tile v-else
          @click=""
          :to="item.link">
          <v-list-tile-action>
            <v-icon color="black">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="black--text">
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  export default {
    props: {
      sideBarListName: String
    },
    computed: {
      sideBarListItems () {
        return this.$store.getters.getSideBarListItems
      },
      aisles () {
        return this.$store.getters.getAisles
      },
      visible () {
        return this.$store.getters.getShowSidebar
      }
    }
  }
</script>