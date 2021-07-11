import React from 'react';
import './style.less';

function GoodsList(props) {
  return (
    <div className="goods-list">
      <ul className="shop-list">
        {
          props.shopList.map((item) => (
            <li className="shop-item" key={item.skuId}>
              <img className="goods-img" src={item.imgUrl} alt="" />
              <div className="goods-message">
                <p className="title">{item.goodsName2}</p>
                <p className="sku-name">规格:{item.skuName}</p>
                <p className="sku-price">￥{item.skuPrice.toFixed(2)}</p>
              </div>
              <div className="sku-num">×{item.num}</div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default GoodsList;