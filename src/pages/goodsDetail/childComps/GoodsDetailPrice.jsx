import React from 'react';
import './style.less';

function GoodsDetailPrice(props) {
  return (
    <div className="goods-detail-price">
      <div className="goods-detail-title">{props.goodsDetailPrice.goodsName}</div>
      <div className="goods-detail-sell-price">￥{props.goodsDetailPrice.minPrice}-{props.goodsDetailPrice.maxPrice}</div>
      <p className="goods-detail-market-price">价格: <span className="price">{props.goodsDetailPrice.marketPrice}</span></p>
      {
        props.goodsDetailPrice.goodsCountry !== undefined && 
        <div className="goods-detail-country">
          <img className="goods-detail-country-icon" src={props.goodsDetailPrice.goodsCountry.countryImgUrl2} alt="" />
          <div className="goods-detail-country-desc">
            <span>{props.goodsDetailPrice.goodsCountry.countryName||''}品牌</span>
            <span>, 预计7个工作日左右到达</span>
          </div>
        </div>
      }
    </div>
  );
}

export default GoodsDetailPrice;