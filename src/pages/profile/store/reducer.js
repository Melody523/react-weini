import { fromJS } from 'immutable';
import * as ActionType from './ActionType';

const defaultState = fromJS({
  noticeList: [],
  tradeCount: {},
  userMessage: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.GET_NOTICE_LIST:
      return state.set('noticeList', action.noticeList);
    case ActionType.GET_TRADE_COUNT:
      return state.set('tradeCount', action.tradeCount);
    case ActionType.LOGOUT:
      return state.set('userMessage', action.userMessage);  
    case ActionType.CHECK_USER:
      return state.set('userMessage', action.userMessage);  
    default:
      return state;
  }
}