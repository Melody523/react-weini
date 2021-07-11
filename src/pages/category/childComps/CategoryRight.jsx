import React from 'react';
import './CategoryRight.less';
import Scroll from 'components/common/scroll/Scroll';
import { Link } from 'react-router-dom';

function CategoryRight(props) {
  return (
    <Scroll probeType={3} classContent="category-right-container category-right-content">
      <div className="category-right">
        {
          props.categoryTwoList.map((item) => (
            <div className="category-right-list" key={item.id}>
              <div className="category-right-list-header">{item.name}</div>
              <ul className="category-right-list-content">
                {
                  item.threeCategoryList.map((catagory) => (
                    <li className="category-right-list-desc" key={catagory.id}>
                      <Link to={{pathname: '/brandGoods', query: {threeCategory: catagory.id, title: catagory.threeName}}}>
                        <img className="logo" src={catagory.imgUrl} alt="" />
                        <p className="name">{catagory.threeName}</p>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </Scroll>
  );
}

export default CategoryRight;