import React from 'react';
import './style.less';

function HotSearch(props) {
  return (
    <div className="hot-search">
      <div className="hot-search-header">热门搜索</div>
      <ul className="hot-search-list">
        {
          props.hotSearchList.map((item) => (
            <li className="hot-search-item" key={item.id} onClick={() => {props.toGoodsListPage(item.linkContent)}}>{item.linkContent}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default HotSearch;