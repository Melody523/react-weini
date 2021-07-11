import React from 'react';
import GoodsList from 'components/content/goodsList/GoodsList.jsx'
import './ThemeGoodsList.less'

function ThemeGoodsList(props) {
  return (
    <div className="theme-goods-list">
    <div className="img-box">
      <img className="theme-img" src={props.themeImg} alt="" />
    </div>
    <GoodsList goodsList={props.goodsList} />
  </div>
  );
}

export default ThemeGoodsList;