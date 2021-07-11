import React, { PureComponent } from 'react';
import './SortNav.less';
import { connect } from 'react-redux';
import * as ActionCreator from 'pages/brandGoods/store/ActionCreator';

class SortNav extends PureComponent {
  render() {
    const { sortList, currentSort } = this.props;
    return (
      <div className="sort-nav">
        <ul className="sort-list">
          {
            sortList.toJS().map((item, index) => (
              <li className={' sort-item ' + (item.icon && ' sort-icon ') + ((index === currentSort) && ' sort-active ') + (item.top && ' sort-active-top ') + (item.bottom && ' sort-active-bottom ')}
                key={item.sort}
                onClick={() => {this.sortClick(index)}}
              >
                {item.title}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
  sortClick(index) {
    let currentSort = this.props.currentSort;
    let sortList = this.props.sortList.toJS();
    let sortData = this.props.sortData.toJS();
    if (currentSort >= 0 && currentSort !== index) {
      sortList[currentSort].bottom = false;
      sortList[currentSort].top = false;
      sortList[currentSort].order = 1;
    }
    this.props.setCurrentSort(index);
    currentSort = index;
    if ((index === 1 || index === 2 || index === 3) && sortList[index].order === 1) {
      sortList[index].order ++;
      sortList[currentSort].bottom = true;
      sortList[currentSort].top = false;
    } else if ((index === 1 || index === 2 || index === 3) && sortList[index].order === 2) {
      sortList[index].order --;
      sortList[currentSort].bottom = false;
      sortList[currentSort].top = true;
    }
    this.props.setSortList(sortList);
    if (sortList[currentSort].sort !== 'sx') {
      sortData.order = sortList[currentSort].order;
      sortData.sort = sortList[currentSort].sort;
      sortData.pageNum = 1;
      this.props.setGoodsList([]);
      this.props.setSortData(sortData);
      this.props.searchGoodsList(sortData);
    } else {
      this.props.setIsShow(true);
    }
  }
}

const mapState = (state) => ({
  sortList: state.getIn(['brandGoods', 'sortList']),
  currentSort: state.getIn(['brandGoods', 'currentSort']),
  sortData: state.getIn(['brandGoods', 'sortData'])
})

const mapDispatch = (dispatch) => ({
  searchGoodsList(params) {
    dispatch(ActionCreator.SearchGoodsList(params))
  },
  setSortData(sortData) {
    dispatch(ActionCreator.SetSortData(sortData))
  },
  setCurrentSort(currentSort) {
    dispatch(ActionCreator.SetCurrentSort(currentSort))
  },
  setSortList(sortList) {
    dispatch(ActionCreator.SetSortList(sortList))
  },
  setGoodsList(goodsList) {
    dispatch(ActionCreator.SetGoodsList(goodsList))
  },
  setIsShow(isShow) {
    dispatch(ActionCreator.SetIsShow(isShow))
  }
})

export default connect(mapState, mapDispatch)(SortNav);
