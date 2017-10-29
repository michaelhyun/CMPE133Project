import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Profile from '@/views/users/profile'
import Register from '@/views/users/register'
import Cart from '@/views/items/cart'
import Items from '@/views/items/items'
import Product from '@/views/items/product'
import Aisle from '@/views/items/aisle'
import RecommendedItems from '@/views/items/recItems'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
      path: '/aisles/:title',
      name: 'Aisle',
      component: Aisle,
      props: true
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
      props: true
    },
    {
      path: '/recItems',
      name: 'recItems',
      component: RecommendedItems
    }
  ],
  mode: 'history'
})
