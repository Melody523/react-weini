import React from 'react';
import './GoodsList.less';
import {deliveryTypeFilter} from 'utils/deliveryTypeFilter';
import { Link } from 'react-router-dom';

function GoodsList(props) {
  return (
    <div className="goods-list">
      <ul className="hot-goods-list">
        {
          props.goodsList.map((item) => (
              <li className="hot-goods-item" key={item.goodsId}>
                <Link to={'/goodsDetail/' + item.goodsNo}>
                  <img className="hot-goods-img" src={item.imgUrl}  alt="" />
                  <div className="hot-goods-delivery-type">{deliveryTypeFilter(item.deliveryType)}</div>
                  <div className="hot-goods-title text-overflow2">{item.goodsName}</div>
                  <div className="hot-goods-price">
                    <span className="hot-goods-mall-price">￥{item.mallPrice}</span>
                    <span className="hot-goods-market-price">￥{item.marketPrice}</span>
                  </div>
                  {item.realStock <= 0 && <div className="no-goods">已抢光</div>}
                </Link>
              </li>
          ))
        }
      </ul>
    </div>
  );
}

export default GoodsList;