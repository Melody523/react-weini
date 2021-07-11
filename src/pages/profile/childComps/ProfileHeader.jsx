import React from 'react';
import './style.less';

function ProfileHeader(props) {
  return (
    <div className="profile-header" onClick={() => {props.toPersonPage()}}>
      <img className="profile-header-bg" src="http://www.weinihaigou.com/m-images/my-header-bg.jpg" alt="" />
      <div className="profile-header-content">
        <img className="profile-img" src={props.userMessage.headUrl} alt="" />
        <p className="profile-name">{props.userMessage.nickName}</p>
      </div>
    </div>
    );
}

export default ProfileHeader;