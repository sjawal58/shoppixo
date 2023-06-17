import React from "react"
import { Redirect } from "react-router-dom"

// Authentication 
import Login from "../pages/Auth/Login"
import RegisterSeller from "../pages/Auth/RegisterSeller"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Error Page
import Page404 from "../pages/Utility/Page404"

import AdminsList from "pages/Administration/Admin/AdminsList"
import AdminCreate from "pages/Administration/Admin/AdminCreate"
import SellersList from "pages/Administration/Seller/SellersList"


import ProductsList from "pages/Ecommerce/Products/ProductsList"
import ProductCreate from "pages/Ecommerce/Products/ProductCreate"
import ProductEdit from "pages/Ecommerce/Products/ProductEdit"

import CategoriesList from "pages/Ecommerce/Categories/CategoriesList"
import CreateCategory from "pages/Ecommerce/Categories/CreateCategory"
import EditCategory from "pages/Ecommerce/Categories/EditCategory"
import OrdersList from "pages/Ecommerce/Orders/OrdersList"
import OrderView from "pages/Ecommerce/Orders/OrderView"
import UserProfile from "pages/UserProfile/UserProfile"


const userRoutes = [
  { path: "/", component: Dashboard },
  { path: "/dashboard", component: Dashboard },
  { path: "/profile", component: UserProfile },
  {
    path: "/admins/list", component: AdminsList
  },
  {
    path: "/admin/create", component: AdminCreate
  },
  {
    path: "/sellers/list", component: SellersList
  },
  {
    path: "/products/list", component: ProductsList
  },
  {
    path: "/product/create", component: ProductCreate
  },
  {
    path: "/product/edit/:id", component: ProductEdit
  },
  {
    path: "/categories/list", component: CategoriesList
  },
  {
    path: "/category/create", component: CreateCategory

  },
  {
    path: "/category/edit/:id", component: EditCategory
  },
  {
    path: "/orders/list", component: OrdersList
  },
  {
    path: "/order/view/:order_id", component: OrderView
  },

  /** Error Page */
  { path: "*", component: Page404 },
  /** This route should be at the end of all other routes */
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const authRoutes = [
  { path: "/login", component: Login },
  { path: "/register-seller", component: RegisterSeller },
  // { path: "/", component: Login },
  // { path: "*", component: Page404 },
];

export { userRoutes, authRoutes }
