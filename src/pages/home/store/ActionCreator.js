import * as ActionType from './ActionType';
import { fromJS } from 'immutable';
import { indexMobileTop, indexHotList } from 'network/home'

export const SetIsActive = (isActive) => ({
  type: ActionType.IS_ACTIVE,
  isActive: fromJS(isActive)
})

const GetHotList = (hotList) => ({
  type: ActionType.HOT_LIST,
  hotList: fromJS(hotList)
})

export const HotList = () => {
  return (dispatch) => {
    indexHotList().then((res) => {
      const action = GetHotList(res.result);
      dispatch(action);
    })
  }
}

const GetIndexMobileTop = (result) => ({
  type: ActionType.INDEX_MOBILE_TOP,
  bannerList: fromJS(result.banner),
  hotSearch: result.hotSearch,
  subject: fromJS(result.subject),
  newSubject: fromJS(result.newSubject)
})

export const IndexMobileTop = () => {
  return (dispatch) => {
    indexMobileTop().then((res) => {
      const action = GetIndexMobileTop(res.result);
      dispatch(action);
    })
  }
}