import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as ActionCreator from 'pages/login/store/ActionCreator';
import './style.less';
import { message } from 'antd';

class LoginInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: ''
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="login-input">
        <div className="input-container">
          <input className="input" value={this.state.mobile} onChange={(e) => {this.setState({mobile: e.target.value})}} type="number" minLength="11" maxLength="11" placeholder="请输入账号" />
          <input className="input" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} type="password" minLength="6" maxLength="20" placeholder="请输入密码" />
        </div>
        <div className="login-btn" onClick={() => {this.loginBtn()}}>登录</div>
        <div className="register-findpsw">
          <span className="register" onClick={() => {this.props.toRegisterPage()}}>注册帐号</span>
          <span className="find-psw" onClick={() => {this.props.toFindPswPage()}}>忘记密码？</span>
        </div>
        <div className="other-login">
          <img className="separator" src="http://www.weinihaigou.com/m-images/other-login.jpg" alt="" />
          <img className="icon" src={require('assets/img/common/weibo.svg')} alt="" />
        </div>
      </div>
    )
  }
  loginBtn() {
    if (!/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.state.mobile.trim())) {
      message.error('手机号为空或者格式不正确', 2);
    } else if (this.state.password.length < 6 || this.state.password.length > 20) {
      message.error('输入的密码有误', 2);
    } else {
      this.props.login(this.state.mobile, this.state.password, 1);
    }
  }
}

const mapDispatch = (dispatch) => ({
  login(mobile, password, type) {
    dispatch(ActionCreator.Login(mobile, password, type)) 
  }
});

export default connect(null, mapDispatch)(LoginInput);
