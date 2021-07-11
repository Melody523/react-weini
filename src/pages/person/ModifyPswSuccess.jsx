import React, { PureComponent } from 'react';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';

class ModifyMobileSuccess extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="modify-psw-success">
        <MainNavBar title="修改密码" goBack={() => this.goBack()} />
        <div className="modify-psw-success-content">
          <p className="title">修改密码成功</p>
          <img className="icon" src="http://www.weinihaigou.com/m-images/success.png" alt="" />
          <div className="return-btn" onClick={() => {this.toProfilePage()}}>完成并返回</div>
        </div>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  toProfilePage() {
    this.props.history.push('/profile');
  }
}

export default ModifyMobileSuccess;
