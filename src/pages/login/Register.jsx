import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
// import * as ActionCreator from './store/ActionCreator';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';
import { sendMoRandmoCode, userRegister } from 'network/login';
import getKey from '@/utils/getKey';
import { message } from 'antd';

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPsw: false,
      userAcount: '',
      password: '',
      verification: '',
      disabled: false,
      countDown: 60
    }
  }
  componentDidMount() {
    
  }
  render() {
    const { showPsw, disabled, countDown, userAcount, password, verification } = this.state;
    return (
      <div className="register">
        <MainNavBar title="唯妮用户注册" goBack={() => {this.goBack()}} />
        <div className="register-content">
          <div className="input-container">
            <input className="input" type="number" value={userAcount} onChange={(e) => this.setState({userAcount: e.target.value})}  minLength="11" maxLength="11" placeholder="请输入11位手机号" />
            <input className="input" type={showPsw?'text':'password'} value={password} onChange={(e) => this.setState({password: e.target.value})} minLength="6" maxLength="20" placeholder="请输入6-20位登录密码" />
            <span className="show-psw" onClick={() => {this.setState((state) => ({showPsw: !state.showPsw}))}}>{showPsw ? '隐藏' : '显示'}</span>
          </div>
          <div className="verification-code">
            <input className="input" value={verification} onChange={(e) => this.setState({verification: e.target.value})} type="text" placeholder="请输入短信验证码" />
            <span className={disabled ? 'get-verification-code disabled' : 'get-verification-code'} onClick={() => this.getVerificationCode()}>获取短信验证码<span v-show="disabled">({countDown})</span></span>
          </div>
          <p className="agree">注册即视为同意<span className="agreement" onClick={() => {this.toProtocolPage()}}>《唯妮海购用户注册协议》</span></p>
          <div className="register-btn">立即注册</div>
          <p className="has-acount" onClick={() => {this.toLoginPage()}}>已有唯妮账户></p>
        </div>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getVerificationCode() {
    if (/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.state.userAcount.trim()) && !this.state.disabled) {
      sendMoRandmoCode(this.state.userAcount, 2).then(res => {
        if (res.success) {
          message.success('已发送，请注意查收', 2);
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
        } else {
          message.error('用户名已存在', 2);
        }
      })
    } else {
      message.error('手机号为空或者格式不正确', 2);
    }
  }
  register() {
    if (!/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.state.userAcount.trim())) {
      message.error('手机号为空或者格式不正确', 2);
    } else if(this.state.password.toString().length < 6 || this.state.password.toString().length > 20) {
      message.error('请按照规则设置密码', 2);
    } else if(this.verification.toString().length !== 4) {
      message.error('输入的验证码有误', 2);
    } else {
      getKey(this.state.password).then(data => {
        let referrer = document.referrer
        let shareCode = referrer.indexOf('?')>0?referrer.substring(referrer.indexOf('?')+1):""
        userRegister({mobile: this.state.userAcount, password: data, code: this.state.verification, shareCode: shareCode}).then((res) => {
          if(res.msg === '00000000') {
            message.success('恭喜你，注册成功啦 ^!^', 2);
          } else if (res.msg === '00000001') {
            message.error('注册失败', 2);
          } else if (res.msg === '00000005') {
            message.error('手机号已经被注册', 2);
          } else if (res.msg === '00000006') {
            message.error('短信验证码错误', 2);
          } else {
            message.error(res.msg, 2);
          }
        })
      })
    }
  }
  toLoginPage() {
    this.props.history.push('/login');
  }
  toProtocolPage() {
    this.props.history.push('/protocol');
  }
}

export default Register;
