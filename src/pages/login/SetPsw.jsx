import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
// import * as ActionCreator from './store/ActionCreator';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';
import { findPwdByUpdate } from 'network/login';
import getKey from '@/utils/getKey';

import { message } from 'antd';

class SetPsw extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newPsw_1: '',
      newPsw_2: '',
      sign: '',
      id: '',
      code: ''
    }
  }
  componentDidMount() {
    this.props.location.search.split('?')[1].split('&').forEach((item) => {
      this.setState({
        [item.split('=')[0]]: item.split('=')[1]
      });
    })
  }
  render() {
    const { newPsw_1, newPsw_2} = this.state;
    return (
      <div className="set-psw">
        <MainNavBar title="找回密码" goBack={() => {this.goBack()}} />
        <div className="set-psw-content">
          <div className="input-box">
            <input className="psw-input" type="password" value={newPsw_1} onChange={(e) => {this.setState({newPsw_1: e.target.value})}} placeholder="请设置6-20位新的登录密码" />
            <input className="psw-input" type="password" value={newPsw_2} onChange={(e) => {this.setState({newPsw_2: e.target.value})}} placeholder="请再次输入密码" />
          </div>
          <p className="tips">备注：请将密码设置为6-20位，可由字母、数字和符号组成</p>
          <div className="confirm-btn" onClick={() => {this.confirmBtn()}}>下一步</div>
        </div>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  confirmBtn() {
    if (/^\w{6,20}$/.test(this.state.newPsw_1.trim())) {
      if (/^\w{6,20}$/.test(this.state.newPsw_2.trim())) {
        if (this.state.newPsw_1.trim() === this.state.newPsw_2.trim()) {
          getKey(this.state.newPsw_1.trim()).then(data => {
            return data;
          }).then((re_newPsw_1) => {
            getKey(this.state.newPsw_2.trim()).then(data => {
              console.log(re_newPsw_1, data);
              findPwdByUpdate({id: this.state.id, code: this.state.code, sign: this.sign, pwd: re_newPsw_1, newPwd: data}).then(res => {
                console.log(res);
                if (res.msg === '00000000') {
                  this.props.history.push('/setPswSuccess');
                } else {
                  message.error('修改密码失败', 2);
                }
              })
            })
          })
        } else {
          message.error('两次密码不一致', 2);
        }
      } else {
        message.error('密码为空或者格式不正确（长度在6-20位之间）', 2);
      }
    } else {
      message.error('密码为空或者格式不正确（长度在6-20位之间）', 2);
    }
  }
}

export default SetPsw;
