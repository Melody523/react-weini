import { fromJS } from 'immutable';
import * as ActionType from './ActionType';

const defaultState = fromJS({
  goodsNo: null,
  goodsBannerList: [],
  goodsDetailPrice: {},
  skuList: [],
  totalStock: 1,
  goodsImg: '',
  isShowInstruction: false,
  goodsBrand: {},
  goodsDetailList: [],
  isShowCity: false,
  chooseProvince: '广东省',
  chooseCity: '广州市',
  isShowAdd: false,
  cartCount: 0,
  ifCollect: false,
  goodsId: null,
  showRemind: false,
  userMessage: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.GOODS_DETAIL:
      return state.merge({
        goodsBannerList: action.goodsBannerList,
        goodsDetailPrice: action.goodsDetailPrice,
        goodsDetailList: action.goodsDetailList,
        goodsBrand: action.goodsBrand,
        skuList: action.skuList,
        totalStock: action.totalStock,
        goodsImg: action.goodsImg,
        ifCollect: action.ifCollect,
        goodsId: action.goodsId
      });
    case ActionType.CART_COUNT:
      return state.set('cartCount', action.cartCount);
    case ActionType.ADD_CART:
      return state.set('isShowAdd', action.isShowAdd);
    case ActionType.DEL_COLLECT:
      return state.set('ifCollect', action.ifCollect);
    case ActionType.INSERT_COLLECT:
      return state.set('ifCollect', action.ifCollect);
    case ActionType.ADD_NOTIFY:
      return state.set('showRemind', action.showRemind);
    case ActionType.SET_GOODS_NO:
      return state.set('goodsNo', action.goodsNo);
    case ActionType.CHANGE_INSTRUCTION:
      return state.set('isShowInstruction', action.isShowInstruction);
    case ActionType.CHANGE_SHOW_CITY:
      return state.set('isShowCity', action.isShowCity);
    case ActionType.CHANGE_CITY:
      return state.merge({
        chooseProvince: action.chooseProvince,
        chooseCity: action.chooseCity,
        isShowCity: action.isShowCity,
      });
    case ActionType.CHANGE_SKU:
      return state.merge({
        totalStock: action.totalStock,
        goodsImg: action.goodsImg
      });
    case ActionType.CHANGE_SHOW_ADD:
      return state.set('isShowAdd', action.isShowAdd);
    case ActionType.CHANGE_SHOW_REMIND:
      return state.set('showRemind', action.showRemind);
    case ActionType.CHECK_USER:
      return state.set('userMessage', action.userMessage);
    default:
      return state;
  }
}