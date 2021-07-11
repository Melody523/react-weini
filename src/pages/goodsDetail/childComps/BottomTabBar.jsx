import React from 'react';
import './style.less';

function BottomTabBar(props) {
  function showAdd() {
    props.showAdd(true);
  }
  function changeCollect() {
    props.changeCollect();
  }
  function showRemind() {
    props.showRemind();
  }
  return (
    <div className="bottom-tab-bar">
      <div className="bottom-tab-bar-left">
        <div className="bottom-tab-bar-left-item">
          <img className="icon" src="http://www.weinihaigou.com/m-images/goods-custom.png" alt="" />
          <p className="title">客服</p>
        </div>
        <div className="bottom-tab-bar-left-item" onClick={changeCollect}>
          <img className="icon" src={!props.ifCollect ? 'http://www.weinihaigou.com/m-images/goods-no-collection.png' : 'http://www.weinihaigou.com/m-images/goods-collection.png'} alt="" />
          <p className={props.ifCollect ? 'title acitve' : 'title'}>收藏</p>
        </div>
      </div>
      {
        props.totalStock > 0 && 
        <div className="bottom-tab-bar-right">
          <div className="btn add-cart-btn" onClick={showAdd}>加入购物车</div>
          <div className="btn buy">立即购买</div>
        </div>
      }
      {
        props.totalStock <= 0 && 
        <div className="bottom-tab-bar-right">
          <div className="remind-btn" onClick={showRemind}>到货提醒</div>
        </div>
      }
    </div>
  );
}

export default BottomTabBar;