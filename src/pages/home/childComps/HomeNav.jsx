import React, { useState } from 'react';
import './HomeNav.less';
import { Link } from 'react-router-dom';

function HomeNav(props) {
  const initNavList = [
    {
      img: 'http://www.weinihaigou.com/m-images/nav2.png',
      title: '国家馆',
      path: '/country',
      query: {}
    },
    {
      img: 'http://www.weinihaigou.com/m-images/nav3.png',
      title: '品牌街',
      path: '/brandSearch',
      query: {}
    },
    {
      img: 'http://www.weinihaigou.com/m-images/new.png',
      title: '新品',
      path: '/brandGoods',
      query: {
        title: '新品',
        isNew: 1
      }
    },
    {
      img: 'http://www.weinihaigou.com/m-images/hot.png',
      title: '热卖',
      path: '/theme/317',
      query: {}
    }
  ];
  const [navList] = useState(initNavList);

  return (
    <div className="home-nav">
      <ul className="home-nav-list">
        {
          navList.map((item) => (
            <li className="home-nav-item" key={item.img}>
              <Link to={{ pathname: item.path , query: item.query}}>
                <img className="home-nav-icon" src={item.img} alt="" />
                <div className="home-nav-title">{item.title}</div>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default HomeNav;