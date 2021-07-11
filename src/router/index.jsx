import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const MainTabBar = lazy(() => import('components/content/mainTabBar/MainTabBar.jsx'));
const Home = lazy(() => import('pages/home/Home'));
const Category = lazy(() => import('pages/category/Category'));
const Cart = lazy(() => import('pages/cart/Cart'));
const Profile = lazy(() => import('pages/profile/Profile'));
const Theme = lazy(() => import('pages/theme/Theme'));
const Country = lazy(() => import('pages/country/Country'));
const BrandSearch = lazy(() => import('pages/brandSearch/BrandSearch'));
const BrandGoods = lazy(() => import('pages/brandGoods/BrandGoods'));
const GoodsDetail = lazy(() => import('pages/goodsDetail/GoodsDetail'));
const Login = lazy(() => import('pages/login/Login'));
const Register = lazy(() => import('pages/login/Register'));
const FindPsw = lazy(() => import('pages/login/FindPsw'));
const SetPsw = lazy(() => import('pages/login/SetPsw'));
const SetPswSuccess = lazy(() => import('pages/login/SetPswSuccess'));
const Protocol = lazy(() => import('pages/login/Protocol'));
const OrderList = lazy(() => import('pages/orderList/OrderList'));
const OrderDetail = lazy(() => import('pages/orderDetail/OrderDetail'));
const Search = lazy(() => import('pages/search/Search'));
const MessageCenter = lazy(() => import('pages/messageCenter/MessageCenter'));
const Public = lazy(() => import('pages/public/Public'));
const PublicDetail = lazy(() => import('pages/public/PublicDetail'));
const Coupon = lazy(() => import('pages/coupon/Coupon'));
const Collection = lazy(() => import('pages/collection/Collection'));
const UseHelp = lazy(() => import('pages/useHelp/UseHelp'));
const Intro = lazy(() => import('pages/useHelp/Intro'));
const Person = lazy(() => import('pages/person/Person'));
const Nickname = lazy(() => import('pages/person/Nickname'));
const ModifyMobile = lazy(() => import('pages/person/ModifyMobile'));
const ModifyMobileSuccess = lazy(() => import('pages/person/ModifyMobileSuccess'));
const ModifyPsw = lazy(() => import('pages/person/ModifyPsw'));
const ModifyPswSuccess = lazy(() => import('pages/person/ModifyPswSuccess'));
const SurePay = lazy(() => import('pages/surePay/SurePay'));
const FromAddress = lazy(() => import('pages/fromAddress/FromAddress'));
const AddAddress = lazy(() => import('pages/fromAddress/AddAddress'));


const RouteConfig = (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/category" component={Category}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/theme/:id" component={Theme}/>
        <Route path="/country" component={Country}/>
        <Route path="/brandSearch" component={BrandSearch}/>
        <Route path="/brandGoods" component={BrandGoods}/>
        <Route path="/goodsDetail/:id" component={GoodsDetail}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/findPsw" component={FindPsw}/>
        <Route path="/setPsw" component={SetPsw}/>
        <Route path="/setPswSuccess" component={SetPswSuccess}/>
        <Route path="/protocol" component={Protocol}/>
        <Route path="/orderList/:type" component={OrderList}/>
        <Route path="/orderDetail/:tradeNo" component={OrderDetail}/>
        <Route path="/search" component={Search}/>
        <Route path="/messageCenter" component={MessageCenter}/>
        <Route path="/public" component={Public}/>
        <Route path="/publicDetail/:id" component={PublicDetail}/>
        <Route path="/coupon" component={Coupon}/>
        <Route path="/collection" component={Collection}/>
        <Route path="/useHelp" component={UseHelp}/>
        <Route path="/intro/:name" component={Intro}/>
        <Route path="/person" component={Person}/>
        <Route path="/nickname" component={Nickname}/>
        <Route path="/modifyMobile" component={ModifyMobile}/>
        <Route path="/modifyMobileSuccess/:sign" component={ModifyMobileSuccess}/>
        <Route path="/modifyPsw" component={ModifyPsw}/>
        <Route path="/modifyPswSuccess" component={ModifyPswSuccess}/>
        <Route path="/surePay" component={SurePay}/>
        <Route path="/fromAddress" component={FromAddress}/>
        <Route path="/addAddress" component={AddAddress}/>
      </Switch>
      <MainTabBar />
    </Suspense>
  </Router>
);

export default RouteConfig;