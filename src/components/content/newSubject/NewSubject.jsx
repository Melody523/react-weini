import React from 'react';
import './style.less';
import NewSubjectItem from './NewSubjectItem.jsx';
import { Link } from 'react-router-dom';

function NewSubject(props) {
  return (
    <div className="new-subject">
      <div className="new-subject-list">
        {
          props.newSubject.map((item) => (
            <div className="new-subject-item" key={item.id}>
              <Link to={'/theme/' + item.id}>
                <img className="new-subject-poster" src={item.url} alt="" />
              </Link>
              <NewSubjectItem goodsList={item.goodsList} id={item.id} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default NewSubject;