import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as ActionCreator from 'pages/theme/store/ActionCreator';
import './Theme.less';

import ThemeGoodsList from './childComps/ThemeGoodsList';

import Scroll from 'components/common/scroll/Scroll';
import PageEnd from 'components/content/pageEnd/PageEnd';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';

class Theme extends PureComponent {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getThemeBanner(id);
    this.props.getSearchGoods(id, 1);
  }
  render() {
    const { themeMessage, goodsList, hasNextPage } = this.props;
    let _themeMessage = themeMessage.toJS();
    let _goodsList = goodsList.toJS();
    return (
      <div className="theme">
        <MainNavBar title={_themeMessage.title} goBack={() => {this.goBack()}} />
        <Scroll classContent="theme-content" ref="scroll" probeType={3}  pullUpLoad={true} pullingUp={(scroll) => {this.pullingUp(scroll)}} >
          <ThemeGoodsList goodsList={_goodsList} themeImg={_themeMessage.adImgUrl} />
          {!hasNextPage && <PageEnd />}
        </Scroll>
      </div>
    )
  }
  pullingUp(scroll) {
    if (this.props.hasNextPage) {
      return new Promise((resolve) => {
        this.props.getSearchGoods(this.props.match.params.id, this.props.pageNum);
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
  id: state.getIn(['theme', 'id']),
  themeMessage: state.getIn(['theme', 'themeMessage']),
  goodsList: state.getIn(['theme', 'goodsList']),
  pageNum: state.getIn(['theme', 'pageNum']),
  hasNextPage: state.getIn(['theme', 'hasNextPage']),
});

const mapDispatch = (dispatch) => ({
  getThemeBanner(id) {
    dispatch(ActionCreator.ThemeBanner(id))
  },
  getSearchGoods(id, pageNum) {
    dispatch(ActionCreator.SearchGoods(id, pageNum))
  }
});

export default connect(mapState, mapDispatch)(Theme);
