import React from 'react';
import './style.less';

function CouponTabBar(props) {
  return (
    <div className="coupon-tab-bar">
      <ul className="nav-list">
        {
          props.conpouTypeList.map((item) => (
            <li className={item.status === props.currentType ? 'nav-item active' : 'nav-item'}
              key={item.status}
              onClick={() => {props.changeCouponType(item.status)}}
            >{item.title}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default CouponTabBar;