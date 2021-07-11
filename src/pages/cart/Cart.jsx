import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as ActionCreator from './store/ActionCreator';
import * as ActionCreator_1 from 'pages/home/store/ActionCreator';
import './Cart.less';

import Scroll from 'components/common/scroll/Scroll';
import Delect from 'components/content/delect/Delect';

import CartNavBar from './childComps/CartNavBar';
import CartListContent from './childComps/CartListContent';
import TotalCount from './childComps/TotalCount';

import { setCookie } from 'utils/cookies';

import { message } from 'antd';

class Cart extends PureComponent {
  componentDidMount() {
    this.props.setIsActive();
    this.props.getCartList();
  }
  render() {
    const { cartList, isEdit, showDelect } = this.props;
    return (
      <div className="cart">
        <CartNavBar title="购物车" isEdit={isEdit} changeEdit={() => {this.changeEdit()}} />
        <Scroll classContent="cart-content" probeType={3} >
          <CartListContent
            cartList={cartList.toJS()} 
            isEdit={isEdit}
            chooseClick={(index, i) => {this.chooseClick(index, i)}}
            taxClick={(index, i) => {this.taxClick(index, i)}}
            changeGoodsNum={(goodsId, skuId, num) => {this.changeGoodsNum(goodsId, skuId, num)}}
            delectGoods={(id) => {this.delectGoods(id)}}
          />
        </Scroll>
        <TotalCount clickAllCheck={() => {this.clickAllCheck()}} checkAll={this.checkAll()} selectedCal={this.selectedCal()} selectedFreightMoney={this.selectedFreightMoney()} toSurePay={() => {this.toSurePay()}} />
        {
          showDelect && 
          <Delect 
            content={
              <div className="delect-header">确定要删除吗？</div>
            }
            cancelDel={() => {this.cancelDel()}}
            confirmDel={() => {this.confirmDel()}}
          >
          </Delect>
        }
      </div>
    )
  }
  checkAll() {
    return this.props.cartList.toJS().filter(item => {
      return item.shopCarList.find(shopCarItem => {
        return !shopCarItem.checked
      });
    }).length > 0 ? false : true ;
  }
  selectedCal() {
    let taxMoney = 0;
    let goodsMoney = 0;
    this.props.cartList.toJS().forEach(item => {
      item.shopCarList.forEach((shopCarItem) => {
        if(shopCarItem.checked) {
          taxMoney += Number(shopCarItem.goodsTax);
          goodsMoney += shopCarItem.skuPrice * shopCarItem.num;
        }
      })
    })
    return {
      taxMoney,
      goodsMoney
    }
  }
  selectedFreightMoney() {
    return ( this.selectedCal.goodsMoney === 0 || this.selectedCal.goodsMoney >= this.props.postpolicy.limitMoney ) ? 0 : this.props.postpolicy.postage;
  }
  changeEdit() {
    this.props.changeEditType(!this.props.isEdit);
  }
  chooseClick(index, i) {
    let cartList = this.props.cartList.toJS();
    cartList[index].shopCarList[i].checked = !cartList[index].shopCarList[i].checked;
    this.props.setCartList(cartList);
  }
  taxClick(index, i) {
    let cartList = this.props.cartList.toJS();
    cartList[index].shopCarList[i].taxShow = !cartList[index].shopCarList[i].taxShow;
    this.props.setCartList(cartList);
  }
  changeGoodsNum(goodsId, skuId, num) {
    this.props.addShopCar({goodsId, skuId, num});
  }
  delectGoods(id) {
    this.props.setShowDel(true, id);
    // this.props.delShopCar({id});
  }
  cancelDel() {
    this.props.setShowDel(false, '');
  }
  confirmDel() {
    this.props.delShopCar({id: this.props.delId});
  }
  clickAllCheck() {
    let cartList = this.props.cartList.toJS();
    cartList.forEach((item) => {
      item.shopCarList.forEach((shopCarItem) => {
        shopCarItem.checked = !this.checkAll();
      });
    })
    this.props.setCartList(cartList);
  }
  toSurePay() {
    let skuNos = '';
    let num = '';
    let cartList = this.props.cartList.toJS();
    cartList.forEach(item => {
      item.shopCarList.forEach(shopCarItem => {
        if (shopCarItem.checked) {
          skuNos += shopCarItem.skuId + ','
          num += shopCarItem.num + ','
        }
      })
    })
    if (num === '') {
      message.error('请选择商品', 2);
      return;
    }
    if ( this.selectedCal.goodsMoney > 2000 ) {
      message.error('保税区仓库多件商品的总价不得超过2000元，请您分多次购买!', 2);
      return;
    }
    setCookie('PALACE_ORDER_SKUNO', skuNos.substr(0, skuNos.length-1));
    setCookie('PALACE_ORDER_NUMS', num.substr(0, num.length-1));
    setCookie('PALACE_ORDER_COUPONID', "");
    setCookie('PALACE_ORDER_ADDRESS', "");
    this.props.history.push('/surePay');
  }
}
 
const mapState = (state) => ({
  cartList: state.getIn(['cart', 'cartList']),
  postpolicy: state.getIn(['cart', 'postpolicy']),
  isEdit: state.getIn(['cart', 'isEdit']),
  showDelect: state.getIn(['cart', 'showDelect']),
  delId: state.getIn(['cart', 'delId'])
})

const mapDispatch = (dispatch) => ({
  setIsActive() {
    dispatch(ActionCreator_1.SetIsActive('/cart'))
  },
  getCartList() {
    dispatch(ActionCreator.ShopCarIndexMobile())
  },
  changeEditType(isEdit) {
    dispatch(ActionCreator.ChangeEdit(isEdit))
  },
  setCartList(cartList) {
    dispatch(ActionCreator.SetCartList(cartList))
  },
  addShopCar(params) {
    dispatch(ActionCreator.AddShopCar(params))
  },
  delShopCar(params) {
    dispatch(ActionCreator.DelShopCar(params))
  },
  setShowDel(showDelect, delId) {
    dispatch(ActionCreator.SetShowDel(showDelect, delId))
  }
})

export default connect(mapState, mapDispatch)(Cart);
