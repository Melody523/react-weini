import React from 'react';
import './style.less';

function LoginHeader(props) {
  return (
    <div className="login-header">
      <img className="login-bg" onClick={() => {props.goBack()}} src="http://www.weinihaigou.com/m-images/login-bg.jpg" alt="" />
      <img className="back-icon" src="http://www.weinihaigou.com/m-images/header-back-white.png" alt="" />
    </div>
  );
}

export default LoginHeader;