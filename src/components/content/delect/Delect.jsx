import React from 'react';
import './Delect.less';

function Delect(props) {
  function cancelDel() {
    props.cancelDel();
  }
  function confirmDel() {
    props.confirmDel();
  }
  return (
    <div className="delect-container">
      <div className="mask"></div>
      <div className="delect-content">
        {
          props.content
        }
        <div className="delect-btn">
          <div className="cancel" onClick={cancelDel}>取消</div>
          <div className="confirm" onClick={confirmDel}>确认</div>
        </div>
      </div>
    </div>
  );
}

export default Delect;