import { fromJS } from 'immutable';
import * as ActionType from './ActionType';

const defaultState = fromJS({
  userMessage: {},
  isLogin: false
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return state.merge({
        userMessage: action.userMessage,
        isLogin: action.isLogin
      });
    default:
      return state;
  }
}
