import React, { PureComponent } from 'react';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';

import { message } from 'antd';

import { randomCodeUpdateCell, updateCellByCell } from 'network/person';

class ModifyMobileSuccess extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      code: '',
      sign: '',
      countDown: 60,
      isCount: false,
      timer: null,
      getTimes: 0
    }
  }
  componentDidMount() {
    this.setState({
      sign: this.props.match.params.sign
    });
  }
  render() {
    const { mobile, code, countDown, getTimes, isCount } = this.state;
    return (
      <div className="modify-mobile-success">
        <MainNavBar title="修改绑定手机号" goBack={() => {this.goBack()}} />
        <div className="modify-mobile-success-content">
          <div className="input-box">
            <input className="mobile-input" type="number" value={mobile} onChange={(e) => {this.setState({mobile: e.target.value})}} placeholder="请输入新手机号" />
            <div className="code-box">
              <input className="code-input" type="number" value={code} onChange={(e) => {this.setState({code: e.target.value})}} placeholder="请输入短信验证码" />
              <div className={isCount ? 'get-btn disabled' : 'get-btn'} onClick={() => {this.getCode()}}>{getTimes >= 1 ? '重新获取('+countDown+'s)' : '获取短信验证码' }</div>
            </div>
          </div>
          <div className="change-btn" onClick={() => {this.confirmChange()}}>确认更换</div>
          <div className="tip-main">
            <h2>温馨提示：</h2>
            <p>1.手机号绑定成功即被视为已注册；</p>
            <p>2.一个手机号仅限绑定一个唯妮海购账号；</p>
            <p>3.为保证账号安全，手机号注册后无法解除绑定，可以更换手机号。</p>
          </div>
        </div>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  confirmChange() {
    if (this.state.code === '') {
      message.error('输入的验证码有误', 2);
    } else {
      updateCellByCell({code: this.state.code, mobile: this.state.mobile, sign: this.state.sign}).then(res => {
        console.log(res);
        if (!res.success) {
          message.error(res.message, 2);
        } else {
          this.props.history.push('/profile');
        }
      })
    }
  }
  getCode() {
    if (!this.state.isCount) {
      if (/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.state.mobile.trim())) {
        randomCodeUpdateCell({mobile: this.state.mobile, sign: this.state.sign}).then(res => {
          console.log(res);
          if (res.success) {
            let timer;
            this.setState((state) => ({
              countDown: 60,
              isCount: true,
              getTimes: state.getTimes + 1
            }));
            clearInterval(timer);
            timer = setInterval(() => {
              this.setState((state) => ({
                countDown: state.countDown - 1
              }));
              if (this.state.countDown === 0) {
                this.setState({
                  countDown: 60,
                  isCount: false
                });
                clearInterval(timer);
              }
            }, 1000);
          } else {
            message.error(res.message, 2);
          }
        })
      } else {
        message.error('手机号为空或者格式不正确', 2);
      }
    }
  }
}

export default ModifyMobileSuccess;
