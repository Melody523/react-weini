import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as ActionCreator from 'pages/home/store/ActionCreator';
import * as ActionCreator2 from 'pages/category/store/ActionCreator';
import CategoryLeft from './childComps/CategoryLeft';
import CategoryNavBar from './childComps/CategoryNavBar';
import CategoryRight from './childComps/CategoryRight';
import './Category.less';

class Category extends PureComponent {
  componentDidMount() {
    this.props.setIsActive();
    this.props.getCategory();
    this.props.getCategoryTwo(1);
    this.props.getCarCount();
  }
  render() {
    const { cartCount, categoryList, categoryTwoList, currentId } = this.props;

    return (
      <div className="category-container">
        <CategoryNavBar cartCount={cartCount} toSearchPage={() => {this.toSearchPage()}} />
        <div className="category-content">
          <CategoryLeft categoryList={categoryList.toJS()} currentId={currentId} />
          <CategoryRight categoryTwoList={categoryTwoList.toJS()} />
        </div>
      </div>
    )
  }
  toSearchPage() {
    this.props.history.push('/search');
  }
}

const mapState = (state) => ({
  cartCount: state.getIn(['category', 'cartCount']),
  categoryList: state.getIn(['category', 'categoryList']),
  categoryTwoList: state.getIn(['category', 'categoryTwoList']),
  currentId: state.getIn(['category', 'currentId'])
})

const mapDispatch = (dispatch) => ({
  setIsActive() {
    dispatch(ActionCreator.SetIsActive('/category'))
  },
  changeId(id) {
    dispatch(ActionCreator2.ChangeId(id))
  },
  getCategory() {
    dispatch(ActionCreator2.GetCategory())
  },
  getCategoryTwo(classId) {
    dispatch(ActionCreator2.GetCategoryTwo(classId))
  },
  getCarCount() {
    dispatch(ActionCreator2.CarCount())
  }
})

export default connect(mapState, mapDispatch)(Category);
