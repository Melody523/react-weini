import React from 'react';
import NavBar from 'components/common/navBar/NavBar';
import './HomeNavBar.less'

function HomeNavBar(props) {
  return (
    <div className="home-nav-bar">
      <NavBar 
        center={
          <div className="center" onClick={() => {props.toSearchPage()}}>
            <img className="search-icon" src={require('assets/img/common/search.svg')} alt="" />
            <input className="search-input" type="text" placeholder={props.hotSearch} disabled />
          </div>
        }
        right={
          <div className="right">
            <img className="message-icon" onClick={() => {props.toMessageCenterPage()}} src={require('assets/img/common/message.svg')} alt=""/>
          </div>
        }
      >
      </NavBar>
    </div>
  );
}

export default HomeNavBar;