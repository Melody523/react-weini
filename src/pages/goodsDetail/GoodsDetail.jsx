import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as ActionCreator from './store/ActionCreator';
import './GoodsDetail.less';

import AddCart from './childComps/AddCart';
import CityContent from './childComps/CityContent';
import GoodsDetailInstruction from './childComps/GoodsDetailInstruction';
import GoodsDetailInstructionDesc from './childComps/GoodsDetailInstructionDesc';
import GoodsDetailMessage from './childComps/GoodsDetailMessage';
import GoodsDetailNavBar from './childComps/GoodsDetailNavBar';
import GoodsDetailPrice from './childComps/GoodsDetailPrice';
import GoodsDetailSwipe from './childComps/GoodsDetailSwipe';
import RemindTips from './childComps/RemindTips';
import BrandDesc from './childComps/BrandDesc';
import BottomTabBar from './childComps/BottomTabBar';

import Scroll from 'components/common/scroll/Scroll';

import { message } from 'antd';

class GoodsDetail extends PureComponent {
  componentDidMount() {
    let goodsNo = this.props.match.params.id;
    this.props.setGoodsNo(goodsNo);
    this.props.getGoodsDetail(goodsNo);
    this.props.getcartCount();
    this.props.checkUser();
  }
  render() {
    const { goodsBannerList, goodsDetailPrice, totalStock, isShowInstruction, goodsBrand, goodsDetailList, isShowCity, chooseProvince, chooseCity, isShowAdd, cartCount, ifCollect, showRemind, userMessage } = this.props;
    return (
      <div className="goods-detail">
        <GoodsDetailNavBar cartCount={cartCount} goBack={() => {this.goBack()}} />
        <Scroll classContent="goods-detail-content" probeType={3}>
          <GoodsDetailSwipe bannerList={goodsBannerList.toJS()} />
          <GoodsDetailPrice goodsDetailPrice={goodsDetailPrice.toJS()} />
          <div className="dispatch-container" onClick={() => {this.showCity()}}>
            配送至: <span className="dispatch-area" >{chooseProvince}   {chooseCity}</span><span className="left-icon"></span>
          </div>
          <GoodsDetailInstruction changeInstruction={(isShowInstruction) => {this.changeInstruction(isShowInstruction)}} />
          <BrandDesc goodsBrand={goodsBrand.toJS()} />
          <GoodsDetailMessage goodsDetailList={goodsDetailList.toJS()} />
        </Scroll>
        {
          isShowInstruction && <GoodsDetailInstructionDesc changeInstruction={(isShowInstruction) => {this.changeInstruction(isShowInstruction)}} />
        }
        <BottomTabBar 
          totalStock={totalStock} 
          ifCollect={ifCollect} 
          showAdd={(isShowAdd) => {this.showAdd(isShowAdd)}} 
          changeCollect={() => {this.changeCollect()}}
          showRemind={() => {this.showRemind()}}
        />
        {
          isShowCity && <CityContent chooseProvince={chooseProvince} />
        }
        {
          isShowAdd && <AddCart />
        }
        {
          showRemind && <RemindTips hideRemind={() => {this.hideRemind()}} userMessage={userMessage.toJS()} addNotify={(mobile) => {this.addNotify(mobile)}} />
        }
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  showCity() {
    this.props.changeIsShowCity(true);
  }
  changeInstruction(isShowInstruction) {
    this.props.changeIsShowInstruction(isShowInstruction);
  }
  showAdd(isShowAdd) {
    this.props.changeShowAdd(isShowAdd);
  }
  changeCollect() {
    if(this.props.ifCollect) {
      this.props.delCollectByGoodsId(this.props.goodsId);
    } else {
      this.props.insertCollectByGoodsId(this.props.goodsId);
    }
  }
  showRemind() {
    this.props.changeShowRemind(true);
  }
  hideRemind() {
    this.props.changeShowRemind(false);
  }
  addNotify(mobile) {
    if (/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(mobile.trim())) {
      this.props.addNotify({goodsId: this.props.goodsId, mobile: mobile});
    } else {
      message.error('手机号为空或者格式不正确', 2);
    }
  }
}

const mapState = (state) => ({
  goodsNo: state.getIn(['goodsDetail', 'goodsNo']),
  goodsBannerList: state.getIn(['goodsDetail', 'goodsBannerList']),
  goodsDetailPrice: state.getIn(['goodsDetail', 'goodsDetailPrice']),
  totalStock: state.getIn(['goodsDetail', 'totalStock']),
  isShowInstruction: state.getIn(['goodsDetail', 'isShowInstruction']),
  goodsBrand: state.getIn(['goodsDetail', 'goodsBrand']),
  goodsDetailList: state.getIn(['goodsDetail', 'goodsDetailList']),
  isShowCity: state.getIn(['goodsDetail', 'isShowCity']),
  chooseProvince: state.getIn(['goodsDetail', 'chooseProvince']),
  chooseCity: state.getIn(['goodsDetail', 'chooseCity']),
  isShowAdd: state.getIn(['goodsDetail', 'isShowAdd']),
  cartCount: state.getIn(['goodsDetail', 'cartCount']),
  ifCollect: state.getIn(['goodsDetail', 'ifCollect']),
  showRemind: state.getIn(['goodsDetail', 'showRemind']),
  goodsId: state.getIn(['goodsDetail', 'goodsId']),
  userMessage: state.getIn(['goodsDetail', 'userMessage'])
});

const mapDispatch = (dispatch) => ({
  setGoodsNo(goodsNo) {
    dispatch(ActionCreator.SetGoodsNo(goodsNo))
  },
  getGoodsDetail(goodsNo) {
    dispatch(ActionCreator.GetDetailMo(goodsNo))
  },
  getcartCount() {
    dispatch(ActionCreator.GetCarCount())
  },
  changeIsShowCity(isShowCity) {
    dispatch(ActionCreator.ChangeIsShowCity(isShowCity))
  },
  changeIsShowInstruction(isShowInstruction) {
    dispatch(ActionCreator.ChangeIsShowInstruction(isShowInstruction))
  },
  changeShowAdd(isShowAdd) {
    dispatch(ActionCreator.ChangeShowAdd(isShowAdd))
  },
  delCollectByGoodsId(goodsId) {
    dispatch(ActionCreator.DelCollectByGoodsId(goodsId))
  },
  insertCollectByGoodsId(goodsId) {
    dispatch(ActionCreator.InsertCollectByGoodsId(goodsId))
  },
  changeShowRemind(showRemind) {
    dispatch(ActionCreator.ChangeShowRemind(showRemind))
  },
  checkUser() {
    dispatch(ActionCreator.CheckUser())
  },
  addNotify(params) {
    dispatch(ActionCreator.AddNotify(params))
  }
});

export default connect(mapState, mapDispatch)(GoodsDetail);
