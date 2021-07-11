import React from 'react';
import './style.less';

function TotalCount(props) {
  function clickAllCheck() {
    props.clickAllCheck()
  }
  return (
    <div className="total-count">
      <div className="all-check">
        <img className="checkbox" src={props.checkAll?require('assets/img/cart/choose_active.svg'):require('assets/img/cart/choose.svg')} alt="" />
        <span className="title" onClick={clickAllCheck}>全选</span>
      </div>
      <div className="total-content">
        <p><span className="title_1">合计<span className="title_2">(含税)</span>:</span><span className="price">￥{(props.selectedCal.taxMoney + props.selectedCal.goodsMoney).toFixed(2)}</span></p>
        <p className="title_2"><span>运费:￥{props.selectedFreightMoney}</span><span>预计税费:￥{props.selectedCal.taxMoney}</span></p>
      </div>
      <div className="pay-btn" onClick={() => {props.toSurePay()}}>去结算</div>
    </div>
  );
}

export default TotalCount;