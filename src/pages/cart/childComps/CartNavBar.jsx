import React, { PureComponent } from 'react';
import NavBar from 'components/common/navBar/NavBar'
import './style.less';

class CartNavBar extends PureComponent{
  render() {
    return (
      <div className="main-nav-bar">
        <NavBar
          left={
            <div className="left" >
              {/* <img className="back-icon" onClick={() => {this.goBackBtn()}} src={require('assets/img/common/left.svg')} alt="" /> */}
            </div>
          }
          center={
            <div className="title">
              {this.props.title}
            </div>
          }
          right={
            <div className="right" onClick={() => {this.changeEdit()}}>
              {!this.props.isEdit ? '编辑' : '完成'}
            </div>
          }
        >
        </NavBar>
      </div>
    );
  }
  changeEdit() {
    this.props.changeEdit();
  }
}

export default CartNavBar;