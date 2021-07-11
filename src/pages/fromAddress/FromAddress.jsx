import React, { PureComponent } from 'react';
import './style.less';
import Scroll from 'components/common/scroll/Scroll';

import AddressNavBar from './childComps/AddressNavBar';
import AddressList from './childComps/AddressList';

import { addressMo } from 'network/address';

class FromAddress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addressList: []
    }
  }
  componentDidMount() {
    this.getAddressMo();
  }
  render() {
    const { addressList } = this.state;
    return (
      <div className="from-address">
        <AddressNavBar title="收货地址" control="添加新地址" />
        <Scroll classContent="from-address-content" probeType={3} >
          <AddressList addressList={addressList} toAddAddresspage={() => {this.toAddAddresspage()}} />
        </Scroll>
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  getAddressMo() {
    addressMo().then(res => {
      this.setState({
        addressList: res.result
      });
    })
  }
  toAddAddresspage() {
    this.props.history.push('/addAddress');
  }
}

export default FromAddress;
