import React, { PureComponent } from 'react';
import './MessageCenter.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';
import MessageContent from './childComps/MessageContent';

import { newNotice } from 'network/message';

class MessageCenter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newNoticeObj: {}
    }
  }
  componentDidMount() {
    this.getNewNotice();
  }
  render() {
    const { newNoticeObj } = this.state;
    return (
      <div className="message-center">
        <MainNavBar title="消息中心" goBack={() => {this.goBack()}} />
        <MessageContent newNoticeObj={newNoticeObj} toPublicPage={() => {this.toPublicPage()}} />
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getNewNotice() {
    newNotice().then(res => {
      this.setState({
        newNoticeObj: res.result
      });
    })
  }
  toPublicPage() {
    this.props.history.push('/public');
  }
}

export default MessageCenter;
