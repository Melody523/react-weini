
import React, { PureComponent } from 'react';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar';

class UseHelp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      useHelpList: [
        {
          title: '跨境介绍',
          path: '/intro'
        },
        {
          title: '常见问题',
          path: '/normalProblem'
        },
        {
          title: '优惠券说明',
          path: '/couponintro'
        },
        {
          title: '售后说明',
          path: '/server'
        }
      ]
    }
  }
  componentDidMount() {
    
  }
  render() {
    const { useHelpList } = this.state;
    return (
      <div className="use-help" v-if="useHelpList.length">
        <MainNavBar title="使用帮助" goBack={() => {this.goBack()}} />
        <div className="use-help-content">
          <ul className="use-help-list">
            {
              useHelpList.map((item, index) => (
                <li className="use-help-item" key={index} onClick={() => {this.toPage(item.path)}}>
                  <span className="title">{item.title}</span>
                  <img className="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="" />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  toPage(path) {
    this.props.history.push('/intro' + path);
  }
}

export default UseHelp;
