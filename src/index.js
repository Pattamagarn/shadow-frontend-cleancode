import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Home from './pages/home/Home'
import SignIn from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'
import ForgotPassword from './pages/forgot-password/ForgotPassword'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/edit-profile/EditProfile'
import GeneralProduct from './pages/general-product/GeneralProduct'
import PromotionProduct from './pages/promotion-product/PromotionProduct'
import AuctionProduct from './pages/auction-product/AuctionProduct'
import GachaProduct from './pages/gacha-product/GachaProduct'
import GeneralProductDetail from './pages/general-product/GeneralProductDetail';
import AuctionProductDetail from './pages/auction-product/AuctionProductDetail';
import PromotionProductDetail from './pages/promotion-product/PromotionProductDatial';
import TopUp from './pages/top-up/TopUp'
import StoreProduct from './pages/store-product/StoreProduct'
import Transaction from './pages/transaction/Transaction'
import Analysis from './pages/analysis/Analysis'
import GeneralManagement from './pages/general-management/GeneralManagement'
import MemberManagement from './pages/member-management/MemberManagement'
import ProductManagement from './pages/product-management/ProductManagement'
import AddAuctionProduct from './pages/add-product/AddAuctionProduct'
import AddBanner from './pages/add-product/AddBanner'
import AddGachaProduct from './pages/add-product/AddGachaProduct'
import AddGameName from './pages/add-product/AddGameName'
import AddGeneralProduct from './pages/add-product/AddGeneralProduct'
import EditAuctionProduct from './pages/edit-product/EditAuctionProduct'
import EditBanner from './pages/edit-product/EditBanner'
import EditGachaProduct from './pages/edit-product/EditGachaProduct'
import EditGameName from './pages/edit-product/EditGameName'
import EditGeneralProduct from './pages/edit-product/EditGeneralProduct'
import EditImagePaymentMethod from './pages/edit-product/EditImagePaymentMethod'
import EditVideoPaymentMethod from './pages/edit-product/EditVideoPaymentMethod'

document.body.className = 'font-Kanit'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route exact path='/sign-in' element={<SignIn />} />
          <Route exact path='/sign-up' element={<SignUp />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/edit-profile' element={<EditProfile />} />
          <Route exact path='/general-product' element={<GeneralProduct />} />
          <Route exact path='/general-product-item/:uuid' element={<GeneralProductDetail />} />
          <Route exact path='/promotion-product' element={<PromotionProduct />} />
          <Route exact path='/promotion-product-item/:uuid' element={<PromotionProductDetail />} />
          <Route exact path='/auction-product' element={<AuctionProduct />} />
          <Route exact path='/auction-product-item/:uuid' element={<AuctionProductDetail />} />
          <Route exact path='/gacha-product' element={<GachaProduct />} />
          <Route exact path='/top-up' element={<TopUp />} />
          <Route exact path='/store-product' element={<StoreProduct />} />
          <Route exact path='/transaction' element={<Transaction />} />
          <Route exact path='/analysis' element={<Analysis />} />
          <Route exact path='/general-management' element={<GeneralManagement />} />
          <Route exact path='/member-management' element={<MemberManagement />} />
          <Route exact path='/product-management' element={<ProductManagement />} />
          <Route exact path='/add-auction-product' element={<AddAuctionProduct />} />
          <Route exact path='/add-banner' element={<AddBanner />} />
          <Route exact path='/add-gacha-product' element={<AddGachaProduct />} />
          <Route exact path='/add-game-name' element={<AddGameName />} />
          <Route exact path='/add-general-product' element={<AddGeneralProduct />} />
          <Route exact path='/edit-auction-product/:uuid' element={<EditAuctionProduct />} />
          <Route exact path='/edit-banner/:uuid' element={<EditBanner />} />
          <Route exact path='/edit-gacha-product/:uuid' element={<EditGachaProduct />} />
          <Route exact path='/edit-game-name/:uuid' element={<EditGameName />} />
          <Route exact path='/edit-general-product/:uuid' element={<EditGeneralProduct />} />
          <Route exact path='/edit-image-payment-method/:uuid' element={<EditImagePaymentMethod />} />
          <Route exact path='/edit-video-payment-method/:uuid' element={<EditVideoPaymentMethod />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
