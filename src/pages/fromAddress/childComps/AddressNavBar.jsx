import React from 'react';
import './style.less';
import NavBar from 'components/common/navBar/NavBar';

function AddressNavBar(props) {
  return (
    <div className="main-nav-bar">
      <NavBar
        left={
          <div className="left" onClick={() => {props.goBack()}}>
            <img className="back-icon" src={require('assets/img/common/left.svg')} alt="" />
          </div>
        }
        center={
          <div className="title">
            {props.title}
          </div>
        }
        right={
          <div className="add-address-btn" onClick={() => {props.clickControl()}}>
            {props.control}
          </div>
        }
      >
      </NavBar>
    </div>
  );
}

export default AddressNavBar;