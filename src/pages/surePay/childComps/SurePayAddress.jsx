import React from 'react';
import './style.less';

function SurePayAddress(props) {
  return (
    <div className="sure-pay-address"  onClick={() => {props.toFromAddressPage()}}>
      <div className="address-left">
        {
          props.addrList.length > 0 && 
          <>
            <p className="person-mesage">{props.addrList[0].person_name}  {props.addrList[0].serv_num}</p>
            <div className="address-content">
              <p className="address-detail">
                <img className="icon" src={require('assets/img/surePay/location.svg')} alt="" />
                {props.addrList[0].area_name}{props.addrList[0].address}
              </p>
            </div>
          </>
        }
      </div>
      <img className="address-right" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="" />
    </div>
  );
}

export default SurePayAddress;