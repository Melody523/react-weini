import React from 'react';
import './style.less';

function CouponList(props) {
  return (
    <div className="coupon-list">
      {
        props.conpouList.length > 0 &&
          <ul className="coupon-list-content">
            {
              props.conpouList.map((item) => (
                <li className="coupon-item" key={item.couponId}>
                <img className="coupon-item-bg" src={item.status === 0 ? 'http://www.weinihaigou.com/m-images/coupon1.png' : 'http://www.weinihaigou.com/m-images/coupon2.png'} alt="" />
                <div className="coupon-item-content">
                  <div className="coupon-desc">
                    <p className="coupon-name">{item.couponName}</p>
                    <div className="use-limit">
                      <p className="amount">满{item.amount}可用</p>
                      <p className="coupon-tag">{item.couponTag}</p>
                    </div>
                  </div>
                  <div className="time">
                    <p>{item.startTime + '-' + item.endTime}</p>
                    <p>{props.conpouType(item.status)}</p>
                  </div>
                </div>
              </li>
              ))
            }
        </ul>
      }
    </div>
  );
}

export default CouponList;