import React, { useState } from 'react';
import './style.less';

function GoodsDetailInstructionDesc(props) {
  const initInstructionDetailList = [
    {
      title: '商品税费',
      desc: '商家承担'
    },
    {
      title: '商品运费',
      desc: '该商品免运费'
    },
    {
      title: '正品保障',
      desc: '唯妮海购每一件商品都经过严苛的品质把关，100%正品保证'
    },
    {
      title: '假一赔十',
      desc: '杜绝一切假货，让您无忧购物。'
    }
  ];
  const [instructionDetailList] = useState(initInstructionDetailList);
  function hideInstruction() {
    props.changeInstruction(false);
  }
  return (
    <div className="goods-detail-instruction-desc">
      <div className="mask" onClick={hideInstruction}></div>
      <div className="goods-detail-instruction-detail">
        <div className="goods-detail-instruction-header">商品说明<img className="close-icon" onClick={hideInstruction} src={require('assets/img/common/close.svg')} alt="" /></div>
        <ul className="goods-detail-instruction-list">
          {
            instructionDetailList.map((item) => (
              <li  className="goods-detail-instruction-item" v-for="item in instructionDetailList" key={item.title}>
                <div className="goods-detail-instruction-item-title">{item.title}</div>
                <div className="goods-detail-instruction-item-desc">{item.desc}</div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default GoodsDetailInstructionDesc;