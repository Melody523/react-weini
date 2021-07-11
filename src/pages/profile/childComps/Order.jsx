import React, { useState } from 'react';
import './style.less';

function Order(props) {
  const initOrderType = [
    {
      img: 'http://www.weinihaigou.com/m-images/order-1.png',
      title: '待付款',
      count: 0,
      type: 1
    },
    {
      img: 'http://www.weinihaigou.com/m-images/order-2.png',
      title: '待发货',
      count: 0,
      type: 2
    },
    {
      img: 'http://www.weinihaigou.com/m-images/order-3.png',
      title: '待收货',
      count: 0,
      type: 3
    },
    {
      img: 'http://www.weinihaigou.com/m-images/order-4.png',
      title: '已完成',
      count: 0,
      type: 4
    },
    {
      img: 'http://www.weinihaigou.com/m-images/order-5.png',
      title: '售后',
      count: 0,
      type: -1
    },
  ];
  const [orderTypeList] = useState(initOrderType);
  function showCount(index) {
    switch (index) {
      case 0:
        return props.tradeCount.notPayCount;
      case 1:
        return props.tradeCount.notSendCount;
      case 2:
        return props.tradeCount.takeCount;
      case 3:
        return props.tradeCount.finishCount;
      case 4:
        return props.tradeCount.rerurnCount;
      default:
        break;
    }
  }
  function toOrderListPage(type) {
    if (type !== -1) {
      props.toOrderListPage(type);
    }
  }
  return (
    <div className="order">
      <div className="order-header">
        <span className="my-order">我的订单</span>
        <span className="cheak-order" onClick={() => {toOrderListPage(0)}}>查看全部订单></span>
      </div>
      {
        Object.keys(props.tradeCount) !== 0 && 
        <ul className="order-list">
          {
            orderTypeList.map((item, index) => (
              <li className="order-item" key={item.img} onClick={() => {toOrderListPage(item.type)}}>
                <img className="icon" src={item.img} alt="" />
                <p className="title">{item.title}</p>
                {
                  showCount(index) > 0 && <span className="num">{showCount(index)>99?'99+':showCount(index)}</span>
                }
              </li>
            ))
          }
        </ul>
      }
    </div>
  );
}

export default Order;