import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location,onResolve,onReject){
  if( onResolve || onReject ) return originalPush.call(this,location,onResolve,onReject);
  return originalPush.call(this,location).catch(err => err);
}

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

// 1.安装VueRouter
Vue.use(VueRouter)

// 2.配置路由信息
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail',
    component: Detail
  }
]

// 3.创建路由对象
const router = new VueRouter({
  mode: 'history',
  routes
})

// 4.导出
export default router
