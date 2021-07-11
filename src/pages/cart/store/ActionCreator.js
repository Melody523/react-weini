import * as ActionType from './ActionType';
import { fromJS } from 'immutable';
import { shopCarIndexMobile, addShopCar, delShopCar } from 'network/cart';
import { message } from 'antd';

const GetCartList = (result) => ({
  type: ActionType.GET_CART_LIST,
  cartList: fromJS(result.carList),
  postpolicy: fromJS(result.postpolicy)
})

export const ShopCarIndexMobile = () => {
  return (dispatch) => {
    shopCarIndexMobile().then((res) => {
      let carList = []
      if (res.result == null) {
        carList = []
      } else {
        res.result.carList.forEach((item) => {
          item.shopCarList.forEach((shopCarItem) => {
            let priceList = shopCarItem.priceList
            shopCarItem.taxShow = false
            shopCarItem.checked = false
            if(priceList.length > 0) {
              priceList.forEach(priceItem => {
                if (shopCarItem.num >= priceItem.intervalFirst && shopCarItem.num <= priceItem.intervalLast) {
                  shopCarItem.skuPrice = priceItem.price
                }
              })
            }
            // 正常状态并且只计算保税区且不是包邮包税的商品
            if ( shopCarItem.saleType === 0 && shopCarItem.deliveryCode === 1 ) {
              shopCarItem.goodsTax = (shopCarItem.skuPrice * shopCarItem.num * shopCarItem.tax).toFixed(2)
            } else {
              shopCarItem.goodsTax = 0.00.toFixed(2)
            }
          })
        })
        carList = res.result
      }
      const action = GetCartList(carList);
      dispatch(action);
    })
  }
}

const AddShopCart = (params) => ({
  type: ActionType.ADD_SHOP_CART,
  params: fromJS(params)
})

export const AddShopCar = (params) => {
  return (dispatch) => {
    addShopCar(params).then((res) => {
      if (res.success) {
        const action = AddShopCart(params);
        dispatch(action);
      } else {
        message.error(res.message, 2);
      }
    })
  }
}

const DelShopCart = () => ({
  type: ActionType.DEL_SHOP_CART,
  showDelect: false,
  delId: ''
})

export const DelShopCar = (params) => {
  return (dispatch) => {
    delShopCar(params).then((res) => {
      if (res.success) {
        const action = DelShopCart();
        dispatch(action);
        const action_1 = ShopCarIndexMobile();
        dispatch(action_1);
      } else {
        message.error(res.message, 2);
      }
    })
  }
}

export const ChangeEdit = (isEdit) => ({
  type: ActionType.CHANGE_EDIT,
  isEdit: isEdit
})

export const SetCartList = (cartList) => ({
  type: ActionType.SET_CART_LIST,
  cartList: fromJS(cartList)
})

export const SetShowDel = (showDelect, delId) => ({
  type: ActionType.SET_SHOW_DEL,
  showDelect: showDelect,
  delId: delId
})