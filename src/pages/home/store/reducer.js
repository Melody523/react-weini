import { fromJS } from 'immutable';
import * as ActionType from './ActionType';

const defaultState = fromJS({
  bannerList: [],
  hotSearch: '',
  subject: [],
  newSubject: [],
  hotList: [],
  isActive: '/'
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.IS_ACTIVE:
      return state.set('isActive', action.isActive);  
    case ActionType.HOT_LIST:
      return state.set('hotList', action.hotList);
    case ActionType.INDEX_MOBILE_TOP:
      return state.merge({
        bannerList: action.bannerList,
        hotSearch: action.hotSearch,
        subject: action.subject,
        newSubject: action.newSubject
      });
    default:
      return state;
  }
}