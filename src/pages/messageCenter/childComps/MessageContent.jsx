import React from 'react';
import './style.less';

function MessageCenter(props) {
  return (
    <div className="message-content">
      <div className="new-notice" onClick={() => {props.toPublicPage()}}>
        <div className="new-notice-left">
          <div className="icon">
            <span className="dotted"></span>
          </div>
        </div>
        <div className="new-notice-center">
          <p className="title">公告</p>
          <p className="detail text-overflow1">{props.newNoticeObj.title}</p>
        </div>
        <div className="new-notice-right">
          <img className="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="" />
        </div>
      </div>
      <div className="new-notice server">
        <div className="new-notice-left">
          <div className="icon server-icon">
          </div>
        </div>
        <div className="new-notice-center">
          <p className="title">客服助手</p>
          <p className="detail text-overflow1">在线客服咨询时间9:00-18:00</p>
        </div>
        <div className="new-notice-right">
          <img className="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default MessageCenter;