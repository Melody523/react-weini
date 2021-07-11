import React from 'react';
import './style.less';

function OrderList(props) {
  return (
    <div className="order-list">
      <ul className="order-acount-list">
        <li className="order-acount-item">
          <p className="title">优惠券:</p>
          <p className="desc">可用<span className="num">{props.acountObj.cList.length}</span>张</p>
        </li>
        <li className="order-acount-item">
          <p className="title">商品金额(不含税):</p>
          <p className="acount">￥{props.acountObj.amountAll.toFixed(2)}</p>
        </li>
        <li className="order-acount-item">
          <p className="title">活动:</p>
          <p className="acount">-￥{props.acountObj.discount.toFixed(2)}</p>
        </li>
        <li className="order-acount-item">
          <p className="title">优惠券优惠:</p>
          <p className="acount">-￥{props.acountObj.couDiscount.toFixed(2)}</p>
        </li>
        <li className="order-acount-item">
          <p className="title">运费:</p>
          <p className="acount">￥{props.acountObj.postAge.toFixed(2)}</p>
        </li>
        <li className="order-acount-item">
          <p className="title">预计税费:</p>
          <p className="acount">￥{props.acountObj.taxAll.toFixed(2)}</p>
        </li>
        <li className="order-acount-item">
          <p className="title">应付总额:</p>
          <p className="acount">￥{props.acountObj.totalAcount.toFixed(2)}</p>
        </li>
      </ul>
    </div>
  );
}

export default OrderList;