import { fromJS } from 'immutable';
import * as ActionType from './ActionType';

const defaultState = fromJS({
  countryList: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.COUNTRY_LIST:
      return state.set('countryList', action.countryList);
    default:
      return state;
  }
}