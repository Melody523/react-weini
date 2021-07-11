import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as ActionCreator from 'pages/otherStore/ActionCreator';
import './BrandSearch.less';

import Scroll from 'components/common/scroll/Scroll';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';

import BrandList from './childComps/BrandList'

class BrandSearch extends PureComponent {
  componentDidMount() {
    this.props.getQueryBrandList();
  }

  render() {
    const { brandMap, hotBrandList } = this.props;
    let _brandMap = brandMap.toJS();
    let _hotBrandList = hotBrandList.toJS();
    return (
      <div className="brand-search">
        <MainNavBar title="品牌街" goBack={() => {this.goBack()}} />
        <Scroll classContent="brand-content" probeType={3} >
          <BrandList queryBrand={_hotBrandList} queryBrandTitle="热门品牌" />
          {
            Object.keys(_brandMap).map(title => (
              <BrandList queryBrand={_brandMap[title]} queryBrandTitle={title} key={title} />
            ))
          }
        </Scroll>
      </div>
    )
  }

  goBack() {
    this.props.history.go(-1);
  }
}

const mapState = (state) => ({
  brandMap: state.getIn(['otherStore', 'brandMap']),
  hotBrandList: state.getIn(['otherStore', 'hotBrandList'])
})

const mapDispatch = (dispatch) => ({
  getQueryBrandList(id) {
    dispatch(ActionCreator.QueryBrandList(id))
  }
})

export default connect(mapState, mapDispatch)(BrandSearch);
