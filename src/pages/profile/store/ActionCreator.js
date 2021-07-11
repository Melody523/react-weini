import * as ActionType from './ActionType';
import { fromJS } from 'immutable';
import { getNotice, myTradeCount, loginOut } from 'network/profile';
import { checkUser } from 'network/login';

const GetNoticeList = (noticeList) => ({
  type: ActionType.GET_NOTICE_LIST,
  noticeList: fromJS(noticeList)
})

export const GetNotice = () => {
  return (dispatch) => {
    getNotice().then((res) => {
      const action = GetNoticeList(res.result);
      dispatch(action);
    })
  }
}

const GetMyTradeCount = (tradeCount) => ({
  type: ActionType.GET_TRADE_COUNT,
  tradeCount: fromJS(tradeCount)
})

export const MyTradeCount = () => {
  return (dispatch) => {
    myTradeCount().then((res) => {
      const action = GetMyTradeCount(res.result);
      dispatch(action);
    })
  }
}

const Logout = () => ({
  type: ActionType.LOGOUT,
  userMessage: fromJS([])
})

export const LoginOut = () => {
  return (dispatch) => {
    loginOut().then((res) => {
      const action = Logout();
      dispatch(action);
    })
  }
}

const GetUserMessage = userMessage => ({
  type: ActionType.CHECK_USER,
  userMessage: fromJS(userMessage)
})

export const CheckUser = () => {
  return (dispatch) => {
    checkUser().then((res) => {
      const action = GetUserMessage(res.result);
      dispatch(action);
    })
  }
}
