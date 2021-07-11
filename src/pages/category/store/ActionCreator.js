import * as ActionType from './ActionType';
import { fromJS } from 'immutable';
import { getCategory, getCategoryTwo } from 'network/category'
import { carCount } from 'network/goods';

export const ChangeId = (currentId) => ({
  type: ActionType.CHANGE_ID,
  currentId: currentId
})

const GetCategoryList = (categoryList) => ({
  type: ActionType.CATEGORY_LIST,
  categoryList: fromJS(categoryList)
})

export const GetCategory = () => {
  return (dispatch) => {
    getCategory().then((res) => {
      const action = GetCategoryList(res.result);
      dispatch(action);
    })
  }
}

const GetCategoryTwoList = (categoryTwoList) => ({
  type: ActionType.CATEGORY_TWO_LIST,
  categoryTwoList: fromJS(categoryTwoList)
})

export const GetCategoryTwo = (classId) => {
  return (dispatch) => {
    getCategoryTwo(classId).then((res) => {
      const action = GetCategoryTwoList(res.result.classTwoList);
      dispatch(action);
    })
  }
}

const GetCarCount = (cartCount) => ({
  type: ActionType.CAR_COUNT,
  cartCount: cartCount
})

export const CarCount = () => {
  return (dispatch) => {
    carCount().then((res) => {
      const action = GetCarCount(res.result);
      dispatch(action);
    })
  }
}
