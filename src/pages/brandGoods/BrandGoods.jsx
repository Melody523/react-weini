import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as ActionCreator from 'pages/brandGoods/store/ActionCreator';
import './BrandGoods.less';

import Scroll from 'components/common/scroll/Scroll';
import PageEnd from 'components/content/pageEnd/PageEnd';
import GoodsList from 'components/content/goodsList/GoodsList';

import GoodsListNavBar from './childComps/GoodsListNavBar';
import SortGroup from './childComps/SortGroup';
import SortNav from './childComps/SortNav'

class BrandGoods extends PureComponent {
  componentDidMount() {
    // console.log(this.props.location.query)
    let query = {};
    if (this.props.location.query === undefined) {
      query = JSON.parse(window.sessionStorage.getItem("query_brand_goods"));
    } else {
      window.sessionStorage.setItem("query_brand_goods", JSON.stringify(this.props.location.query));
      query = this.props.location.query;
    }
    this.props.setTitle(query.title);
    let sortData = {
      brandId: '',
      pageNum: 1,
      pageSize: 20,
      sort: '',
      order: null
    };
    sortData = Object.assign(sortData, query);
    this.props.setSortData(sortData);
    this.props.setShowSearch(query.hasOwnProperty('name'));
    this.props.searchGoodsList(sortData, true);
    this.props.getSolrGroup(sortData);
    let sortList = [
      {
        sort: 'xl',
        order: 2,
        title: '销量',
        icon: false,
        top: false,
        bottom: false
      },
      {
        sort: 'sj',
        order: 1,
        title: '价格',
        icon: true,
        top: false,
        bottom: false
      },
      {
        sort: 'kcl',
        order: 1,
        title: '库存量',
        icon: true,
        top: false,
        bottom: false
      },
      {
        sort: 'sjsj',
        order: 1,
        title: '上架时间',
        icon: true,
        top: false,
        bottom: false
      },
      {
        sort: 'sx',
        order: 2,
        title: '筛选',
        icon: false,
        top: false,
        bottom: false
      }
    ];
    this.props.setSortList(sortList);
    let currentSort = -1;
    this.props.setCurrentSort(currentSort);
    // this.props.setTitle(this.props.)
  }
  render() {
    const { title, goodsList, hasNextPage, isShow, hasData, showSearch } = this.props;
    return (
      <div className="new-goods">
        <GoodsListNavBar title={title} showSearch={showSearch} goBack={() => {this.goBack()}} />
        <SortNav />
        <Scroll classContent="new-goods-content" probeType={3} pullUpLoad={true} pullingUp={(scroll) => {this.pullingUp(scroll)}}>
          {
            !hasData ? 
            <img className="no-data-img" src="http://www.weinihaigou.com/m-images/com-no-num.png" alt="" />
            :
            <GoodsList goodsList={goodsList.toJS()} />
          }
          {
            !hasNextPage && hasData && <PageEnd />
          }
        </Scroll>
        {
          isShow && <SortGroup />
        }
      </div>
    )
  }
  pullingUp(scroll) {
    // console.log(this.props.sortData.toJS())
    if (this.props.hasNextPage) {
      return new Promise((resolve) => {
        this.props.searchGoodsList(this.props.sortData.toJS(), false);
        resolve();
      }).then(() => {
        scroll.refresh();
        setTimeout(() => {
          scroll.finishPullUp();
        }, 1000);
      })
    }
  }
  goBack() {
    this.props.history.go(-1);
  }
}

const mapState = (state) => ({
  title: state.getIn(['brandGoods', 'title']),
  goodsList: state.getIn(['brandGoods', 'goodsList']),
  sortData: state.getIn(['brandGoods', 'sortData']),
  hasNextPage: state.getIn(['brandGoods', 'hasNextPage']),
  isShow: state.getIn(['brandGoods', 'isShow']),
  showSearch: state.getIn(['brandGoods', 'showSearch']),
  hasData: state.getIn(['brandGoods', 'hasData'])
})

const mapDispatch = (dispatch) => ({
  searchGoodsList(params, flag) {
    dispatch(ActionCreator.SearchGoodsList(params, flag))
  },
  getSolrGroup(params) {
    dispatch(ActionCreator.GetSolrGroup(params))
  },
  setTitle(title) {
    dispatch(ActionCreator.SetTitle(title))
  },
  setSortData(sortData) {
    dispatch(ActionCreator.SetSortData(sortData))
  },
  setShowSearch(showSearch) {
    dispatch(ActionCreator.SetShowSearch(showSearch))
  },
  setSortList(sortList) {
    dispatch(ActionCreator.SetSortList(sortList))
  },
  setCurrentSort(currentSort) {
    dispatch(ActionCreator.SetCurrentSort(currentSort))
  }
})

export default connect(mapState, mapDispatch)(BrandGoods);
