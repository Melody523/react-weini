import React from 'react';
import './style.less';
import NavBar from 'components/common/navBar/NavBar';

function SearchNavBar(props) {
  return (
    <div className="search-nav-bar">
      <NavBar
        left={
          <div className="left" onClick={() => {props.goBack()}}>
            <img className="back-icon" src={require('assets/img/common/left.svg')} alt="" />
          </div>
        }
        center={
          <div className="center">
            <input className="search-input" type="text" value={props.textSearch.linkContent} onChange={(e) => {props.searchInput(e.target.value)}} />
            {
              props.hasInput && <span className="icon" onClick={() => {props.clearInput()}}>&times;</span>
            }
          </div>
        }
        right={
          <div className="right">
            <img className="right-icon" src={require('assets/img/common/search.svg')} alt="" onClick={() => {props.toGoodsListPage(props.textSearch.linkContent)}} />
          </div>
        }
      >
      </NavBar>
    </div>
  );
}

export default SearchNavBar;