import React from 'react';
import './style.less';

function PayType(props) {
  return (
    <div className="pay-type">
      <p className="title">选择支付方式</p>
      <div className="pay-type-item">
        <img className="alipay" src={require('assets/img/surePay/alipay.svg')} alt="" />
        <p className="pay-title">支付宝</p>
        <img className="selected" src={require('assets/img/cart/choose_active.svg')} alt="" />
      </div>
    </div>
  );
}

export default PayType;