import { fromJS } from 'immutable';
import * as ActionType from './ActionType';

const defaultState = fromJS({
  brandMap: [],
  hotBrandList: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.BRAND_LIST:
      return state.merge({
        brandMap: action.brandMap,
        hotBrandList: action.hotBrandList
      });
    default:
      return state;
  }
}