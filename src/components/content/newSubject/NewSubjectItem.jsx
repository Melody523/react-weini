import React, {PureComponent} from 'react';
import './style.less';
import BScroll from 'better-scroll';
import { Link } from 'react-router-dom';

class NewSubjectItem extends PureComponent {
  constructor(props) {
    super(props);
    // this.state = {
    //   scroll: null //用来保存创建的BScroll对象
    // };
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    new BScroll(this.scrollRef.current, {
      scrollX: true,
      eventPassthrough: 'vertical',
    })
  }
  render() {
    return (
      <div className="goods-list-container" ref={this.scrollRef} >
        <div className="goods-list-content">
          <ul className="goods-list">
            {
              this.props.goodsList.map((goods) => (
                <Link to={'/goodsDetail/' + goods.goodsNo} key={goods.goodsNo}>
                  <li className="goods-item" >
                    <img className="goods-img" src={goods.imgUrl} alt="" />
                    {
                      goods.realStock <= 0 && <span className="no-goods">已抢光</span>
                    }
                    <div className="goods-title text-overflow2">{goods.goodsName}</div>
                    <div className="goods-price">￥{goods.showPrice}</div>
                  </li> 
                </Link>
              ))
            }
            <Link to={'/theme/' + this.props.id}>
              <li className="get-more-container">
                <img className="get-more-icon" src={require('assets/img/common/more.svg')} alt="" />
                <div className="get-more">查看更多</div>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

export default NewSubjectItem;