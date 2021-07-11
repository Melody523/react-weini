import React from 'react';
import './style.less';

function HistorySearch(props) {
  return (
    <div className="history-search">
      <div className="history-search-header">
        <div className="title">搜索记录</div>
        <div className="clear-btn" onClick={() => {props.clearHistoryList()}}>清空记录</div>
      </div>
      <ul className="history-search-list">
        {
          props.historySearchList.map((item, index) => (
            <li className="history-search-item" key={index} onClick={() => {props.toGoodsListPage(item)}}>{item}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default HistorySearch;