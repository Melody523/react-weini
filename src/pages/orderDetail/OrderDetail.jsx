import React, { PureComponent } from 'react';
import './OrderDetail.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';
import Delect from 'components/content/delect/Delect';
import Scroll from 'components/common/scroll/Scroll';

import { tradeMoDetail, updateTrade, updateStatus, delTrade, toPay } from 'network/order';

import { message } from 'antd';

class OrderDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tradeNo: null,
      orderDetail: {},
      isDelete: false,
      delTradeId: null
    }
  }
  componentDidMount() {
    let tradeNo = this.props.match.params.tradeNo;
    this.getTradeMoDetail(tradeNo);
    this.setState({
      tradeNo: tradeNo
    });
  }
  render() {
    const { orderDetail, isDelete } = this.state;
    return (
      <div className="order-detail">
        <MainNavBar title="订单详情" goBack={() => {this.goBack()}} />
        <Scroll classContent={orderDetail.tradeStatus === '1' ? 'change-bottom order-detail-content' : 'order-detail-content'}>
          <div className={orderDetail.tradeStatus === '1' ? 'order-detail-header continue-pay' : 'order-detail-header'}>
            <div className="trade-type">{this.tradeType(orderDetail.tradeStatus)}</div>
            <img className="icon" src="http://www.weinihaigou.com/m-images/continue-pay.png" alt="" />
          </div>
          <div className="remark">
            <p>买家留言{orderDetail.remark}</p>
          </div>
          <div className="address-box">
            <p className="address-user">
              <span>{orderDetail.sndTo}</span><span>{orderDetail.tel}</span>
            </p>
            <p>
              <img className="icon" src={require('assets/img/surePay/location.svg')} alt="" />
              <span>{orderDetail.province + orderDetail.city + '  ' + orderDetail.town + orderDetail.adr}</span>
            </p>
          </div>
          <div className="trade-no">
            <p>订单编号:{orderDetail.tradeNo}</p>
            <p>支付时间:{orderDetail.payerTime}</p>
          </div>
          {
            orderDetail.orderGoods !== undefined &&
            orderDetail.orderGoods.map((goodsItem) => (
              <div className="order-item-content" key={goodsItem.goodsId}>
                <img className="goods-img" src={goodsItem.goodsImgUrl} alt="" />
                <div className="goods-desc">
                  <p className="title text-overflow2">{goodsItem.tradeName}</p>
                  <p className="unit">规格:{goodsItem.unit}</p>
                </div>
                <div className="price">
                  <p className="sell-price">￥{goodsItem.sellPrice.toFixed(2)}</p>
                  <p className="sell-count">×{goodsItem.sellCount}</p>
                </div>
              </div>
            ))
          }
          {
            orderDetail.costTotal &&
            <div className="order-list-desc">
              <ul className="order-acount-list">
                <li className="order-acount-item">
                  <p className="title">商品金额(不含税):</p>
                  <p className="acount">￥{orderDetail.costTotal.toFixed(2)}</p>
                </li>
                <li className="order-acount-item">
                  <p className="title">活动:</p>
                  <p className="acount">-￥{orderDetail.activeAmount.toFixed(2)}</p>
                </li>
                <li className="order-acount-item">
                  <p className="title">优惠券优惠:</p>
                  <p className="acount">-￥{orderDetail.couponAmount.toFixed(2)}</p>
                </li>
                <li className="order-acount-item">
                  <p className="title">运费:</p>
                  <p className="acount">￥{orderDetail.postageTotal.toFixed(2)}</p>
                </li>
                <li className="order-acount-item">
                  <p className="title">预计税费:</p>
                  <p className="acount">￥{orderDetail.postalTax.toFixed(2)}</p>
                </li>
                <li className="order-acount-item">
                  <p className="title">应付总额:</p>
                  <p className="acount">￥{orderDetail.rcvTotal.toFixed(2)}</p>
                </li>
              </ul>
            </div>
          }
          {
            orderDetail.tradeStatus === '1' &&
            <div className="pay-type">
              <p className="title">选择支付方式</p>
              <div className="pay-type-item">
                <img className="alipay" src={require('assets/img/surePay/alipay.svg')} alt="" />
                <p className="pay-title">支付宝</p>
                <img className="selected" src={require('assets/img/cart/choose_active.svg')} alt="" />
              </div>
            </div>
          }
        </Scroll>
        {
          orderDetail.tradeStatus === '1' &&
          <div className="control-btn">
            <div className="custom-service">
              <img className="icon" src="http://www.weinihaigou.com/m-images/goods-custom.png" alt="" />
            </div>
            <div className="cancel-btn" onClick={() => {this.cancelOrder(orderDetail.tradeNo)}}>取消订单</div>
            <div className="pay-btn" onClick={() => {this.goToPay(orderDetail.tradeNo)}}>继续支付</div>
          </div>
        }
        {
          isDelete && 
          <Delect content={<div className="delect-header">确定要删除吗？</div>} cancelDel={() => {this.cancelDel()}} confirmDel={() => {this.confirmDel()}}>
          </Delect>
        }
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  tradeType(value) {
    switch (value) {
      case '0':
        return '交易关闭';
      case '1':
        return '订单已提交成功，等待买家付款将在24小时后自动关闭该订单';
      case '2' || '5':
        return '待发货';
      case '7':
        return '已发货';
      case '11':
        return '交易成功';
      default:
        break;
    }
  }
  getTradeMoDetail(tradeNo) {
    tradeMoDetail({tradeNo:　tradeNo}).then(res => {
      console.log(res);
      this.setState({
        orderDetail: res.result.orderTrade
      });
    })
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
      if (res.success) {
        this.getTradeMoDetail(this.state.tradeNo);
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
      if (res.success) {
        this.getTradeMoDetail(this.state.tradeNo);
        message.success('订单取消成功', 2);
      } else {
        message.error('订单取消失败', 2);
      }
    })
  }
  confirmOrder(tradeId) {
    updateStatus({tradeId: tradeId}).then(res => {
      if (res.success) {
        this.getTradeMoDetail(this.state.tradeNo);
        message.success('确认收货成功', 2);
      } else {
        message.error('确认收货失败', 2);
      }
    })
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
    })
  }
}

export default OrderDetail;
