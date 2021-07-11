import React from 'react';
import './BrandList.less';

function BrandList(props) {
  return (
    <div className="brand-list">
      <div className="brand-list-title">{props.queryBrandTitle}</div>
      {
        props.queryBrand.map((item) => (
          <div className="brand-item" key={item.brandId}>
            <img className="brand-icon" src={item.brandLogo} alt="" />
            <div className="brand-title">{item.brandName}</div>
          </div>
        ))
      }
    </div>
  );
}

export default BrandList;