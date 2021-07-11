import React, { PureComponent } from 'react';
import NavBar from 'components/common/navBar/NavBar'
import './style.less';
import { Link } from 'react-router-dom';

class GoodsDetailNavBar extends PureComponent{
  render() {
    return (
      <div className="goods-detail-nav-bar">
        <NavBar
          left={
            <div className="left" onClick={() => {this.goBackBtn()}}>
              <img className="back-icon" src={require('assets/img/common/left.svg')} alt="" />
            </div>
          }
          center={
            <div className="title">
              商品详情
            </div>
          }
          right={
            <div className="right">
              <Link to={'/home'}>
                <img className="right-icon" src="http://www.weinihaigou.com/m-images/header-home.png" alt="" />
              </Link>
              <Link to={'/cart'}>
                <div className="cart-icon" >
                  <img className="right-icon" src="http://www.weinihaigou.com/m-images/header-shopping.png" alt="" />
                  <span className="cart-count">{this.props.cartCount}</span>
                </div>
              </Link>
            </div>
          }
        >
        </NavBar>
      </div>
    );
  }
  goBackBtn() {
    this.props.goBack();
  }
}

export default GoodsDetailNavBar;