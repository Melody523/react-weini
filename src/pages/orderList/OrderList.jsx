import React, { PureComponent } from 'react';
import './OrderList.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';
import Delect from 'components/content/delect/Delect';
import PageEnd from 'components/content/pageEnd/PageEnd';
import Scroll from 'components/common/scroll/Scroll';

import OrderNavBar from './childComps/OrderNavBar';
import OrderListContent from './childComps/OrderListContent';

import { orderMo, updateTrade, updateStatus, delTrade, toPay } from 'network/order';

import { message } from 'antd';

class OrderList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentOrderType: null,
      orderList: [],
      orderNavList: [
        {
          type: 0,
          title: '全部'
        },
        {
          type: 1,
          title: '待付款'
        },
        {
          type: 2,
          title: '待发货'
        },
        {
          type: 3,
          title: '待收货'
        },
        {
          type: 4,
          title: '已完成'
        }
      ],
      isDelete: false,
      delTradeId: null
    }
  }
  componentDidMount() {
    let type = parseInt(this.props.match.params.type);
    this.getOrderList(type);
    this.setState({
      currentOrderType: type
    });
  }
  render() {
    const { currentOrderType, orderList, orderNavList, isDelete } = this.state;
    return (
      <div className="order-list">
        <MainNavBar title="我的订单" goBack={() => {this.goBack()}} />
        <OrderNavBar orderNavList={orderNavList} currentOrderType={currentOrderType} changeOrderType={(type) => {this.changeOrderType(type)}} />
        <Scroll classContent="order-content" probeType={3}>
          <OrderListContent 
            orderList={orderList} 
            showDelete={(tradeId) => {this.showDelete(tradeId)}} 
            cancelOrder={(tradeNo) => {this.cancelOrder(tradeNo)}} 
            confirmOrder={(tradeNo) => {this.confirmOrder(tradeNo)}} 
            toOrderDetailPage={(tradeNo) => {this.toOrderDetailPage(tradeNo)}}
            goToPay={(tradeNo, payStatus) => {this.goToPay(tradeNo, payStatus)}}
          />
          <PageEnd />
        </Scroll>
        {
          isDelete &&
          <Delect 
            content={
              <div className="delect-header">确定要删除吗？</div>
            } 
            cancelDel={() => {this.cancelDel()}} 
            confirmDel={() => {this.confirmDel()}}
          >
          </Delect>
        }
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getOrderList(type) {
    orderMo(type).then(res => {
      this.setState({
        orderList: res.result
      });
    });
  }
  changeOrderType(type) {
    this.setState({
      currentOrderType: type
    });
    this.getOrderList(type);
  }
  showDelete(tradeId) {
    this.setState({
      isDelete: true,
      delTradeId: tradeId
    });
  }
  cancelDel() {
    this.setState({
      isDelete: false
    });
  }
  confirmDel() {
    delTrade({tradeIds: this.state.delTradeId}).then(res => {
      if ( res.success ) {
        this.getOrderList(this.state.currentOrderType);
        this.setState({
          isDelete: false
        });
      } else {
        message.error(res.message, 2);
      }
    })
  }
  cancelOrder(tradeNo) {
    updateTrade({tradeNo: tradeNo}).then(res => {
      if ( res.success ) {
        this.getOrderList(this.state.currentOrderType);
        message.success('订单取消成功', 2);
      } else {
        message.error('订单取消失败', 2);
      }
    })
  }
  confirmOrder(tradeId) {
    updateStatus({tradeId: tradeId}).then(res => {
      if ( res.success ) {
        this.getOrderList(this.state.currentOrderType);
        message.success('确认收货成功', 2);
      } else {
        message.error('确认收货失败', 2);
      }
    })
  }
  toOrderDetailPage(tradeNo) {
    this.props.history.push('/orderDetail/' + tradeNo);
  }
  goToPay(tradeNo) {
    let payStatus = 4 //选择支付宝付款
    toPay({tradeNo: tradeNo, payStatus: payStatus}).then(res => {
      console.log(res);
      if(res.success){
        window.location.href = res.result;
      } else{
        message.error(res.msg, 2);
      }
    });
  }
}

export default OrderList;
