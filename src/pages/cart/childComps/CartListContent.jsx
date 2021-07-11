import React from 'react';
import './style.less';
import {deliveryTypeFilter} from 'utils/deliveryTypeFilter';
import { Link } from 'react-router-dom';

function CartListContent(props) {
  function chooseClick(index, i) {
    props.chooseClick(index, i);
  }
  function taxClick(index, i) {
    props.taxClick(index, i);
  }
  function changeGoodsNum(goodsId, skuId, num) {
    props.changeGoodsNum(goodsId, skuId, num);
  }
  function delectGoods(id) {
    props.delectGoods(id);
  }
  return (
    <div className="cart-list-content">
      <ul className="cart-list">
        {
          props.cartList.map((cartItem, index) => (
            <li className="cart-item" key={index}>
              {
                cartItem.shopCarList.map((item, i) => (
                  <div key={item.cartId}>
                    <div className="item-top">
                      <img className="checkbox" onClick={() => {chooseClick(index, i)}} src={item.checked?require('assets/img/cart/choose_active.svg'):require('assets/img/cart/choose.svg')} alt="" />
                        <div className="img-box">
                          <Link to={'/goodsDetail/' + item.goodsNo}>
                            <img className="img" src={item.imgUrl} alt="" />
                            {
                              (item.isShow === 0 || item.status !== 1) && <div className="no-goods">已下架</div>
                            }
                          </Link>
                        </div>
                        <div className="goods-desc">
                          <Link to={'/goodsDetail/' + item.goodsNo}>
                            <p className="title text-overflow2">{item.goodsName}</p>
                            <p className="sku-name">规格:{item.skuName}</p>
                            <p className="delivery">{deliveryTypeFilter(item.deliveryCode)}</p>
                            <p className="price">￥{item.skuPrice.toFixed(2)}</p>
                          </Link>
                        </div>
                      <div className="num-content">
                        {
                          !props.isEdit && item.realStock > 0 &&
                          <div className="num" >
                            <div className={item.num <= 1 ? 'sub no-sub' : 'sub'} onClick={() => {changeGoodsNum(item.goodsId, item.skuId, -1)}}>-</div>
                            <div className="number">{item.num}</div>
                            <div className={item.num >= item.realStock ? 'add no-sub' : 'add'} onClick={() => {changeGoodsNum(item.goodsId, item.skuId, 1)}}>+</div>
                          </div>
                        }
                        {
                          !(!props.isEdit && item.realStock > 0) &&
                          <div className="delect" onClick={() => {delectGoods(item.cartId)}}>
                            <img className="delect-icon" src={require('assets/img/cart/delect.svg')} alt="" />
                            <p className="title">删除</p>
                          </div>
                        }
                        <div className="tax-money">预计税费:{item.goodsTax}</div>
                        <span className={item.taxShow ? 'show-icon icon' : 'icon'} onClick={() => {taxClick(index, i)}}></span>
                      </div>
                    </div>
                    {
                      item.taxShow &&
                      <div className="item-bottom">
                        税率{item.tax.toFixed(2)}%，结算税费以提交订单时应付总额明细为准
                      </div>
                    }
                  </div>
                ))
              }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default CartListContent;