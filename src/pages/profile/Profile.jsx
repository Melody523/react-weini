import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as ActionCreator_1 from 'pages/home/store/ActionCreator';
import * as ActionCreator from './store/ActionCreator';
import './Profile.less';

import ProfileHeader from './childComps/ProfileHeader';
import Notice from './childComps/Notice';
import Order from './childComps/Order';
import MyItem from './childComps/MyItem';

class Profile extends PureComponent {
  componentDidMount() {
    this.props.setIsActive();
    this.props.getNotice();
    this.props.myTradeCount();
    this.props.checkUser();
  }
  render() {
    const { noticeList, tradeCount, userMessage } = this.props;
    console.log(userMessage);
    return (
      <div className="profile-container">
        <ProfileHeader userMessage={userMessage.toJS()} toPersonPage={() => {this.toPersonPage()}} />
        <Notice noticeList={noticeList.toJS()} />
        <Order tradeCount={tradeCount.toJS()} toOrderListPage={(type) => {this.toOrderListPage(type)}} />
        <MyItem userMessage={userMessage.toJS()} logout={() => {this.logout()}} toPage={(path) => {this.toPage(path)}} />
      </div>
    )
  }
  logout() {
    this.props.LoginOut();
    this.props.replace('/home');
  }
  toOrderListPage(type) {
    this.props.history.push('/orderList/' + type);
  }
  toPage(path) {
    this.props.history.push(path);
  }
  toPersonPage() {
    this.props.history.push('/person');
  }
}

const mapState = (state) => ({
  noticeList: state.getIn(['profile', 'noticeList']),
  tradeCount: state.getIn(['profile', 'tradeCount']),
  userMessage: state.getIn(['profile', 'userMessage'])
});

const mapDispatch = (dispatch) => ({
  setIsActive() {
    dispatch(ActionCreator_1.SetIsActive('/profile'))
  },
  getNotice() {
    dispatch(ActionCreator.GetNotice())
  },
  myTradeCount() {
    dispatch(ActionCreator.MyTradeCount())
  },
  checkUser() {
    dispatch(ActionCreator.CheckUser()) 
  },
  loginOut() {
    dispatch(ActionCreator.LoginOut()) 
  }
});

export default connect(mapState, mapDispatch)(Profile);
