import * as ActionType from './ActionType';
import { fromJS } from 'immutable';
import { themeBanner, searchGoods } from 'network/theme'

const GetThemeBanner = (themeMessage) => ({
  type: ActionType.GET_THEME_BANNER,
  themeMessage: fromJS(themeMessage)
})

export const ThemeBanner = (id) => {
  return (dispatch) => {
    themeBanner(id).then((res) => {
      const action = GetThemeBanner(res.result[0]);
      dispatch(action);
    })
  }
}

const GetSearchGoods = (result) => ({
  type: ActionType.GET_SEARCH_GOODS,
  hasNextPage: result.hasNextPage,
  goodsList: fromJS(result.list),
  pageNum: result.pageNum,
  id: result.id
})

export const SearchGoods = (id, pageNum) => {
  return (dispatch) => {
    searchGoods(id, pageNum, 20).then((res) => {
      res.result.id = id;
      const action = GetSearchGoods(res.result);
      dispatch(action);
    })
  }
}