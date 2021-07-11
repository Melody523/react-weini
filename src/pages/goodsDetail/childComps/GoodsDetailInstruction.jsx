import React, { useState } from 'react';
import './style.less';

function GoodsDetailiInstruction(props) {
  const initInstructionList = ['商品税费', '该商品免运费', '100%正品保证', '假一赔十'];
  const [instructionList] = useState(initInstructionList);
  function changeInstruction() {
    props.changeInstruction(true);
  }
  return (
    <div className="goods-detail-instruction" onClick={changeInstruction}>
      <div className="goods-detail-instruction-title">说明:</div>
      <ul className="goods-detail-instruction-list">
        {
          instructionList.map((item) => (
            <li className="goods-detail-instruction-item" key={item}>{item}</li>
          ))
        }
      </ul>
      <div className="left-icon"></div>
    </div>
  );
}

export default GoodsDetailiInstruction;