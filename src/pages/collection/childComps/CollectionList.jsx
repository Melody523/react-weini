import React from 'react';
import './style.less';

function CollectionList(props) {
  return (
    <div className="collection-list-container">
      <ul className="collection-list">
        {
          props.collectList.map((item) => (
            <li className="collection-item" key={item.goodsId} onClick={() => {props.toGoodsDetailPage(item.goodsNo)}}>
              <img className="goods-img" src={item.imgUrl2} alt="" />
              <div className="goods-desc">
                <p className="title text-overflow2">{item.goodsName2}</p>
                <p className="price">￥{item.skuPrice.toFixed(2)}</p>
              </div>
              <img className="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="" />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default CollectionList;