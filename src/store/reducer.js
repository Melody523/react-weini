import { combineReducers } from 'redux-immutable';
import Home from 'pages/home/store/reducer';
import Category from 'pages/category/store/reducer';
import Cart from 'pages/cart/store/reducer';
import Profile from 'pages/profile/store/reducer';
import Theme from 'pages/theme/store/reducer';
import Country from 'pages/country/store/reducer';
import OtherStore from 'pages/otherStore/reducer';
import BrandGoods from 'pages/brandGoods/store/reducer';
import GoodsDetail from 'pages/goodsDetail/store/reducer';
import Login from 'pages/login/store/reducer';

export default combineReducers({
  home: Home,
  category: Category,
  cart: Cart,
  profile: Profile,
  theme: Theme,
  country: Country,
  otherStore: OtherStore,
  brandGoods: BrandGoods,
  goodsDetail: GoodsDetail,
  login: Login
})