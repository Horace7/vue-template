/**
 * 解析查询字符串参数
 */
export function parseParameters (string) {
  string = string || ''
  const params = {}
  const pattern = /[?&][A-z0-9_]+=[A-z0-9_.]*/g
  let result
  while ((result = pattern.exec(string)) !== null) {
    params[result[1]] = result[2]
  }
  return params
}

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
 * debounce
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

export function html2Data (html) {
  return (html || '')
    .replace(/span/g, 'ref')
    .replace(/data-id/g, 'id')
    .replace(/ class="at"/g, '')
}

export function data2Html (data) {
  return (data || '')
    .replace(/ref/g, 'span')
    .replace(/id/g, 'data-id')
    .replace(/<span/g, '<span class="at"')
}

/**
 * @param {String} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
