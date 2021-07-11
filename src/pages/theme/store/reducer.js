import { fromJS } from 'immutable';
import * as ActionType from './ActionType';

const defaultState = fromJS({
  id: null,
  themeMessage: {},
  goodsList: [],
  pageNum: 1,
  hasNextPage: null
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.GET_THEME_BANNER:
      return state.set('themeMessage', action.themeMessage);  
    case ActionType.GET_SEARCH_GOODS:
      let newState = JSON.parse(JSON.stringify(state.toJS()));
      if (action.id === newState.id || newState.id === null) {
        newState.goodsList.push(...action.goodsList.toJS());
      } else {
        newState.goodsList = [];
        newState.goodsList.push(...action.goodsList.toJS());
      }
      return state.merge({
        hasNextPage: action.hasNextPage,
        goodsList: fromJS(newState.goodsList),
        pageNum: action.pageNum + 1,
        id: action.id
      });
    default:
      return state;
  }
}