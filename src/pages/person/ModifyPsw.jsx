import React, { PureComponent } from 'react';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';
import getKey from 'utils/getKey';

import { updateMoPwdByPwd } from 'network/person';

import { message } from 'antd';

class ModifyPsw extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      countDown: 60,
      isCount: true,
      timer: null,
      verifyCode: null
    }
  }
  componentDidMount() {
  }
  render() {
    const { oldPsw, newPsw } = this.state;
    return (
      <div className="modify-psw">
        <MainNavBar title="修改密码" goBack={() => {this.goBack()}} />
        <div className="modify-psw-content">
          <div className="input-box">
            <input className="psw-input" value={oldPsw} onChange={(e) => {this.setState({oldPsw: e.target.value})}} type="password" placeholder="原密码" />
            <input className="psw-input" value={newPsw} onChange={(e) => {this.setState({newPsw: e.target.value})}} type="password" placeholder="新密码" />
          </div>
          <p className="tips">备注：请将密码设置为6-20位，可由字母、数字和符号组成</p>
          <div className="confirm-btn"onClick={() => {this.confirmBtn()}}>完成</div>
        </div>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  confirmBtn() {
    if (/^\w{6,20}$/.test(this.state.oldPsw.trim())) {
      if (/^\w{6,20}$/.test(this.state.newPsw.trim())) {
        if (this.state.oldPsw.trim() !== this.state.newPsw.trim()) {
          getKey(this.state.oldPsw.trim()).then(data => {
            return data;
          }).then((re_oldPsw) => {
            getKey(this.state.newPsw.trim()).then(data => {
              updateMoPwdByPwd({oldPwd: re_oldPsw, newPwd: data}).then(res => {
                console.log(res);
                if (res.success) {
                  this.props.history.push('/modifyPswSuccess');
                } else {
                  message.error(res.message, 2);
                }
              });
            })
          })
        } else {
          message.error('新密码不能与旧密码相同', 2);
        }
      } else {
        message.error('新密码为空或者格式不正确（长度在6-20位之间）', 2);
      }
    } else {
      message.error('新密码为空或者格式不正确（长度在6-20位之间）', 2);
    }
  }
}

export default ModifyPsw;
