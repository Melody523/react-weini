import * as ActionType from './ActionType';
import { fromJS } from 'immutable';
import { getDetailMo, addShopCar, carCount, insertCollect, delCollectByGoodsId, addNotify } from 'network/goods';
import { checkUser } from 'network/login';
import { message } from 'antd';

const GetGoodsDetail = (result) => ({
  type: ActionType.GOODS_DETAIL,
  goodsBannerList: fromJS(result.imgList.filter(item => item.type === 1)),
  goodsDetailPrice: fromJS({
    goodsName: result.goods.goodsName,
    minPrice: result.goods.minPrice,
    maxPrice: result.goods.maxPrice,
    marketPrice: result.goods.marketPrice,
    goodsCountry: result.goods.goodsCountry
  }),
  goodsDetailList: fromJS(result.imgList.filter(item => item.type === 2)),
  goodsBrand: fromJS(result.goods.goodsBrand),
  skuList: fromJS(result.goods.skuList),
  totalStock: result.goods.realStock,
  goodsImg: result.goods.imgUrl,
  ifCollect:  result.ifCollect,
  goodsId: result.goods.goodsId
})

export const GetDetailMo = (goodsNo) => {
  return (dispatch) => {
    getDetailMo(goodsNo).then((res) => {
      const action = GetGoodsDetail(res.result);
      dispatch(action);
    })
  }
}

const GetCartCount = (result) => ({
  type: ActionType.CART_COUNT,
  cartCount: result
})

export const GetCarCount = () => {
  return (dispatch) => {
    carCount().then((res) => {
      const action = GetCartCount(res.result);
      dispatch(action);
    })
  }
}

const AddShopCart = () => ({
  type: ActionType.ADD_CART,
  isShowAdd: false
})

export const AddShopCar = (params) => {
  return (dispatch) => {
    addShopCar(params).then((res) => {
      if (res.success) {
        const action = AddShopCart();
        dispatch(action);
        const action_1 = GetCarCount();
        dispatch(action_1);
      } else {
        message.error(res.message, 2);
      }
    })
  }
}

const GetUserMessage = userMessage => ({
  type: ActionType.CHECK_USER,
  userMessage: fromJS(userMessage)
})

export const CheckUser = () => {
  return (dispatch) => {
    checkUser().then((res) => {
      const action = GetUserMessage(res.result);
      dispatch(action);
    })
  }
}

const DelCollect = () => ({
  type: ActionType.DEL_COLLECT,
  ifCollect: false
})

export const DelCollectByGoodsId = (goodsId) => {
  return (dispatch) => {
    delCollectByGoodsId(goodsId).then((res) => {
      if (res.success) {
        const action = DelCollect();
        dispatch(action);
        message.success('取消收藏成功', 2);
      } else {
        message.error(res.message, 2);
      }
      
    })
  }
}

const InsertCollect = () => ({
  type: ActionType.INSERT_COLLECT,
  ifCollect: true
})

export const InsertCollectByGoodsId = (goodsId) => {
  return (dispatch) => {
    insertCollect(goodsId).then((res) => {
      if (res.success) {
        const action = InsertCollect();
        dispatch(action);
        message.success('收藏成功', 2);
      } else {
        message.error(res.message, 2);
      }
      
    })
  }
}

const AddNotifyByPhone = () => ({
  type: ActionType.ADD_NOTIFY,
  showRemind: false
})

export const AddNotify = (params) => {
  return (dispatch) => {
    addNotify(params).then((res) => {
      if (res.success) {
        const action = AddNotifyByPhone();
        dispatch(action);
        message.success(res.message, 2);
      } else {
        message.error(res.message, 2);
      }
    })
  }
}

export const SetGoodsNo = (goodsNo) => ({
  type: ActionType.SET_GOODS_NO,
  goodsNo: goodsNo
})

export const ChangeIsShowInstruction = (isShowInstruction) => ({
  type: ActionType.CHANGE_INSTRUCTION,
  isShowInstruction: isShowInstruction
})

export const ChangeIsShowCity = (isShowCity) => ({
  type: ActionType.CHANGE_SHOW_CITY,
  isShowCity: isShowCity
})

export const ChangeCity = (chooseProvince, chooseCity, isShowCity) => ({
  type: ActionType.CHANGE_CITY,
  chooseProvince: chooseProvince,
  chooseCity: chooseCity,
  isShowCity: isShowCity
})

export const ChangeSku = (totalStock, goodsImg) => ({
  type: ActionType.CHANGE_SKU,
  totalStock: totalStock,
  goodsImg: goodsImg
})

export const ChangeShowAdd = (isShowAdd) => ({
  type: ActionType.CHANGE_SHOW_ADD,
  isShowAdd: isShowAdd
})

export const ChangeShowRemind = (showRemind) => ({
  type: ActionType.CHANGE_SHOW_REMIND,
  showRemind: showRemind
})

// const ChangeCity = (result) => ({
//   type: ActionType.POST_RULE,
//   cartCount: result
// })

// export const GetPostRule = (params) => {
//   return (dispatch) => {
//     getPostRule(params).then((res) => {
//       const action = ChangeCity(res.result);
//       dispatch(action);
//     })
//   }
// }
