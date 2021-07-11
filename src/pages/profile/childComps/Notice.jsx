import React from 'react';
import './style.less';

function Notice(props) {
  return (
    <div className="notice" >
      <img className="icon" src={require('assets/img/common/music.svg')} alt="" />
      {
        props.noticeList.length !== 0 &&
        <marquee behavior="scroll" direction="up" scrollamount="1" scrolldelay="0" loop="-1">
          {
            props.noticeList.map((item) => (
              <p className="text-overflow1" key={item.id}>{item.title}</p>
            ))
          }
        </marquee>
      }
    </div>
  );
}

export default Notice;