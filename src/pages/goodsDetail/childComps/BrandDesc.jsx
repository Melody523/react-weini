import React from 'react';
import './style.less';
import { Link } from 'react-router-dom';

function BrandDesc(props) {
  return (
    <div className="brand-desc">
      <div className="brand-desc-header"><span className="brand-desc-title">品牌详情</span></div>
      <p className="brand-desc-content">全球商品一站式采购代发，主营美妆/个护/食品/保健品/日用品等品类,国内领先主流跨境电商平台的日系产品供应者。设有东京、电商平台的日系产品供应者。设有东京、香港、浙江三个中心。东京：采购与仓储 ; 香港：仓储与BD ; 浙江：运营与购与仓储 ; 香港：仓储与BD ;</p>
      <img className="brand-logo" src={props.goodsBrand.brandLogo} alt="" />
      <Link to={{ pathname: '/brandGoods' , query: {brandId: props.goodsBrand.brandId, title: props.goodsBrand.brandName}}}>
        <p className="get-more">查看该品牌所有单品></p>
      </Link>
    </div>
  );
}

export default BrandDesc;