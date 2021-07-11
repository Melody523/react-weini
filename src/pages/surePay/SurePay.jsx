import React, { PureComponent } from 'react';
import './SurePay.less';
import { toMoPalaceOrder } from 'network/surePay';

import MainNavBar from 'components/content/mainNavBar/MainNavBar';
import Scroll from 'components/common/scroll/Scroll';

import SurePayAddress from './childComps/SurePayAddress';
import GoodsList from './childComps/GoodsList';
import OrderList from './childComps/OrderList';
import Remark from './childComps/Remark';
import PayType from './childComps/PayType';
import SurePayBottom from './childComps/SurePayBottom';

class SurePay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addrList: [],
      shopList: [],
      acountObj: {
        amountAll: 0,
        couDiscount: 0,
        discount: 0,
        postAge: 0,
        realNameAndCard: '',
        shopCount: 0,
        taxAll: 0,
        cList: [],
        totalAcount: 0
      }
    }
  }
  componentDidMount() {
    this.getMoPalaceOrder();
  }
  render() {
    const { addrList, shopList, acountObj } = this.state;
    return (
      <div className="sure-pay">
        <MainNavBar title="确认支付" goBack={() => {this.goBack()}} />
        {
          addrList !== undefined && 
          <>
          <Scroll classContent="sure-pay-content" >
            <SurePayAddress addrList={addrList} toFromAddressPage={() => {this.toFromAddressPage()}} />
            <GoodsList shopList={shopList} />
            <OrderList acountObj={acountObj} />
            <div className="safe-tip">安全提醒：付款成功后，唯妮海购不会以付款异常，系统升级为理由联系您，请勿泄漏银行卡号，手机验证码，否则会造成钱款的损失。如有疑问请咨询客服，谨防电话诈骗。</div>
            <Remark />
            <PayType />
          </Scroll>
          <SurePayBottom amountAll={acountObj.amountAll} />
          </>
        }
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getMoPalaceOrder() {
    toMoPalaceOrder().then(res => {
      console.log(res)
      let acountObj = {};
      acountObj.amountAll = res.result.amountAll;
      acountObj.couDiscount = res.result.couDiscount ;
      acountObj.discount = res.result.discount;
      acountObj.postAge = res.result.postAge;
      acountObj.realNameAndCard = res.result.realNameAndCard;
      acountObj.shopCount = res.result.shopCount;
      acountObj.taxAll = res.result.taxAll;
      acountObj.cList = res.result.cList;
      acountObj.totalAcount = res.result.amountAll + res.result.postAge + res.result.taxAll - res.result.couDiscount - res.result.discount;
      this.setState({
        addrList: res.result.addrList,
        shopList: res.result.shopList,
        acountObj: acountObj
      });
    })
  }
  toFromAddressPage() {
    this.props.history.push('/fromAddress');
  }
}

export default SurePay;
