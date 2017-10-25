import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Profile from '@/components/users/profile'
import Register from '@/components/users/register'
import Cart from '@/components/items/cart'
import Product from '@/components/items/product'
import Aisle from '@/components/items/aisle'
import RecommendedItems from '@/components/items/recItems'

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
      path: '/aisles/:aisle',
      name: 'Aisle',
      component: Aisle,
      props: true
    },
    {
      path: '/product/:product',
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
