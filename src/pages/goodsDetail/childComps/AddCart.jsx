import React, { PureComponent } from 'react';
import './style.less';
import { connect } from 'react-redux';
import * as ActionCreator from 'pages/goodsDetail/store/ActionCreator';
import { message } from 'antd';

class AddCart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      goodsNum: 1,
      currentIndex: null,
      goodsId: null
    };
  }

  render() {
    const { goodsImg, goodsDetailPrice, totalStock, skuList } = this.props;
    const { goodsNum, currentIndex } = this.state;
    return (
      <div className="add-cart">
        <div className="mask" onClick={() => this.hideAdd()}></div>
        <div className="add-cart-content">
          <img className="goods-img" src={goodsImg} alt="" />
          <div className="add-cart-content-top">
            {
              !currentIndex ? 
              <p className="price" >￥{goodsDetailPrice.toJS().minPrice} ～ {goodsDetailPrice.toJS().maxPrice}</p> :
              <ul className="sku-price-list">
                {
                  skuList.toJS().filter(item => item.skuId === currentIndex)[0].skuPriceList.map((item) => (
                    <li className="sku-price-item" key={item.price}>
                      {
                        item.intervalFirst === 1 && <p className="type">1件单价</p>
                      }
                      {
                        item.intervalFirst >= 10 && <p className="type">10件以上单价</p>
                      }
                      {
                        item.intervalFirst > 1 && item.intervalFirst < 10 && <p className="type">{item.intervalFirst + '-' + item.intervalLast}件单价</p>
                      }
                      <p className="price">￥{item.price}</p>
                    </li>
                  ))
                }
              </ul>
            }
            <p className="stock">库存: {totalStock}件</p>
            <p className="choose-goods">请选择商品规格</p>
          </div>
          <div className="add-cart-content-middle">
            <p className="title">规格分类:</p>
            <ul className="sku-list">
              {
                skuList.toJS().map((item) => (
                  <li className={currentIndex === item.skuId ? 'sku-item active' : 'sku-item'}
                    key={item.skuId} onClick={() => { this.skuClick(item.skuId, item.skuImg, item.realStock, item.goodsId) }}
                >{item.skuName}</li>
                ))
              }
            </ul>
          </div>
          <div className="add-cart-content-bottom">
            <p className="title">购买数量:</p>
            <div className="num">
              <div className={goodsNum <= 1 ? 'sub no-sub' : 'sub'} onClick={() => {this.subNum()}}>-</div>
              <div className="number">{goodsNum}</div>
              <div className={goodsNum >= totalStock ? 'add no-sub' : 'add'} onClick={() => {this.addNum()}}>+</div>
            </div>
          </div>
          <div className="confirm-btn" onClick={() => {this.confirmAdd()}}>确认</div>
        </div>
      </div>
    )
  }
  subNum() {
    if (this.state.goodsNum > 1) {
      this.setState((state) => ({
        goodsNum: state.goodsNum - 1
      }));
    }
  }
  addNum() {
    if (this.state.goodsNum < this.props.totalStock) {
      this.setState((state) => ({
        goodsNum: state.goodsNum + 1
      }));
    }
  }
  skuClick(skuId, skuImg, realStock, goodsId) {
    console.log(skuId)
    this.setState({
      currentIndex: skuId,
      goodsId: goodsId
    });
    this.props.changeSku(realStock, skuImg);
  }
  hideAdd() {
    this.props.changeShowAdd(false);
  }
  confirmAdd() {
    if (this.state.currentIndex) {
      this.props.addShopCar({
        goodsId: this.state.goodsId,
        skuId: this.state.currentIndex,
        num: this.state.goodsNum
      });
    } else {
      message.error('请选择商品规格', 2);
    }
  }
}
const mapState = (state) => ({
  goodsImg: state.getIn(['goodsDetail', 'goodsImg']),
  goodsDetailPrice: state.getIn(['goodsDetail', 'goodsDetailPrice']),
  totalStock: state.getIn(['goodsDetail', 'totalStock']),
  skuList: state.getIn(['goodsDetail', 'skuList'])
})

const mapDispatch = (dispatch) => ({
  changeSku(totalStock, goodsImg) {
    dispatch(ActionCreator.ChangeSku(totalStock, goodsImg))
  },
  changeShowAdd(isShowAdd) {
    dispatch(ActionCreator.ChangeShowAdd(isShowAdd))
  },
  addShopCar(params) {
    dispatch(ActionCreator.AddShopCar(params))
  }
})

export default connect(mapState, mapDispatch)(AddCart);