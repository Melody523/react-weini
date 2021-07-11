import React, { PureComponent } from 'react';
import './style.less';
import { connect } from 'react-redux';
import * as ActionCreator from 'pages/goodsDetail/store/ActionCreator';
import Scroll from 'components/common/scroll/Scroll';

import city from '@/utils/city.json';

class CityContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: city.provinces,
      cityList: [],
      showProvince: true,
      chooseProvince_1: '',
      chooseCity: ''
    };
  }

  render() {
    const { chooseProvince } = this.props;
    const { provinceList, cityList, showProvince } = this.state;
    return (
      <div className="city-content">
        <div className="mask" onClick={() => {this.hideCity()}}></div>
        <div className="city-desc">
          <div className="city-header">配送至</div>
          <Scroll classContent="city-detail">
            <ul className="city-list">
              {
                showProvince ? 
                provinceList.map((item) => (
                  <li className={item.name === chooseProvince ? 'city-item active' : 'city-item'} key={item.code} onClick={() => {this.provinceClick(item.code, item.name)}}>{item.name}</li>
                )) :
                cityList.map((item) => (
                  <li className={item.name === chooseProvince ? 'city-item active' : 'city-item'} key={item.code} onClick={() => {this.provinceClick(item.code, item.name)}}>{item.name}</li>
                )) 
              }
            </ul>
          </Scroll>
        </div>
      </div>
    )
  }
  hideCity() {
    this.props.changeIsShowCity(false);
  }
  provinceClick(code, name) {
    if (this.state.showProvince) {
      let cityList = this.state.provinceList.filter(item => item.code === code);
      this.setState({
        cityList: cityList[0].cities,
        showProvince: false,
        chooseProvince_1: name
      });
    } else {
      this.setState({
        chooseCity: name,
        showProvince: true
      });
      this.props.changeCity(this.state.chooseProvince_1, name, false);
    }
  }
}
const mapState = (state) => ({
  chooseProvince: state.getIn(['goodsDetail', 'chooseProvince'])
});

const mapDispatch = (dispatch) => ({
  changeIsShowCity(isShowCity) {
    dispatch(ActionCreator.ChangeIsShowCity(isShowCity));
  },
  changeCity(chooseProvince, chooseCity, isShowCity) {
    dispatch(ActionCreator.ChangeCity(chooseProvince, chooseCity, isShowCity));
  }
});

export default connect(mapState, mapDispatch)(CityContent);