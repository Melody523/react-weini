import React, { PureComponent } from 'react';
import './Coupon.less';
import CouponNavBar from './childComps/CouponNavBar';
import CouponTabBar from './childComps/CouponTabBar';
import CouponList from './childComps/CouponList';

import Scroll from 'components/common/scroll/Scroll';
import Delect from 'components/content/delect/Delect';
import PageEnd from 'components/content/pageEnd/PageEnd';

import { getMyConpou, getConpouByCode } from 'network/profile';

import { message } from 'antd';

class Coupon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      status: 0,
      conpouList: [],
      conpouTypeList: [
        {
          status: 0,
          title: '未使用'
        },
        {
          status: 1,
          title: '已使用'
        },
        {
          status: 2,
          title: '已过期'
        }
      ],
      currentType: 0,
      hasNextPage: true,
      isChange: false,
      couponCode: ''
    }
  }
  componentDidMount() {
    this.getConpouList({pageNum: this.state.pageNum, status: this.state.currentType});
  }
  render() {
    const { conpouList, conpouTypeList, currentType, hasNextPage, isChange, couponCode } = this.state;
    return (
      <div className="coupon">
        <CouponNavBar title="优惠券" changeBtn={() => {this.changeBtn()}} goBack={() => this.goBack()} />
        <CouponTabBar conpouTypeList={conpouTypeList} currentType={currentType} changeCouponType={(type) => {this.changeCouponType(type)}} />
        <Scroll classContent="coupon-content" probeType={3} pullUpLoad={true} pullingUp={(scroll) => {this.pullingUp(scroll)}} >
          <CouponList conpouList={conpouList} conpouType={(value) => {this.conpouType(value)}} />
          {
            conpouList.length <= 0 &&  <img className="no-img" src="http://www.weinihaigou.com/m-images/com-no-num.png" alt="" />
          }
         {
           !hasNextPage && conpouList.length > 0 && <PageEnd />
         }
        </Scroll>
        {
          isChange && 
          <Delect cancelDel={() => {this.cancelDel()}} confirmDel={() => {this.confirmDel()}}
            content={
              <div className="delect-header">
                <p className="title">兑换优惠券</p>
                <input className="change-input" type="text" value={couponCode} onChange={(e) => {this.setState({couponCode: e.target.value})}} />
              </div>
            }
          >
          </Delect>
        }
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getConpouList(params) {
    getMyConpou(params).then(res => {
      let conpouList = JSON.parse(JSON.stringify(this.state.conpouList));
      conpouList.push(...res.result.userConpouList.list);
      this.setState({
        conpouList: conpouList,
        hasNextPage: res.result.userConpouList.hasNextPage
      });
    })
  }
  pullingUp(scroll) {
    if (this.state.hasNextPage) {
      this.setState((state) => ({
        pageNum: state.pageNum + 1
      }));
      this.getConpouList({pageNum: this.state.pageNum, status: this.state.currentType});
      setTimeout(() => {
        scroll.refresh();
        scroll.finishPullUp();
      }, 1000);
    }
  }
  changeCouponType(status) {
    this.setState({
      currentType: status,
      pageNum: 1,
      conpouList: []
    });
    this.getConpouList({pageNum: 1, status: status});
  }
  changeBtn() {
    this.setState({
      isChange: true
    });
  }
  cancelDel() {
    this.setState({
      isChange: false
    });
  }
  confirmDel() {
    if( this.state.couponCode.trim() === '' ) {
      message.error('请输入兑换码', 2);
    } else {
      getConpouByCode({tattedCode: this.state.couponCode}).then(res => {
        if(res.success) {
          message.success('兑换成功', 2);
          this.setState({
            isChange: false
          });
          this.getConpouList({pageNum: this.state.pageNum, status: this.state.currentType});
        } else {
          message.error(res.message, 2);
        }
      })
    }
  }
  conpouType(value) {
    switch (value) {
      case 0:
        return '未使用';
      case 1:
        return '已使用';
      case 2:
        return '已过期';
      default:
        break;
    }
  }
}

export default Coupon;
