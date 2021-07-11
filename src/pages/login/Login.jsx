import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import * as ActionCreator from './store/ActionCreator';
import './style.less';

import LoginHeader from './childComps/LoginHeader';
import LoginInput from './childComps/LoginInput';

class Login extends PureComponent {
  componentDidMount() {
    
  }
  componentDidUpdate() {
    if (this.props.isLogin) {
      this.props.history.replace('/home');
    }
  }
  render() {
    return (
      <div className="login">
        <LoginHeader goBack={() => {this.goBack()}} />
        <LoginInput toRegisterPage={() => {this.toRegisterPage()}} toFindPswPage={() => {this.toFindPswPage()}} />
      </div>
    )
  }
  goBack() {
    this.props.history.go(-1);
  }
  toRegisterPage() {
    this.props.history.push('/register');
  }
  toFindPswPage() {
    this.props.history.push('/findPsw');
  }
}

const mapState = (state) => ({
  isLogin: state.getIn(['login', 'isLogin'])
});

export default connect(mapState, null)(Login);
