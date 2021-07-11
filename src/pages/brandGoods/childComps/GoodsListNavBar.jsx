import React, { PureComponent } from 'react';
import NavBar from 'components/common/navBar/NavBar';
import './GoodsListNavBar.less';

class GoodsListNavBar extends PureComponent{
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="goods-list-nav-bar">
        <NavBar
          left={
            <div className="left">
              <img className="back-icon" onClick={() => {this.props.goBack()}} src={require('assets/img/common/left.svg')} alt="" />
            </div>
          }
          center={
            <div className="center">
              {
                this.props.showSearch ? 
                <> 
                  <img className="search-icon" src={require('assets/img/common/search.svg')} alt="" />
                  <input className="search-input" type="text" placeholder={this.props.title} disabled />
                </>
                :
                <div className="title">
                  {this.props.title}
                </div>
              }
            </div>
          }
        >
        </NavBar>
      </div>
    );
  }
}

export default GoodsListNavBar;