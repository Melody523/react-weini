import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
// import * as ActionCreator from './store/ActionCreator';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';
import { checkMoMobile, checkMobileCodePwd } from 'network/login';

import { message } from 'antd';

class FindPsw extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userAcount: '',
      verification: '',
      disabled: false,
      countDown: 60,
      id: ''
    }
  }
  componentDidMount() {
    
  }
  render() {
    const { userAcount, verification, disabled, countDown } = this.state;
    return (
      <div className="find-psw">
        <MainNavBar title="找回密码" />
        <div className="find-psw-content">
          <div className="input-container">
            <input className="input" type="number" value={userAcount} onChange={(e) => {this.setState({userAcount: e.target.value})}} minLength="11" maxLength="11" placeholder="请输入11位手机号" />
          </div>
          <div className="verification-code">
            <input className="input" type="number" value={verification} onChange={(e) => {this.setState({verification: e.target.value})}} placeholder="请输入短信验证码" />
            <span className={disabled ? 'disabled get-verification-code' : 'get-verification-code'} onClick={() => {this.getVerificationCode()}}>{disabled?countDown+'s 后重新发送':'获取短信验证码'}</span>
          </div>
          <div className="next-btn" onClick={() => {this.nextState()}}>下一步</div>
        </div>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getVerificationCode() {
    if (!this.state.disabled) {
      if (/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.state.userAcount.trim()) && !this.state.disabled) {
        this.setState({
          disabled: true
        });
        let timer = setInterval(() => {
          this.setState((state) => ({
            countDown: state.countDown - 1
          }));
          if(this.state.countDown === 0) {
            this.setState({
              disabled: false,
              countDown: 60
            });
            clearInterval(timer);
          }
        }, 1000);
        checkMoMobile(this.state.userAcount).then(res => {
          if (res.msg === '00000000') {
            this.setState({
              id: res.id
            });
            message.success('已发送，请注意查收', 2);
          } else if (res.msg ==='00000003') {
            message.error('该手机号未注册', 2);
          } else if (res.msg === '000000019') {
            message.error('短信验证码发送次数已达上限', 2);
          } else if (res.msg === '00000007') {
            message.error('手机号格式错误', 2);
          } else if (res.msg ==='00000001') {
            message.error('验证码发送失败', 2);
          }
        })
      } else {
        message.error('手机号为空或者格式不正确', 2);
      }
    }
    
  }
  nextState() {
    if (/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.state.userAcount.trim())) {
      checkMobileCodePwd({ id: this.state.id, mobile: this.state.userAcount, code: this.state.verification }).then(res => {
        if(!res.success) {
          message.error(res.message, 2);
        } else {
          // this.props.history.push({ pathname: "/setPsw", query: {  } })
          this.props.history.push('/setPsw?sign=' + res.result + '&id=' + this.state.id + '&code=' + this.state.verification)
        }
      })
    } else {
      message.error('手机号为空或者格式不正确', 2);
    }
  }
}


export default FindPsw;
