import React from 'react';
import NavBar from 'components/common/navBar/NavBar.jsx'
import './CategoryNavBar.less'

function CategoryNavBar(props) {
  return (
    <div className="category-nav-bar">
      <NavBar
        center={
          <div className="title">
          <img className="logo" src="http://www.weinihaigou.com/m-images/logo.png" alt="" />
        </div>
        }
        right={
          <div className="right">
            <img className="right-icon" onClick={() => {props.toSearchPage()}} src="http://www.weinihaigou.com/m-images/header-search.png" alt="" />
            <div className="cart-icon">
              <img className="right-icon" src="http://www.weinihaigou.com/m-images/header-shopping.png" alt="" />
              <span className="cart-count">{props.cartCount}</span>
            </div>
          </div>
        }
      >
      </NavBar>
    </div>
  );
}

export default CategoryNavBar;