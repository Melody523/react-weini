import React from 'react';
import './style.less';

function SurePayBottom(props) {
  return (
    <div className="sure-pay-bottom">
      <div className="title">共计:<span className="total-acount">￥{props.amountAll.toFixed(2)}</span></div>
      <div className="pay-btn">确认并付款</div>
    </div>
  );
}

export default SurePayBottom;