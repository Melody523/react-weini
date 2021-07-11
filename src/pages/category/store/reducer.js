import { fromJS } from 'immutable';
import * as ActionType from './ActionType';

const defaultState = fromJS({
  cartCount: 0,
  categoryList: [],
  categoryTwoList: [],
  currentId: 1
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ID:
      return state.set('currentId', action.currentId);
    case ActionType.CATEGORY_LIST:
      return state.set('categoryList', action.categoryList);
    case ActionType.CATEGORY_TWO_LIST:
      return state.set('categoryTwoList', action.categoryTwoList);
    case ActionType.CAR_COUNT:
      return state.set('cartCount', action.cartCount);
    default:
      return state;
  }
}