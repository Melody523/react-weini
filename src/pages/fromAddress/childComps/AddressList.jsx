import React from 'react';
import './style.less';

function AddressList(props) {
  return (
    <div className="address-list-container">
      <ul className="address-list">
        {
          props.addressList.map((item) => (
            <li className="address-item" key={item.addr_id}>
              <p className="person-message">
                <span className="person-name">{item.person_name}</span>
                <span className="serv-num">{item.serv_num}</span>
              </p>
              <p className="address-detail">
                <img className="icon" src={require('assets/img/surePay/location.svg')} alt="" />
                <span className="address">{item.area_name}{item.address}</span>
              </p>
              <div className="control">
                <div className="control-left">
                  <img className="selected" src={item.flag === '1' ? require('assets/img/cart/choose_active.svg') : require('assets/img/cart/choose.svg')}  alt="" />
                  <span className="title">默认地址</span>
                </div>
                <div className="control-right">
                  <p className="modify">编辑</p>
                  <p className="delete">删除</p>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
      <div className="add-address-btn" onClick={() => {props.toAddAddresspage()}}>
        添加新地址
      </div>
    </div>
  );
}

export default AddressList;