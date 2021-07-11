import React, { PureComponent } from 'react';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';

import { sendMoRandmoCode, checkMobileCodePwd } from 'network/person';
import { checkUser } from 'network/login';

import { message } from 'antd';

class ModifyMobile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: {},
      isShow: false,
      countDown: 60,
      isCount: true,
      timer: null,
      verifyCode: ''
    }
  }
  componentDidMount() {
    this.getUserMessage();
  }
  render() {
    const { userMessage, isShow, countDown, isCount, verifyCode } = this.state;
    return (
      <div className="modify-mobile">
        <MainNavBar title="个人信息" goBack={() => {this.goBack()}} />
        <div className="modify-mobile-content">
          <p className="hide-mobile">已绑定:<span>{userMessage.hideMobile}</span></p>
          <div className="change-btn" onClick={() => {this.showTip()}}>更换手机号</div>
        </div>
        {
          isShow && 
          <>
            <div className="mask"></div>
            <div className="pop-main">
              <div className="tip-main">
                <p className="title">验证手机号</p>
                <p className="detail">请输入尾号{userMessage.hideMobile && userMessage.hideMobile.substr(7)}接受的短信验证码</p>
                <div className="input-box">
                  <input className="code" type="number" value={verifyCode} onChange={(e) => {this.setState({verifyCode: e.target.value})}} placeholder="请输入短信验证码" />
                  <div className={isCount ? 'get-btn disabled' : 'get-btn'} onClick={() => {this.resendCode()}}>重新发送({countDown}s)</div>
                </div>
              </div>
              <div className="control-btn">
                <div className="cancel-btn" onClick={() => {this.cancelBtn()}}>取消</div>
                <div className="confirm-btn" onClick={() => {this.confirmBtn()}}>确定</div>
              </div>
            </div>
          </>
        }
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getUserMessage() {
    checkUser().then((res) => {
      this.setState({
        userMessage: res.result
      });
    });
  }
  showTip() {
    let timer;
    this.setState({
      isShow: true,
      countDown: 60
    });
    clearInterval(timer);
    sendMoRandmoCode(1).then(res => {
      console.log(res);
    });
    timer = setInterval(() => {
      this.setState((state) => ({
        countDown:  state.countDown - 1
      }));
      if (this.state.countDown === 0) {
        this.setState({
          countDown: 60,
          isCount: false
        });
        clearInterval(timer);
      }
    }, 1000);
  }
  resendCode() {
    let timer;
    if (!this.state.isCount) {
      this.setState({
        countDown: 60,
        isCount: true
      });
      clearInterval(timer);
      timer = setInterval(() => {
        this.setState((state) => ({
          countDown:  state.countDown - 1
        }));
        if (this.state.countDown === 0) {
          this.setState({
            countDown: 60,
            isCount: false
          });
          clearInterval(timer);
        }
      }, 1000)
    }
  }
  cancelBtn() {
    this.setState({
      isShow: false
    });
  }
  confirmBtn() {
    if (this.state.verifyCode === '') {
      message.error('输入的验证码有误', 2);
    } else {
      checkMobileCodePwd(this.state.verifyCode.trim()).then(res => {
        console.log(res);
        if (res.success) {
          this.props.history.push('/modifyMobileSuccess/' + res.result);
        } else {
          message.error(res.message, 2);
        }
      });
    }
  }
}

export default ModifyMobile;
