import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Partner from '../views/Partner.vue'
import Producers from '../views/Producers.vue'
import ProducerDetail from '../views/ProducerDetail.vue'
import About from '../views/About.vue'
import Traceability from '../views/Traceability.vue'
import MyAccount from '../views/MyAccount.vue'
import ProducerDashboard from '../views/ProducerDashboard.vue'
import Support from '../views/Support.vue'
import OrderConfirmation from '../views/OrderConfirmation.vue'
import MyOrders from '../views/MyOrders.vue'
import Certificates from '../views/Certificates.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: ProductList },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/partner', name: 'Partner', component: Partner },
  { path: '/producers', name: 'Producers', component: Producers },
  { path: '/producer/:id', name: 'ProducerDetail', component: ProducerDetail },
  { path: '/about', name: 'About', component: About },
  { path: '/traceability', name: 'Traceability', component: Traceability },
  { path: '/support', name: 'Support', component: Support },
  { path: '/confirmation', name: 'OrderConfirmation', component: OrderConfirmation },
  { path: '/orders', name: 'MyOrders', component: MyOrders },
  { path: '/certificates', name: 'Certificates', component: Certificates },
  { path: '/account', name: 'Account', component: MyAccount },
  { path: '/producer-dashboard', name: 'ProducerDashboard', component: ProducerDashboard },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.afterEach(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
})

export default router
