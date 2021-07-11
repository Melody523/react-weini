import React from 'react';
import './HomeSubject.less';
import { Link } from 'react-router-dom';

function HomeSubject(props) {
  return (
    <div className="home-subject">
      <ul className="home-subject-list">
        {
          props.subject.map((item) => (
            <li className="home-subject-item" v-for="item in subject" key={item.id} >
              <Link to={'/theme/' + item.id}>
                <img className="home-subject-img" src={item.url2} alt="" />
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default HomeSubject;