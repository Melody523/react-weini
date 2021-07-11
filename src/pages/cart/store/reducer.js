import { fromJS } from 'immutable';
import * as ActionType from './ActionType';

const defaultState = fromJS({
  cartList: [],
  postpolicy: {},
  isEdit: false,
  showDelect: false,
  delId: ''
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.GET_CART_LIST:
      return state.merge({
        cartList: action.cartList,
        postpolicy: action.postpolicy
      });
    case ActionType.ADD_SHOP_CART:
      let newState = JSON.parse(JSON.stringify(state.toJS()));
      newState.cartList.forEach(item => {
        item.shopCarList.forEach(shopCarItem => {
          if(action.params.toJS().goodsId === shopCarItem.goodsId && action.params.toJS().skuId === shopCarItem.skuId) {
            shopCarItem.num = action.params.toJS().num + shopCarItem.num
          }
        })
      })
      return state.set('cartList', fromJS(newState.cartList));
    case ActionType.DEL_SHOP_CART:
      return state.merge({
        showDelect: action.showDelect,
        delId: action.delId
      });
    case ActionType.CHANGE_EDIT:
      return state.set('isEdit', action.isEdit);
    case ActionType.SET_CART_LIST:
      return state.set('cartList', action.cartList);
    case ActionType.SET_SHOW_DEL:
      return state.merge({
        showDelect: action.showDelect,
        delId: action.delId
      });
    default:
      return state;
  }
}