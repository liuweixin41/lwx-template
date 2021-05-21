
import JSEncrypt from 'jsencrypt'

export function encrypt(data, publicKey) {
  const encryptor = new JSEncrypt() // 新建JSEncrypt对象
  encryptor.setPublicKey(publicKey) // 设置公钥
  const rsaDta = encryptor.encrypt(data) // 进行加密
  return rsaDta
}

export function decrypt(rsaDta, privateKey) {
  const decryptor = new JSEncrypt() // 新建JSEncrypt对象
  decryptor.setPrivateKey(privateKey) // 设置私钥
  const data = decryptor.decrypt(rsaDta) // 进行解密
  return data
}
