import React from 'react';
import './style.less'

function NavBar(props) {
  return (
    <>
      {props.left}
      {props.center}
      {props.right}
      {/* <div className="left">{props.left}</div>
      <div className="center">{props.center}</div>
      <div className="right">{props.right}</div> */}
    </>
  )
}

export default NavBar