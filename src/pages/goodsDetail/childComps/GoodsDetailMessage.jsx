import React from 'react';
import './style.less';

function GoodsDetailMessage(props) {
  return (
    <div className="goods-detail-message">
      <div className="goods-detail-message-header">商品图文说明:</div>
      <div className="goods-detail-message-content">
        {
          props.goodsDetailList.map((item) => (
            <img className="goods-detail-img" src={item.imgUrl} key={item.imgUrl} alt="" />
          ))
        }
      </div>
    </div>
  );
}

export default GoodsDetailMessage;