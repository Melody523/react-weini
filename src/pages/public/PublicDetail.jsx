import React, { PureComponent } from 'react';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';

import { getDetailById } from 'network/message';

class PublicDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      publicDetail: {}
    }
  }
  componentDidMount() {
    this.getPublicDetail(this.props.match.params.id);
  }
  render() {
    const { publicDetail } = this.state;
    return (
      <div className="public-detail">
        <MainNavBar title="公告详情" goBack={() => {this.goBack()}} />
        <div className="public-detail-content">
          <p className="time">{this.getFmtTime(publicDetail.createDate)}</p>
          <div className="detail" dangerouslySetInnerHTML={{__html:publicDetail.content}}></div>
        </div>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getFmtTime(date) {
    if (date !== undefined) {
      return date.replace(/\//g, '.');
    }
  }
  getPublicDetail(id) {
    getDetailById(id).then(res => {
      this.setState({
        publicDetail: res.result
      });
    });
  }
}

export default PublicDetail;
