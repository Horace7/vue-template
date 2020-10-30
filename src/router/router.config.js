import BasicLayout from '@/containers/Full'

// 懒加载路由
const Login = () => import('@/views/users/Login.vue')
const NotFind = () => import('@/views/404.vue')
const ForgotPass = () => import('@/views/users/forgotPass.vue')


export const constRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/forgotPass',
    name: 'forgotPass',
    component: ForgotPass,
    hidden: true,
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '',
    component: BasicLayout,
    redirect: '/dashboard',
    name: 'Full',
    meta: {
      breadcrumb: 'homePage'
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'icon-dashboard_focus',
        component: () => import('@/views/dashboard/Create.vue'),
        meta: {
          title: 'Dashboard',
          permission: ['admin']
        }
      },
      {
        path: '/shopFloor',
        name: 'shopFloor',
        component: () => import('@/views/shopFloor/ShopFloor.vue'),
        icon: 'icon-icon_shopfloor',
        meta: {
          title: 'ShopFloor',
          permission: ['admin']
        }
      },
      {
        path: '/actions',
        name: 'actions',
        component: () => import('@/views/actions/Actions.vue'),
        icon: 'icon-actions1',
        meta: {
          title: 'actions',
          permission: ['admin']
        }
      },
      {
        path: '/instruments',
        name: 'instruments',
        component: () => import('@/views/instruments/index.vue'),
        icon: 'icon-icon_instruments',
        meta: {
          breadcrumb: 'instruments',
          title: 'instruments',
          permission: ['admin']
        }
      }
    ]
  },
  {
    path: '/*',
    redirect: { path: '/404' },
    hidden: true
  },
  {
    path: '/404',
    name: 'NotFind',
    component: NotFind,
    hidden: true,
    meta: {
      title: '404'
    }
  }
]
