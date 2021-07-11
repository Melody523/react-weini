import React, { PureComponent } from 'react';
import './Collection.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';
import PageEnd from 'components/content/pageEnd/PageEnd';
import Scroll from 'components/common/scroll/Scroll';

import CollectionList from './childComps/CollectionList';

import { myMoCollect } from 'network/collection';

class Collection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasNextPage: true,
      sortData: {
        pageNum: 1,
        pageSize: 30
      },
      collectList: []
    }
  }
  componentDidMount() {
    this.getMyMoCollect(this.state.sortData);
  }
  render() {
    const { hasNextPage, collectList } = this.state;
    return (
      <div className="collection">
      <MainNavBar title="我的收藏" goBack={() => {this.goBack()}} />
      <Scroll classContent="collection-content" probeType={3} pullUpLoad={true} pullingUp={(scroll) => {this.pullingUp(scroll)}}>
        <CollectionList collectList={collectList} toGoodsDetailPage={(goodsNo) => {this.toGoodsDetailPage(goodsNo)}} />
        {
          !hasNextPage && <PageEnd />
        }
      </Scroll>
    </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getMyMoCollect(params) {
    myMoCollect(params).then(res => {
      let collectList = JSON.parse(JSON.stringify(this.state.collectList));
      collectList.push(...res.result.list);
      this.setState({
        collectList: collectList,
        hasNextPage: res.result.hasNextPage
      });
    })
  }
  pullingUp(scroll) {
    if (this.state.hasNextPage) {
      this.setState((state) => ({
        pageNum: state.sortData.pageNum + 1
      }));
      this.getMyMoCollect(this.state.sortData);
      setTimeout(() => {
        scroll.refresh();
        scroll.finishPullUp();
      }, 1000);
    }
  }
  toGoodsDetailPage(goodsNo) {
    this.props.history.push('/goodsDetail/' + goodsNo);
  }
}

export default Collection;
