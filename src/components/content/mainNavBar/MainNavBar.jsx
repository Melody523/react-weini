import React from 'react';
import NavBar from 'components/common/navBar/NavBar';
import './style.less';

function MainNavBar(props) {
  return (
    <div className="main-nav-bar">
      <NavBar
        left={
          <div className="left" >
            <img className="back-icon" onClick={() => {props.goBack()}} src={require("assets/img/common/left.svg")} alt=""/>
          </div>
        }
        center={
          <div className="title">
            {props.title}
          </div>
        }
      > 
      </NavBar>
    </div>
  );
}

export default MainNavBar;