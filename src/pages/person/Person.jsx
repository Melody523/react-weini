import React, { PureComponent } from 'react';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';

import { uploadPic } from 'network/person';
import { checkUser } from 'network/login';

class Person extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: {}
    }
  }
  componentDidMount() {
    this.getUserMessage();
  }
  render() {
    const { userMessage } = this.state;
    return (
      <div className="person">
        <MainNavBar title="个人信息" goBack={() => {this.goBack()}} />
        <div className="person-content">
          <ul className="person-list">
            <li className="person-item" onClick={() => {this.toNickNamePage()}}>
              <p className="person-left">昵称</p>
              <p className="person-right">
                <span>{userMessage.nickName}</span>
                <img className="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="" />
              </p>
            </li>
            <li className="person-item">
              <p className="person-left">头像</p>
              <p className="person-right">
                <img className="head-img" src={userMessage.headUrl} alt="" />
                <img className="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="" />
              </p>
              <div className="change-head-img">
                <input className="img-input" type="file" name="file" accept="image/*" onChange={() => {this.imgChange()}} />
              </div>
            </li>
            <li className="person-item" onClick={() => {this.toModifyMobilePage()}}>
              <p className="person-left">手机更换</p>
              <p className="person-right">
                <span>{userMessage.mobile}</span>
                <img className="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="" />
              </p>
            </li>
            <li className="person-item" onClick={() => {this.toFromAddress()}}>
              <p className="person-left">地址管理</p>
              <p className="person-right">
                <img className="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="" />
              </p>
            </li>
            <li className="person-item" onClick={() => {this.toModifyPsw()}}>
              <p className="person-left">修改密码</p>
              <p className="person-right">
                <img className="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="" />
              </p>
            </li>
          </ul>
        </div>
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
    })
  }
  toNickNamePage() {
    this.props.history.push('/nickname');
  }
  toModifyMobilePage() {
    this.props.history.push('/modifyMobile');
  }
  toFromAddress() {
    this.props.history.push('/fromAddress');
  }
  toModifyPsw() {
    this.props.history.push('/modifyPsw');
  }
  imgChange(e) {
    uploadPic({id: 'WU_FILE_0', name: e.target.files[0].name, type: e.target.files[0].type, lastModifiedDate: new Date(e.target.files[0].lastModified), size: e.target.files[0].size, pic: '(binary)'}).then(res => {
      console.log(res);
    });
  }
}

export default Person;
