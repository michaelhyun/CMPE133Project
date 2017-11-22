import Vue from 'vue'
import Router from 'vue-router'
// Root Components
import Home from '@/components/home'
// User Components
import Profile from '@/components/users/profile'
import Register from '@/components/users/register'
// Cart Components
import Cart from '@/components/cart/cart'
import Checkout from '@/components/cart/checkout'
// Product-views Components
import Product from '@/components/product-views/product'
import Aisle from '@/components/product-views/aisle'
import SearchPage from '@/components/product-views/searchPage'
import exploreHistory from '@/components/product-views/exploreHistory'
// Promotions Components
import Savings from '@/components/promotions/savings'
// Info Components
import Help from '@/components/info/help'
import ContactUs from '@/components/info/contactUs'
import OrderConfirmation from '@/components/cart/orderConfirmation'
import AboutUs from '@/components/info/aboutUs'
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
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/aisles/:aisleName',
      name: 'Aisle',
      component: Aisle,
      props: true
    },
    {
      path: '/product/:productName',
      name: 'Product',
      component: Product,
      props: true
    },
    {
      path: '/search/',
      name: 'SearchPage',
      component: SearchPage
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/exploreHistory',
      name: 'exploreHistory',
      component: exploreHistory
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      component: ContactUs
    },
    {
      path: '/savings',
      name: 'savings',
      component: Savings
    },
    {
      path: '/orderConfirmation',
      name: 'orderConfirmation',
      component: OrderConfirmation
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: AboutUs
    }
  ],
  mode: 'history'
})
