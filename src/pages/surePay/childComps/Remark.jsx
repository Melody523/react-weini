import React, { useState } from 'react';
import './style.less';

function Remark(props) {
  const [ remark, setRemark ] = useState('');
  return (
    <div className="remark">
      <p className="title">留言备注:</p>
      <textarea className="remark-input" value={remark} onChange={(e) => {setRemark(e.target.value)}} cols="30" rows="10"></textarea>
    </div>
  );
}

export default Remark;