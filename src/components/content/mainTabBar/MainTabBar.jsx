import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TabBar from 'components/common/tabbar/TabBar.jsx';
import TabBarItem from 'components/common/tabbar/TabBarItem.jsx';
import './MainTabBar.less';


function MainTabBar(props) {
  const initTabBarList = [
    {
      icon: require('assets/img/common/home.svg'),
      active: require('assets/img/common/home_active.svg'),
      title: '首页',
      path: '/home'
    },
    {
      icon: require('assets/img/common/category.svg'),
      active: require('assets/img/common/category_active.svg'),
      title: '分类',
      path: '/category'
    },
    {
      icon: require('assets/img/common/cart.svg'),
      active: require('assets/img/common/cart_active.svg'),
      title: '购物车',
      path: '/cart'
    },
    {
      icon: require('assets/img/common/profile.svg'),
      active: require('assets/img/common/profile_active.svg'),
      title: '我的',
      path: '/profile'
    }
  ];
  const [tabBarList] = useState(initTabBarList);

  return (
    <div className="main-tab-bar">
      <TabBar>
        {
          tabBarList.map((item) => (
            <Link to={item.path}  key={item.path} className="tab-bar-item">
              <TabBarItem 
                path={item.path}
                tabBarIcon={<img className="tab-bar-icon" src={item.icon} alt="" />}
                tabBarIconActive={<img className="tab-bar-icon" src={item.active} alt="" />}
                tabBarTitle={<div className="tab-bar-title">{item.title}</div>}
                activeTitle={<div className="tab-bar-title active-title">{item.title}</div>}
              >
              </TabBarItem>
            </Link>
          ))
        }
      </TabBar>
    </div>
  );
}

export default MainTabBar;
