import React from 'react';

function TabBar(props) {
  return (
    <div className="tab-bar-list">
      { props.children }
    </div>
  );
}

export default TabBar;
