import localStorage from '@/utils/localStorage'
import { resetRouter, router } from '@/router/index'

const user = {
  state: {
    token: localStorage.getItem('token'),
    tenantList: [],
    routerList: [],
    userInfo: {},
    organizationTrees: [],
    groupInfos: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      // localStorage.setItem('token', token)
      state.token = token
    },
    GET_USER_INFO: (state, data) => {
      state.userInfo = data
    },
    SET_ROUTER_LIST: (state, data) => {
      state.routerList = data
    }
  },
  actions: {
    setRouters ({ commit }, data) {
      commit('SET_ROUTER_LIST', data)
    },
    // 登录
    Login (store, params) {
      return new Promise((resolve, reject) => {
        // setTimeout 模拟接口调用
        setTimeout(() => {
          // 定义一个假登录数据,实际项目请用登录接口返回的数据代替此假数据
          const res = {
            code: 200,
            message: 'OK',
            data: {
              accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHQ3hvdURQN2FVTUNKU21wdW41RUhFT1NMbDZMbndiLU13LUU1dktRczdnIn0.eyJqdGkiOiI2M2E0OTM0MS0xZGQyLTQxOTQtYWQ0Zi0zYTg1NjYxZjFkMTQiLCJleHAiOjE2MDQwMzYyMDAsIm5iZiI6MCwiaWF0IjoxNjA0MDM2MTQwLCJpc3MiOiJodHRwOi8vZGwtaWRlbnRpdHkuZGwtZGV2L2F1dGgvcmVhbG1zL3VjLWRldiIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiIzNmJlMzg1OC02NTIzLTRhMGUtOWRhYy03MThkODE4OTQ1OTEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbGllbnRkZXYiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiI4MGQzNTNlYy0xZjNkLTRmNzQtOTIzYi1jM2NkNTVhODY0YTIiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiYWRtaW4iLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsibWFuYWdlLXJlYWxtIiwibWFuYWdlLXVzZXJzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5pY2tuYW1lIjoi5b6Q5pm25pm2IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiMTMwODIyMTI1OTQ3NzUwODA5NiJ9.UqUHGoURN-5M8kFEjkZV_l5meQUWfGJdGFNR7fAReBHb3uM9BlcXm-xY_j-IgOCLhfb9rx38ezV6JYbuYOZKnVjt3LfBNyKGW-XdI0SzDJM6zX3hR2Kxk-cJkjv0D5spnsX53CyoJ_ozc8E4_DILYoAMsVI9KcFPDBt3omgEOTUsFZknt3R4NwPoJtRQQLHQ7Ku-stzvXxpjHToewPUBpiSLwNjvkZAGeGreLXTzS7HVl5UhRV41ONzRsICEBfPI5pNXpELV3DGLWdOQ573xYzlY-8JUtsiwaTfKXhDklOrBMTLInzWjshwG7jVs530L-qhlF1wAr89OTUmkVHkU7Q',
              avatar: '',
              countryCode: '86',
              id: '1308221259477508096',
              mobile: '18888178807',
              userName: '张三'
            }
          }

          if (res.code === 200) {
            // 是否保持自动登录
            if (params.isKeep) {
              localStorage.setItem('autoLogin', params.isKeep)
            } else {
              localStorage.removeItem('autoLogin')
            }

            // 保存token
            store.dispatch('setAccessToken', res.data.accessToken)
            store.dispatch('setUserId', res.data.id)

            resolve(res)
          } else {
            reject(res)
          }
        }, 50)
      })
    },
    // 获取用户角色信息
    GetInfo (store) {
      return new Promise((resolve, reject) => {
        // 用setTimeout模拟接口调用获取用户信息
        setTimeout(() => {
          // 定义一个假数据,模拟接口获取到的用户信息,实际项目请用接口返回数据进行替换
          const res = {
            code: 200,
            message: 'OK',
            data: {
              avatar: '',
              countryCode: '86',
              id: '1308221259477508096',
              mobile: '18888178807',
              nickName: '张三',
              sex: '男'
            }
          }

          if (res.code === 200) {
            store.commit('GET_USER_INFO', res.data)
            resolve(res)
            return res
          } else {
            reject(res)
            return res
          }
        }, 50)
      })
    },
    setAccessToken ({ commit }, accessToken) {
      commit('SET_TOKEN', accessToken)
      const isAuto = localStorage.getItem('autoLogin')
      if (isAuto) {
        sessionStorage.removeItem('token')
        localStorage.setItem('token', accessToken)
      } else {
        localStorage.removeItem('token')
        sessionStorage.setItem('token', accessToken)
      }
    },
    setUserId (context, userId) {
      const isAuto = localStorage.getItem('autoLogin')
      if (isAuto) {
        sessionStorage.removeItem('userId')
        localStorage.setItem('userId', userId)
      } else {
        localStorage.removeItem('userId')
        sessionStorage.setItem('userId', userId)
      }
    },
    refyrToken (context, token) {
      context.dispatch('setAccessToken', token)
    },
    removeAccessToken () {
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      localStorage.removeItem('userId')
      sessionStorage.removeItem('userId')
    },
    LogOut (store) {
      return new Promise((resolve, reject) => {
        // 用setTimeout模拟登出接口
        setTimeout(() => {
          // 定义一个假数据，实际请以登出接口返回值替换
          const res = {
            code: 200,
            message: 'OK',
            data: null
          }

          if (res.code === 200) {
            store.dispatch('clearInfo')
            resetRouter()
            resolve(res)
          } else {
            reject(res)
          }
        }, 50)
      })
    },
    clearInfo (store) {
      window.localStorage.clear()
      store.commit('SET_TOKEN', '')
      store.commit('GET_USER_INFO', null)
      // 移除用户相关的本地存储
      store.dispatch('removeAccessToken')
      router.replace({ name: 'Login' })
    }
  }
}

export default user
