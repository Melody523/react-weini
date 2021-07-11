import React, { PureComponent } from 'react';
import './style.less';
import BScroll from 'better-scroll';

class Scroll extends PureComponent {
  constructor(props) {
    super(props);
    // this.state = {
    //   scroll: null //用来保存创建的BScroll对象
    // };
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    let _props = this.props;
    const scroll = new BScroll(this.scrollRef.current, {
      click: true,//用来监听div标签的点击事件
      probeType: this.props.probeType,
      pullUpLoad: this.props.pullUpLoad
    })
    //监听滚动的位置
    scroll.on('scroll', (position) => {
      // console.log(position)
    })

    //监听上拉事件
    scroll.on('pullingUp', () => {
      _props.pullingUp(scroll);
    })
  }

  componentWillUnmount() {

  }
  //滚动到某个位置，通过设置time来决定滚动的速度
  // scrollTo(x, y, time = 300) {
  //   scroll.scrollTo(x, y, time)
  // }

  // //发送网络请求，等数据请求完成并且将数据展示出来后需要调用，否则无法见到下一次的上拉事件
  // finishPullUp() {
  //   scroll.finishPullUp()
  // }
  // //等数据挂载后调用重新获取content的高度，防止内容加载不全
  // refresh() {
  //   scroll.refresh()
  // }

  render() {
    return (
      <div className={this.props.classContent + ' wrapper'} ref={this.scrollRef}>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Scroll;