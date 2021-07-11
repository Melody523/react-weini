import * as ActionType from './ActionType';
import { fromJS } from 'immutable';
import { login, getpublickey } from 'network/login';
import md5 from '@/utils/md5';
import '@/utils/RSAUtils';
import { message } from 'antd';

const isLogin = (userMessage) => ({
  type: ActionType.LOGIN,
  userMessage: fromJS(userMessage),
  isLogin: true
})

export const Login = (mobile, password, type = 1) => {
  return (dispatch) => {
    Getpublickey(password).then(re_password => {
      login(mobile, re_password, type).then((res) => {
        if (res.success) {
          const action = isLogin(res.result);
          dispatch(action);
        } else {
          message.error(res.message, 2);
        }
      })
    })
  }
  
}

function Getpublickey(password) {
  return getpublickey().then((res) => {
    let key = window.RSAUtils.getKeyPair(res.result.exponent, "", res.result.modulus);
    let re_password = window.RSAUtils.encryptedString(key, md5(password), window.RSAUtils.NoPadding);
    return re_password;
  })
}
