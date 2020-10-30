import CryptoJS from 'crypto-js'

const KEY_AES = 'USERCENTER!@#123'

export function encrypt (data) {
  const key = CryptoJS.enc.Utf8.parse(KEY_AES)
  const mode = CryptoJS.mode.ECB
  const padding = CryptoJS.pad.Pkcs7

  return CryptoJS.AES.encrypt(data, key, { mode, padding }).ciphertext.toString()
}
