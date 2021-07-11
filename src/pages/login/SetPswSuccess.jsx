import React, {PureComponent} from 'react';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';

class SetPswSuccess extends PureComponent {
  render() {
    return (
      <div className="set-psw-success">
        <MainNavBar title="找回密码" goBack={() => {this.goBack()}} />
        <div className="set-psw-success-content">
          <p className="title">修改密码成功</p>
          <img className="icon" src="http://www.weinihaigou.com/m-images/success.png" alt="" />
          <div className="return-btn" onClick={() => {this.toLoginPage()}}>重新登录</div>
        </div>
      </div>
    );
  }
  goBack() {
    this.props.history.go(-1);
  }
  toLoginPage() {
    this.props.history.push('/login')
  }
}

export default SetPswSuccess;