import React from 'react';
import { Carousel } from 'antd';
import './style.less';

function GoodsDetailSwipe(props) {
  return (
    <div>
      <Carousel autoplay>
        {
          props.bannerList.map((item) => (
            <img className="banner-img" key={item.recId} src={item.imgUrl} alt=""/>
          ))
        }
      </Carousel>
    </div>
  );
}

export default GoodsDetailSwipe;