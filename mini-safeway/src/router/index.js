import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Profile from '@/views/users/profile'
import Register from '@/views/users/register'
import Cart from '@/views/items/cart'
import Items from '@/views/items/items'
import ProductPage from '@/views/items/productpage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/items',
      name: 'Items',
      component: Items
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/items',
      name: 'Items',
      component: Items
    },

    {
      path: '/recItems',
      name: 'RecommendedItems',
      component: RecommendedItems
    },

    {
      path: '/productpage',
      name: 'Product',
      component: ProductPage
    }
  ],
  mode: 'history'
})
