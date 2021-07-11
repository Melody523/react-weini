import React from 'react';
import './style.less';
import filterTime from 'utils/filterTime';

function NoticeList(props) {
  return (
    <div className="notice-list">
      <ul className="notice-list-detail">
        {
          props.noticeList.map((item) => (
            <li className="notice-item" key={item.id}>
              <p className="time">{filterTime(new Date(item.createTime), 'YYYY.MM.dd')}</p>
              <div className="notice-item-content">
                <p className="title">{item.title}</p>
                <p className="get-more" onClick={() => {props.toPublicDetailPage(item.id)}}>
                  <span className="get-more-title">点击查看</span>
                  <img className="get-more-icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="" />
                </p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default NoticeList;