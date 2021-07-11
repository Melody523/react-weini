import * as ActionType from './ActionType';
import { fromJS } from 'immutable';
import { searchGoodsList, getSolrGroup } from 'network/theme';

export const SetTitle = (title) => ({
  type: ActionType.SET_TITLE,
  title: title
})

export const SetSortData = (sortData) => ({
  type: ActionType.SET_SORT_DATA,
  sortData: fromJS(sortData)
})

export const SetShowSearch = (showSearch) => ({
  type: ActionType.SET_SHOW_SEARCH,
  showSearch: showSearch
})

export const SetCurrentSort = (currentSort) => ({
  type: ActionType.SET_CURRENT_SORT,
  currentSort: currentSort
})

export const SetSortList = (sortList) => ({
  type: ActionType.SET_SORT_LIST,
  sortList: fromJS(sortList)
})

export const SetGoodsList = (goodsList) => ({
  type: ActionType.SET_GOODS_LIST,
  goodsList: fromJS(goodsList)
})

export const SetIsShow = (isShow) => ({
  type: ActionType.SET_IS_SHOW,
  isShow: isShow
})

const GetGoodsList = (result, flag) => ({
  type: ActionType.GOODS_LIST,
  hasNextPage: result.hasNextPage,
  goodsList: fromJS(result.list),
  flag: flag
})

export const SearchGoodsList = (params, flag) => {
  return (dispatch) => {
    searchGoodsList(params).then((res) => {
      const action = GetGoodsList(res.result, flag);
      dispatch(action);
    })
  }
}

const GetSolrGroupList = (result) => ({
  type: ActionType.GROUP_LIST,
  brandList: fromJS(result.groupList1),
  countryList: fromJS(result.groupList2),
  typeList: fromJS(result.groupList3)
})

export const GetSolrGroup = (params) => {
  return (dispatch) => {
    getSolrGroup(params).then((res) => {
      const action = GetSolrGroupList(res.result);
      dispatch(action);
    })
  }
}