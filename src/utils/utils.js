/**
 * 字符串去前后空格
 */
export function trim (s) {
  return s.replace(/(^\s+)|(\s+$)/g, '')
}

/**
 * 去除 html 空格
 */
export function trimHtml (s) {
  return trim(s).replace(/<br>/g, '')
}

/**
 * debounce 防止抖动
 */
export function debounce (fn, delay = 500) {
  let timer

  return function () {
    clearTimeout(timer)

    const _this = this
    const _arguments = arguments

    timer = setTimeout(() => {
      fn.apply(_this, _arguments)
    }, delay)
  }
}

// 验证邮箱
export function isEmail (string) {
  const reg = /^([a-zA-Z0-9_-]|\.)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(string)
}

// 验证手机号
export function isPhone (string) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(string)
}

// 验证密码
export function isValidPassword (string) {
  const reg = /^(?![0-9]+$)(?![A-z]+$)\S{6,}$/
  return reg.test(string)
}

/**
 * @param {String} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
