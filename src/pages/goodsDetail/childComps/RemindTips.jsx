import React, { useState } from 'react';
import './style.less';

function RemindTips(props) {
  let initMobile = props.userMessage.mobile;
  const [mobile, setMobile] = useState(initMobile);
  function hideRemind() {
    props.hideRemind();
  }
  function addNotify() {
    props.addNotify(mobile);
  }
  return (
    <div className="remind-tips" v-if="userMessage.userName">
      <div className="mask"></div>
      <div className="remind-tips-content">
        <div className="remind-tips-top">
          <p className="title">设置到货通知</p>
          <p className="desc">商品到货，唯妮酱会第一时间通知您</p>
          <div className="input-box">
            <input className="mobile-input" type="number" value={mobile} onChange={(e) => {setMobile(e.target.value)}} />
            {
             mobile.length > 0 && <span className="icon" onClick={() => {setMobile('')}}>&times;</span>
            }
          </div>
        </div>
        <div className="remind-tips-bottom">
          <div className="cancel-btn" onClick={hideRemind}>取消</div>
          <div className="confirm-btn" onClick={addNotify}>确定</div>
        </div>
      </div>
    </div>
  );
}

export default RemindTips;