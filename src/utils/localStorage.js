/**
 * 含过期时间的localstorage以及公共方法
 */

export default {
  setItem (key, value, expired) {
    if (expired) {
      const expireTime = Date.now() + 1000 * 60 * 60 * 24 * expired
      const expireKey = key + '__expired__'
      window.localStorage.setItem(key, value)
      window.localStorage.setItem(expireKey, String(expireTime))
    } else {
      window.localStorage.setItem(key, value)
    }
  },
  getItem (key) {
    const expireKey = key + '__expired__'
    const expireValue = window.localStorage.getItem(expireKey)
    if (expireValue) {
      const expiredTime = Number(expireValue)
      const now = Date.now()
      if (now > expiredTime) {
        window.localStorage.removeItem(expireKey)
        window.localStorage.removeItem(key)
        return null
      } else {
        const data = window.localStorage.getItem(key)
        return data
      }
    } else {
      const data = window.localStorage.getItem(key)
      return data
    }
  },
  removeItem (key) {
    const expireKey = key + '__expired__'
    window.localStorage.removeItem(key)
    window.localStorage.removeItem(expireKey)
  }
}
