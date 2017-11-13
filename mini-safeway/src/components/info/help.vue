<template>
  <v-content>
    <v-container fluid fill-height>
    <v-layout row>
    <v-flex>
      <div class="headline text-xl-center"> MiniSafeway Help and FAQ</div>
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-list-tile
              @click="toggle(index)"
              :key="item.title"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="grey--text text--darken-4">{{ item.headline }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < items.length" :key="item.title"></v-divider>
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
          { title: 'What is "Shop By History"?', subtitle: '"Shop By History" allows a user that has made purchases in the past see their purchase history and buy from this collection' },
          { title: 'What is "Shop by Savings"?', subtitle: '"Shop by Savings" allows a user to locate available coupons and deals that are currently going on' },
          { title: 'How do you keep my groceries fresh?', subtitle: 'Your order is selected the day of your delivery and loaded onto our delivery trucks. Trucks are equipped with multiple temperature zones, so frozen items stay frozen and vegetables are crispy fresh when delivered.' },
          { title: 'Is my personal information kept confidential?', subtitle: 'Yes, your personal information is secure' },
          { title: 'What\'s the fastest way to find an item?', subtitle: 'You can explore items through Shop by Aisle, Shop by History, Shop by Savings, or the search bar at the top of the page.' },
          { title: 'Where can I update my personal information?', subtitle: 'Once logged in, click the icon of the person on the top navigation bar' },
          { title: 'How do I update the items in my cart?', subtitle: 'Navigate to the cart page by clicking the icon on the navigation bar and then update the selected item quantity, or 0 to delete from your cart' },
          { title: 'Can I buy items if I am not logged in?', subtitle: 'No, in order to buy items, you must be logged in. A guest can browse items, but will be asked to create an account before adding items to their cart' },
          { title: 'How do I apply promotion codes to my order?', subtitle: 'There is a promotion code section in the checkout, but any club Savings prices will be automatically applied' }
        ]
      }
    },

    methods: {
    }
  }
</script>