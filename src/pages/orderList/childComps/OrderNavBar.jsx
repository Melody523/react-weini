import React from 'react';
import './style.less';

function OrderNavBar(props) {
  return (
    <div className="order-nav-bar">
      <ul className="nav-list">
        {
          props.orderNavList.map((item) => (
            <li className={item.type === props.currentOrderType ? 'nav-item active' : 'nav-item' }
              key={item.type} onClick={() => {props.changeOrderType(item.type)}}
            >{item.title}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default OrderNavBar;