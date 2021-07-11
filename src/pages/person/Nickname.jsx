import React, { PureComponent } from 'react';
import './style.less';
import PersonNavBar from './childComps/PersonNavBar';

import { saveUserDetail } from 'network/person';
import { checkUser } from 'network/login';

import { message } from 'antd';

class Nickname extends PureComponent {
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
      <div className="nickname">
        <PersonNavBar title="昵称" control="保存" saveNickname={() => {this.saveNickname()}} goBack={() => {this.goBack()}} />
        <div className="nickname-content">
          <div className="input-box">
            <input className="nickname-input" value={userMessage.nickName} onChange={(e) => {this.changeNickName(e)}} type="text" />
          </div>
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
    });
  }
  changeNickName(e) {
    let userMessage = JSON.parse(JSON.stringify(this.state.userMessage));
    userMessage.nickName = e.target.value;
    this.setState({
      userMessage: userMessage
    });
  }
  saveNickname() {
    // console.log(this.state.userMessage.nickName)
    if( !(/^[\u4e00-\u9fa5a-zA-Z0-9\-\_]{4,16}$/.test(this.state.userMessage.nickName.trim())) ) {
      message.error('昵称长度为4-16个字符，可由中英文，数字，"_"，"-"组成', 2);
      return false;
    }
    saveUserDetail(this.state.userMessage.nickName.trim()).then(res => {
      console.log(res);
      if (res.success) {
        this.props.history.push('/profile');
      } else {
        message.error('修改失败', 2);
      }
    })
  }
}

export default Nickname;
