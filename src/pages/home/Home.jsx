import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as ActionCreator from 'pages/home/store/ActionCreator';
import './Home.less';

import HomeNavBar from './childComps/HomeNavBar';
import HomeSwiper from './childComps/HomeSwiper';
import HomeNav from './childComps/HomeNav';
import HomeSubject from './childComps/HomeSubject';
import HomeHotList from './childComps/HomeHotList';

import NewSubject from 'components/content/newSubject/NewSubject';
import Scroll from 'components/common/scroll/Scroll';
import PageEnd from 'components/content/pageEnd/PageEnd';

class Home extends PureComponent {
  componentDidMount() {
    this.props.setIsActive();
    this.props.getIndexMobileTop();
    this.props.getHotList();
  }
  render() {
    const { bannerList, hotSearch, subject, newSubject, hotList } = this.props;
    return (
      <div className="home-container">
        <Scroll probeType={3} classContent="home-content">
          <HomeNavBar hotSearch={hotSearch} toSearchPage={() => {this.toSearchPage()}} toMessageCenterPage={() => {this.toMessageCenterPage()}}></HomeNavBar>
          <HomeSwiper bannerList={bannerList.toJS()}></HomeSwiper>
          <HomeNav></HomeNav>
          <HomeSubject subject={subject.toJS()}></HomeSubject>
          <NewSubject newSubject={newSubject.toJS()}></NewSubject>
          <HomeHotList hotList={hotList.toJS()}></HomeHotList>
          <PageEnd></PageEnd>
        </Scroll>
      </div>
    )
  }
  toSearchPage() {
    this.props.history.push('/search');
  }
  toMessageCenterPage() {
    this.props.history.push('/messageCenter');
  }
}

const mapState = (state) => ({
  bannerList: state.getIn(['home', 'bannerList']),
  hotSearch: state.getIn(['home', 'hotSearch']),
  subject: state.getIn(['home', 'subject']),
  newSubject: state.getIn(['home', 'newSubject']),
  hotList: state.getIn(['home', 'hotList'])
});

const mapDispatch = (dispatch) => ({
  setIsActive() {
    dispatch(ActionCreator.SetIsActive('/home'))
  },
  getIndexMobileTop() {
    dispatch(ActionCreator.IndexMobileTop())
  },
  getHotList() {
    dispatch(ActionCreator.HotList())
  }
});

export default connect(mapState, mapDispatch)(Home);
