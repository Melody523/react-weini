import { fromJS } from 'immutable';
import * as ActionType from './ActionType';

const defaultState = fromJS({
  title: null,
  goodsList: [],
  sortData: {
    brandId: '',
    pageNum: 1,
    pageSize: 20,
    sort: '',
    order: null
  },
  hasNextPage: true,
  brandList: [],
  countryList: [],
  typeList: [],
  isShow: false,
  hasData: true,
  showSearch: false,
  sortList: [
    {
      sort: 'xl',
      order: 2,
      title: '销量',
      icon: false,
      top: false,
      bottom: false
    },
    {
      sort: 'sj',
      order: 1,
      title: '价格',
      icon: true,
      top: false,
      bottom: false
    },
    {
      sort: 'kcl',
      order: 1,
      title: '库存量',
      icon: true,
      top: false,
      bottom: false
    },
    {
      sort: 'sjsj',
      order: 1,
      title: '上架时间',
      icon: true,
      top: false,
      bottom: false
    },
    {
      sort: 'sx',
      order: 2,
      title: '筛选',
      icon: false,
      top: false,
      bottom: false
    }
  ],
  currentSort: -1,
  priceList: [
    {
      id: '0-99',
      name: '0-99',
    },
    {
      id: '100-199',
      name: '100-199'
    },
    {
      id: '200-299',
      name: '200-299'
    }
  ],
  stockList: [
    {
      id: '0-99',
      name: '0-99',
    },
    {
      id: '100-499',
      name: '100-499'
    },
    {
      id: '500-',
      name: '500以上'
    }
  ],
  deliverList: [
    {
      id: 1,
      name: '保税区邮'
    },
    {
      id: 2,
      name: '香港直邮'
    },
    {
      id: 4,
      name: '海外直邮'
    },
    {
      id: 5,
      name: '国内发货'
    }
  ]
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.GOODS_LIST:
      let newState = JSON.parse(JSON.stringify(state.toJS()));
      newState.sortData.pageNum = newState.sortData.pageNum + 1
      if (action.flag) {
        return state.merge({
          hasNextPage: action.hasNextPage,
          goodsList: action.goodsList,
          sortData: fromJS(newState.sortData)
        });
      } else {
        newState.goodsList.push(...action.goodsList.toJS());
        return state.merge({
          hasNextPage: action.hasNextPage,
          goodsList: fromJS(newState.goodsList),
          sortData: fromJS(newState.sortData)
        });
      }
    case ActionType.GROUP_LIST:
      return state.merge({
        brandList: action.brandList,
        countryList: action.countryList,
        typeList: action.typeList
      });
    case ActionType.SET_TITLE:
      return state.set('title', action.title);
    case ActionType.SET_SORT_DATA:
      return state.set('sortData', action.sortData);
    case ActionType.SET_SHOW_SEARCH:
      return state.set('showSearch', action.showSearch);
    case ActionType.SET_CURRENT_SORT:
      return state.set('currentSort', action.currentSort);
    case ActionType.SET_SORT_LIST:
      return state.set('sortList', action.sortList);
    case ActionType.SET_GOODS_LIST:
      return state.set('goodsList', action.goodsList);
    case ActionType.SET_IS_SHOW:
      return state.set('isShow', action.isShow);  
    default:
      return state;
  }
}