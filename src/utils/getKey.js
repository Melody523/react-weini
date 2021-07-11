import md5 from '@/utils/md5';
import '@/utils/RSAUtils';
import { getpublickey } from 'network/login';

export default function getKey(password) {
  return new Promise((resolve, reject) => {
    let key = ''
    getpublickey().then(res => {
      key = window.RSAUtils.getKeyPair(res.result.exponent, "", res.result.modulus)
      let re_password = window.RSAUtils.encryptedString(key, md5(password), window.RSAUtils.NoPadding) 
      resolve(re_password)
    }).catch(err => {
      console.log(err)
    })
  })
}