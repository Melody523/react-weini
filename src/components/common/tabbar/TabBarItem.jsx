import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class TabBarItem extends PureComponent {
  render() {
    return (
      <div className="tab-bar-item">
        {!(this.props.isActive === this.props.path) && this.props.tabBarIcon}
        {(this.props.isActive === this.props.path || (this.props.isActive === '/' && this.props.path === '/home')) && this.props.tabBarIconActive}
        {
          this.props.isActive !== this.props.path ? this.props.tabBarTitle : this.props.activeTitle
        }
        
      </div>
    )
  }
}

const mapState = (state) => ({
  isActive: state.getIn(['home', 'isActive'])
})

export default connect(mapState, null)(TabBarItem);
