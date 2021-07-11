import React, { PureComponent } from 'react';
import './Search.less';
import SearchNavBar from './childComps/SearchNavBar';
import HotSearch from './childComps/HotSearch';
import HistorySearch from './childComps/HistorySearch';

import { getTextSearch, getHotSearch } from 'network/search';

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: {},
      hotSearchList: [],
      historySearchList: [],
      hasInput: true
    }
  }
  componentDidMount() {
    this.getTextSearchList();
    this.getHotSearchList();
    this.getHistorySearchList();
  }
  render() {
    const { textSearch, hotSearchList, historySearchList, hasInput } = this.state;
    return (
      <div className="search">
        <SearchNavBar textSearch={textSearch} goBack={() => {this.goBack()}} searchInput={(value) => {this.searchInput(value)}} toGoodsListPage={(keyword) => {this.toGoodsListPage(keyword)}} hasInput={hasInput} clearInput={() => {this.clearInput()}} />
        <div className="search-content">
          <HotSearch hotSearchList={hotSearchList} toGoodsListPage={(keyword) => {this.toGoodsListPage(keyword)}} />
          <HistorySearch historySearchList={historySearchList} clearHistoryList={() => {this.clearHistoryList()}} toGoodsListPage={(keyword) => {this.toGoodsListPage(keyword)}} />
        </div>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getTextSearchList() {
    getTextSearch().then(res => {
      this.setState({
        textSearch: res.list[0]
      });
    });
  }
  getHotSearchList() {
    getHotSearch().then(res => {
      this.setState({
        hotSearchList: res.result
      });
    });
  }
  toGoodsListPage(keyword) {
    let historySearchList = JSON.parse(JSON.stringify(this.state.historySearchList));
    console.log(keyword, historySearchList);
    if (historySearchList.indexOf(keyword) !== -1) {
      historySearchList.splice(historySearchList.indexOf(keyword), 1);
    }
    this.setState({
      historySearchList: historySearchList.unshift(keyword)
    });
    sessionStorage.setItem('HISTORY_SEARCH', historySearchList.join(','));
    this.props.history.push({pathname: '/brandGoods', query: {name: keyword, title: keyword}});
  }
  getHistorySearchList() {
    let historySearch = sessionStorage.getItem('HISTORY_SEARCH') || '';
    let list = [];
    if (historySearch !== '') {
      list = historySearch.split(',');
    }
    this.setState({
      historySearchList: list
    });
  }
  clearHistoryList() {
    sessionStorage.removeItem('HISTORY_SEARCH');
    this.setState({
      historySearchList: []
    });
  }
  searchInput(value) {
    let textSearch = JSON.parse(JSON.stringify(this.state.textSearch));
    textSearch.linkContent = value.trim();
    this.setState({
      textSearch: textSearch,
      hasInput: !(value === '')
    });
  }
  clearInput() {
    let textSearch = JSON.parse(JSON.stringify(this.state.textSearch));
    textSearch.linkContent = '';
    this.setState({
      textSearch: textSearch,
      hasInput: false
    });
  }
}

export default Search;
