import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as ActionCreator from 'pages/country/store/ActionCreator';
import './Country.less';

import Scroll from 'components/common/scroll/Scroll';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';
import NewSubject from 'components/content/newSubject/NewSubject';

class Theme extends PureComponent {
  componentDidMount() {
    this.props.getCountryList();
  }
  render() {
    const { countryList } = this.props;
    let _countryList = countryList.toJS();
    return (
      <div className="country">
        <MainNavBar title="国家馆" goBack={() => {this.goBack()}}  />
        <Scroll classContent="country-content" probeType={3} >
          <NewSubject newSubject={_countryList} />
        </Scroll>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
}

const mapState = (state) => ({
  countryList: state.getIn(['country', 'countryList'])
})

const mapDispatch = (dispatch) => ({
  getCountryList() {
    dispatch(ActionCreator.QueryCountryList())
  }
})

export default connect(mapState, mapDispatch)(Theme);
