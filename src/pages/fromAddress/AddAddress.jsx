import React, { PureComponent } from 'react';
import './style.less';
import Scroll from 'components/common/scroll/Scroll';

import AddressNavBar from './childComps/AddressNavBar';

import { insertAddr } from 'network/address';
import provcityArea from 'utils/provcityArea.json';

import { message } from 'antd';

class AddAddress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      realName : '',
      mobile : '',
      cardId : '',
      province : '',
      city : '',
      county : '',
      detailsAddress : '',
      flag : 0,
      provinceList: {},
      cityList: {},
      countyList: {}
    }
  }
  componentDidMount() {
    this.setState({
      provinceList: provcityArea
    });
  }
  render() {
    const { realName, mobile, province, city, county, detailsAddress, flag, provinceList, cityList, countyList } = this.state;
    return (
      <div className="add-address">
        <AddressNavBar title="添加地址" control="完成" clickControl={() => {this.addAddress()}} />
        <Scroll classContent="add-address-content" >
          <div className="add-content">
            <div className="add-item">
              <input className="add-input" value={realName} onChange={(e) => {this.setState({realName: e.target.value})}} type="text" placeholder="真实姓名" />
            </div>
            <div className="add-item">
              <input className="add-input" value={mobile} onChange={(e) => {this.setState({mobile: e.target.value})}} type="text" placeholder="手机号码" />
            </div>
            <div className="add-item">
              <select name="province" className="select" value={province} onChange={(e) => {this.provinceChange(e)}}>
                <option className="option" value="" disabled>请选择省份</option>
                {
                  Object.keys(provinceList).map(key => (
                    <option className="option" value={provinceList[key].code} key={key} >{provinceList[key].name}</option>
                  ))
                  // provinceList.map((item) => (
                  //   <option className="option" value={item.code} key={name} >{value.name}</option>
                  // ))
                }
              </select>
              <select name="city" className="select" value={city} onChange={(e) => {this.cityChange(e)}}>
                <option className="option" value="">请选择城市</option>
                {
                  Object.keys(cityList).map(key => (
                    <option className="option" value={cityList[key].code} key={key} >{cityList[key].name}</option>
                  ))
                }
              </select>
              <select name="county" className="select" value={county} onChange={(e) => {this.setState({county: e.target.value})}}>
                <option className="option" value="">请选择区</option>
                {
                  Object.keys(countyList).map(key => (
                    <option className="option" value={key} key={key} >{countyList[key]}</option>
                  ))
                }
              </select>
            </div>
            <div className="add-item">
              <textarea className="detail-address" value={detailsAddress} onChange={(e) => {this.setState({detailsAddress: e.target.value})}} placeholder="详细信息"></textarea>
            </div>
            <div className="add-item">
              <div onClick={() => {this.changeFlag()}}>
                <img className="selected" src={flag === 1 ? require('assets/img/cart/choose_active.svg') : require('assets/img/cart/choose.svg')}  alt="" />
                <p className="title">设置为默认地址</p>
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  provinceChange(e) {
    this.setState({
      province: e.target.value,
      cityList: this.state.provinceList[e.target.value].cities,
      city: '',
      countyList: {},
      county: ''
    });
  }
  cityChange(e) {
    this.setState({
      city: e.target.value,
      countyList: this.state.cityList[e.target.value].districts,
      county: ''
    });
  }
  changeFlag() {
    this.setState((state) => ({
      flag: state.flag === 0 ? 1 : 0
    }));
  }
  addAddress() {
    if (!this.state.realName.trim()) {
      message.error('请输入真实姓名', 2);
    } else if (!/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.state.mobile.trim())) {
      message.error('手机号为空或者格式不正确', 2);
    } 
    // else if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.state.cardId.trim())) {
    //   message.error('身份证号为空或者格式不正确', 2);
    // } 
    else if (!this.state.province.trim()) {
      message.error('请选择地址', 2);
    } else if (!this.state.detailsAddress.trim()) {
      message.error('请输入详细地址', 2);
    } else {
      let params = {
        area_name : this.state.provinceList[this.state.province].name + this.state.cityList[this.state.city].name + this.state.countyList[this.state.county],//省县市
        address: this.state.detailsAddress,//详细地址
        person_name: this.state.realName,//真实姓名
        serv_num: this.state.mobile,//手机号
        card_no: this.state.cardId,//身份证
        flag: this.state.flag//是否设为默认地址
      };
      insertAddr(params).then(res => {
        if (!res.success) {
          message.error(res.message, 2);
        } else {
          this.props.history.push('/fromAddress');
        }
        console.log(res);
      })
    }
  }
}

export default AddAddress;
