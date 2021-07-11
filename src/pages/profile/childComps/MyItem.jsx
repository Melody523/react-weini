import React, { useState } from 'react';
import './style.less';

function MyItem(props) {
  let initMyList = [
    {
      img: require('assets/img/profile/youhuiquan.svg'),
      title: '我的优惠券',
      path: '/coupon'
    },
    {
      img: require('assets/img/profile/shimingrenzheng.svg'),
      title: '实名认证',
      path: ''
    },
    {
      img: require('assets/img/profile/shoucang.svg'),
      title: '我的收藏',
      path: '/collection'
    },
    {
      img: require('assets/img/profile/bangzhu.svg'),
      title: '使用帮助',
      path: '/useHelp'
    },
    {
      img: require('assets/img/profile/kefu.svg'),
      title: '联系客服',
      path: ''
    }
  ];
  const [myList] = useState(initMyList);
  return (
    <>
      <div className="my-item">
        <ul className="my-list">
          {
            myList.map((item, index) => (
              <li className="my-item-content" key={item.img} onClick={() => {props.toPage(item.path)}} >
                <div className="left">
                  <img className="icon" src={item.img} alt="" />
                  <p className="title">{item.title}</p>
                </div>
                <div className="right">
                  {
                    index === 0 && <span>查看全部优惠券</span>
                  }
                  {
                    index === 1 && <span>{(props.userMessage.realName === '' || props.userMessage.realName === undefined)?'未认证':'已认证'}</span>
                  }
                  >
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="logout-btn" onClick={() => {props.logout()}}>
        退出登录
      </div>
    </>
  );
}

export default MyItem;