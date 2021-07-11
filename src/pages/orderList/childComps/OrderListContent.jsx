import React from 'react';
import './style.less';
import filterEndTime from '@/utils/filterTime';

function OrderListContent(props) {
  function tradeType(value) {
    switch (value) {
      case '0':
        return '交易关闭';
      case '1':
        return '等待付款';
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
  function numTotal(goodsList) {
    return goodsList.reduce((prev, item) => {
      return prev + item.sellCount
    }, 0);
  }
  return (
    <div className="order-list-content">
      {
        props.orderList.length > 0 &&
        <ul className="order-list">
          {
            props.orderList.map((item) => (
              <li className="order-item" key={item.tradeId}>
                <div className="order-item-header">
                  <p className="trade-no">订单编号:{item.tradeNo}</p>
                  <p className="trade-type">{tradeType(item.tradeStatus)} {(item.tradeStatus==='1'||item.tradeStatus==='11'||item.tradeStatus==='0') && <img className="icon" onClick={() => {props.showDelete(item.tradeId)}} src={require('assets/img/cart/delect.svg')} alt="" /> }</p>
                </div>
                {
                   item.orderGoods.map((goodsItem) => (
                    <div className="order-item-content" key={goodsItem.goodsId} onClick={() => {props.toOrderDetailPage(item.tradeNo)}}>
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
                <div className="order-item-bottom">
                  <p className="end-time">{filterEndTime(new Date(item.endTime), 'YYYY-MM-dd')}</p>
                  <p className="total">
                    <span className="num-total">共{numTotal(item.orderGoods)}件</span>
                    <span className="rcv-total">应付总额:<span className="price-total">￥{item.rcvTotal.toFixed(2)}</span></span>
                  </p>
                </div>
                {
                  parseInt(item.tradeStatus) === 1 &&
                  <div className="control-btn">
                    <div className="btn cancel-btn" onClick={() => {props.cancelOrder(item.tradeNo)}}>取消订单</div>
                    <div className="btn pay-btn" onClick={() => {props.goToPay(item.tradeNo)}}>去付款</div>
                  </div>
                }
                {
                  parseInt(item.tradeStatus) === 7 && 
                  <div className="control-btn">
                    <div className="btn check-btn">查看物流</div>
                    <div className="btn confirm-btn" onClick={() => {props.confirmOrder(item.tradeId)}}>确认收货</div>
                  </div>
                }
                {
                  parseInt(item.tradeStatus) === 11 && 
                  <div className="control-btn">
                    <div className="btn check-btn">查看物流</div>
                  </div>
                }
              </li>
            ))
          }
        </ul>
      }
      {
        props.orderList.length <= 0 &&
        <img className="no-img" src="http://www.weinihaigou.com/m-images/no-order.png" alt="" />
      }
  </div>
  );
}

export default OrderListContent;