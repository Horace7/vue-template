import Vue from 'vue'
import Router from 'vue-router'
import { constRouterMap } from './router.config'
import store from '@/store'
import NProgress from 'nprogress'
import localStorage from '../utils/localStorage'

NProgress.configure({ showSpinner: false })
process.env.NODE_ENV === 'development' ? Vue.use(Router) : null

const createRouter = () => new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRouterMap
})
const router = createRouter()

// 路由白名单
const whiteList = ['Login', 'forgotpwd', 'Mobile']

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

// 处理路由NavigationDuplicated
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

// 剔除重复路由
router.$addRoutes = (params) => {
  router.matcher = new Router({ mode: 'history' }).matcher
  router.addRoutes(params)
}
store.dispatch('setRouters', router)

// 全局导航钩子
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')

  NProgress.start()
  if (token) {
    // 存在token
    if (to.path === '/login') {
      const redirect = to.query.redirect || '/'
      next(redirect)
      NProgress.done()
    } else {
      // 如果没有用户信息
      if (!store.getters.userInfo || !store.getters.userInfo.id) {
        await store.dispatch('GetInfo', userId)
      }
      next()
    }
  } else if (whiteList.includes(to.name)) {
    next()
  } else {
    store.dispatch('clearInfo')
    return false
  }
})

router.afterEach(() => {
  NProgress.done()
})

export { router }
