import React, { PureComponent } from 'react';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';
import Scroll from 'components/common/scroll/Scroll';
import NoticeList from './childComps/NoticeList';

import { getNotice } from 'network/message';

class Public extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      noticeList: []
    }
  }
  componentDidMount() {
    this.getNoticeList();
  }
  render() {
    const { noticeList } = this.state;
    return (
      <div className="public">
        <MainNavBar title="公告" goBack={() => {this.goBack()}} />
        <Scroll classContent="public-content" probeType={3} >
          <NoticeList noticeList={noticeList} toPublicDetailPage={(id) => {this.toPublicDetailPage(id)}} />
        </Scroll>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getNoticeList() {
    getNotice().then(res => {
      this.setState({
        noticeList: res.result
      });
    });
  }
  toPublicDetailPage(id) {
    this.props.history.push('/publicDetail/' + id);
  }
}

export default Public;
