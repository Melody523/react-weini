import * as ActionType from './ActionType';
import { fromJS } from 'immutable';
import { queryBrandList } from "network/brand";

const GetBrandList = (result) => ({
  type: ActionType.BRAND_LIST,
  brandMap: fromJS(result.brandMap),
  hotBrandList: fromJS(result.hotBrandList)
})

export const QueryBrandList = () => {
  return (dispatch) => {
    queryBrandList().then((res) => {
      const action = GetBrandList(res.result);
      dispatch(action);
    })
  }
}