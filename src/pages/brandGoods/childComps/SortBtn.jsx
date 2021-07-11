import React from 'react';
import './SortBtn.less';

function SortBtn(props) {
  return (
    <div className="sort-btn">
      <div className="sort-reset" onClick={() => { props.sortReset() }}>重置</div>
      <div className="sort-confirm" onClick={() => { props.sortConfirm() }}>确认</div>
    </div>
  );
}

export default SortBtn;