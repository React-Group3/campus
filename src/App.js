import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import Homepage from './pages/homepage/homepage';
import Basket from './Components/Basket/Basket';
import Checkout from './pages/checkout/checkout';
import Profile from './pages/Profile/profilepage';
import AddItem from './pages/additem/additem';
import SearchResults from './Components/SearchResults/SearchResults.jsx';
// import OrderConfirmation from './pages/orderconfirmation/orderconfirmation';<Route path="/orderconfirm" element = {<OrderConfirmation />} />
import Seller from './pages/seller/seller.jsx';
import { ProductProvider } from './contexts/ProductContext';

import './App.css';


function App() {
  return (
    <ProductProvider>
      <div>
        <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/Basket" element={<Basket />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/checkout" element={<Checkout />}/>
          <Route path="/profilepage" element={<Profile />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/SearchResults" element={<SearchResults />} />
          <Route path="/seller" element={<Seller />} />
        </Routes>
        </BrowserRouter>
      </div>
      </ProductProvider>
  );
}

export default App;
