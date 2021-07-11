import React from 'react';
import './HomeHotList.less';
import GoodsList from 'components/content/goodsList/GoodsList';

function HomeHotList(props) {
  return (
    <div className="home-hot-list">
      <div className="home-hot-list-title"></div>
      <GoodsList goodsList={props.hotList} />
    </div>
  );
}

export default HomeHotList;