import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './CategoryLeft.less';
import * as ActionCreator from 'pages/category/store/ActionCreator';

class CategoryLeft extends PureComponent {
  render() {
    return (
      <div className="category-left">
        <ul className="category-left-list">
          {
            this.props.categoryList.map((item) => (
              <li className={this.props.currentId === item.classid?'category-left-item active' : 'category-left-item'}
                  key={item.classid} onClick={() => {this.props.changeId(item.classid)}}
                >
                {item.classdesc}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  changeId(id) {
    dispatch(ActionCreator.ChangeId(id))
    dispatch(ActionCreator.GetCategoryTwo(id))
  }
})

export default connect(null, mapDispatch)(CategoryLeft);
