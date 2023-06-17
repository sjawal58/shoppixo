/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./components/Footer";
import NavSearch from "./components/Header/NavSearch";
import TopNav from "./components/Header/TopNav";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/UserAuth/Login";
import Register from "./pages/UserAuth/Register";
import Profile from "./pages/UserPages/Profile/Profile"
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProfileEdit from "./pages/UserPages/Profile/ProfileEdit";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProductsAction, AllProductsLoaderAction } from "./redux/products/ProductsAction";
import CartPage from "./pages/CartPage/CartPage";
import DeliveryEdit from "./pages/UserPages/Profile/DeliveryEdit";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import Dashboard from "./pages/UserPages/Dashboard/Dashboard";
import CategoriesProducts from "./pages/CategoriesProducts/CategoriesProducts";
import NavSearchData from "./components/Header/NavSearchData/NavSearchData";

function App() {

  const dispatch = useDispatch();

  const isTokenAvailableState = useSelector((state) => state.tokenAvailable);
  const { productsList } = useSelector((state) => state.productsList);

  const navSearchQuery = useSelector((state) => state.navSearchQuery)

  useEffect(() => {
    if (productsList?.length == 0) {
      dispatch(AllProductsLoaderAction());
      dispatch(GetAllProductsAction());
    }
  }, [])

  return (
    <div className="App">
      <ToastContainer style={{ zIndex: 99999 }} />
      <BrowserRouter>
        <TopNav />
        <NavSearch />
        {
          navSearchQuery != '' && (
            <div className="app_container">
              <NavSearchData />
            </div>
          )
        }
        <Routes>
          <Route path="/product-detail/:product_name" element={<ProductDetail show={false} />} />
          {
            navSearchQuery == '' && (
              <>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/products/:category_name" element={<CategoriesProducts />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/cart" element={<CartPage />} />
                {
                  isTokenAvailableState == true && <>
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/edit-profile" element={<ProfileEdit />} />
                    <Route exact path="/edit-delivery" element={<DeliveryEdit />} />
                    <Route exact path="/checkout" element={<CheckoutPage />} />
                  </>
                }
                <Route path="*" element={<ErrorPage />} />
              </>
            )
          }
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
