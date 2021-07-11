import * as ActionType from './ActionType';
import { fromJS } from 'immutable';
import { queryCountryList } from "network/country"

const GetCountryList = (countryList) => ({
  type: ActionType.COUNTRY_LIST,
  countryList: fromJS(countryList)
})

export const QueryCountryList = () => {
  return (dispatch) => {
    queryCountryList().then((res) => {
      const action = GetCountryList(res.result);
      dispatch(action);
    })
  }
}