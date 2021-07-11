import React, { PureComponent } from 'react';
import './SortGroup.less';
import SortGroupItem from './SortGroupItem.jsx';
import SortBtn from './SortBtn.jsx';
import Scroll from 'components/common/scroll/Scroll';
import { connect } from 'react-redux';
import * as ActionCreator from 'pages/brandGoods/store/ActionCreator';

class SortGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: [],
      brand: [],
      country: [],
      price: [],
      stock: [],
      deliver: [],
      minPrice: '',
      maxPrice: '',
      minNumber: '',
      maxNumber: ''
    };
  }

  render() {
    const { brandList, countryList, typeList, priceList, stockList, deliverList } = this.props;
    return (
      <div className="sort-group">
        <div className="mask" onClick={() => {this.hideShow()}}></div>
        <div className="sort-group-list">
          <Scroll classContent="sort-group-content">
            <div className="sort-group-list-container">
              <SortGroupItem chooseItem={this.state.type} chooseList={(list) => {this.chooseList(list, 'type')}} sortGroupList={typeList.toJS()} sortGroupTitle="分类" isCheckbox={true} />
              <SortGroupItem chooseItem={this.state.brand} chooseList={(list) => {this.chooseList(list, 'brand')}} sortGroupList={brandList.toJS()} sortGroupTitle="品牌" isCheckbox={true} />
              <SortGroupItem chooseItem={this.state.country} chooseList={(list) => {this.chooseList(list, 'country')}} sortGroupList={countryList.toJS()} sortGroupTitle="国家" isCheckbox={true} />
              <SortGroupItem chooseItem={this.state.price} chooseList={(list) => {this.chooseList(list, 'price')}} sortGroupList={priceList.toJS()} sortGroupTitle="价格" isCheckbox={false} 
                sortRange={
                  <div className="sort-range">
                    <input className="sort-range-input" value={this.state.minPrice} onChange={(e) => this.setState({minPrice: e.target.value})} type="number" placeholder="最低价" />
                    <span className="sort-range-icon">——</span>
                    <input className="sort-range-input" value={this.state.maxPrice} onChange={(e) => this.setState({maxPrice: e.target.value})} type="number" placeholder="最高价" />
                  </div>
                }
              >
              </SortGroupItem>
              <SortGroupItem chooseItem={this.state.stock} chooseList={(list) => {this.chooseList(list, 'stock')}} sortGroupList={stockList.toJS()} sortGroupTitle="库存" isCheckbox={false}
                sortRange={
                  <div className="sort-range">
                  <input className="sort-range-input" value={this.state.minNumber} onChange={(e) => this.setState({minNumber: e.target.value})} type="number" placeholder="最低量" />
                  <span className="sort-range-icon">——</span>
                  <input className="sort-range-input" value={this.state.maxNumber} onChange={(e) => this.setState({maxNumber: e.target.value})} type="number" placeholder="最高量" />
                </div>
                }
              >
              </SortGroupItem>
              <SortGroupItem chooseItem={this.state.deliver} chooseList={(list) => {this.chooseList(list, 'deliver')}} sortGroupList={deliverList.toJS()} sortGroupTitle="发货" isCheckbox={false} />
            </div>
          </Scroll>
          <SortBtn sortReset={() => {this.sortReset()}} sortConfirm={() => {this.sortConfirm()}} />
        </div>
      </div>
    )
  }
  chooseList(list, type) {
    this.setState({
      [type]: list
    });
    if (type === 'price') {
      this.setState({
        minPrice: list[0].split('-')[0],
        maxPrice: list[0].split('-')[1]
      });
    } else if (type === 'stock') {
      this.setState({
        minNumber: list[0].split('-')[0],
        maxNumber: list[0].split('-')[1]
      });
    }
  }
  sortReset() {
    this.setState({
      type: [],
      brand: [],
      country: [],
      price: [],
      stock: [],
      deliver: [],
      minPrice: '',
      maxPrice: '',
      minNumber: '',
      maxNumber: ''
    });
  }
  sortConfirm() {
    let sortData = this.props.sortData.toJS();
    let data = {};
    data.strCount = Number(this.state.minNumber)>0 ? Number(this.state.minNumber) : null;
    data.endCount = Number(this.state.maxNumber)>0 ? Number(this.state.maxNumber) : null;
    data.strPrice = Number(this.state.minPrice)>0 ? Number(this.state.minPrice) : null;
    data.endPrice = Number(this.state.maxPrice)>0 ? Number(this.state.maxPrice) : null;
    data.brandId = this.state.brand.join(' ');
    data.countryId = this.state.country.join(' ');
    data.deliveryType = this.state.deliver.join(' ');
    data.threeCategory = this.state.type.join(' ');
    this.props.setGoodsList([]);
    sortData.pageNum = 1;
    let newSortData = Object.assign(sortData, data);
    this.props.setSortData(newSortData);
    this.props.searchGoodsList(newSortData);
    this.props.setIsShow(false);
  }
  hideShow() {
    this.props.setIsShow(false);
  }
}
const mapState = (state) => ({
  brandList: state.getIn(['brandGoods', 'brandList']),
  countryList: state.getIn(['brandGoods', 'countryList']),
  typeList: state.getIn(['brandGoods', 'typeList']),
  priceList: state.getIn(['brandGoods', 'priceList']),
  stockList: state.getIn(['brandGoods', 'stockList']),
  deliverList: state.getIn(['brandGoods', 'deliverList']),
  sortData: state.getIn(['brandGoods', 'sortData'])
})

const mapDispatch = (dispatch) => ({
  searchGoodsList(params) {
    dispatch(ActionCreator.SearchGoodsList(params))
  },
  setSortData(sortData) {
    dispatch(ActionCreator.SetSortData(sortData))
  },
  setGoodsList(goodsList) {
    dispatch(ActionCreator.SetGoodsList(goodsList))
  },
  setIsShow(isShow) {
    dispatch(ActionCreator.SetIsShow(isShow))
  }
})

export default connect(mapState, mapDispatch)(SortGroup);