import { combineReducers } from "redux";

import tokenAvailable from "./auth/tokens/token/reducer";
import tokenExpiry from './auth/tokens/tokenexpire/reducer'
import validateUserData from "./auth/validator/validatorReducer";
import NavSerchReducer from "./nav_search/reducer";

import SellersReducer from "./seller/SellersReducer"
import CategoriesReducer from "./categories/CategoriesReducer"
import ProductsReducer from "./products/ProductsReducer"
import CartPageReducer from "./cart_page/CartPageReducer"
import DeliveryAddressReducer from "./delivery_address/DeliveryAddressReducer"

const reducers = combineReducers({
    tokenAvailable,
    tokenExpiry,
    validateUserData,
    navSearchQuery: NavSerchReducer,
    sellersData: SellersReducer,
    categoriesList: CategoriesReducer,
    productsList: ProductsReducer,
    productsCart: CartPageReducer,
    deliveryAddress: DeliveryAddressReducer,
});

export default reducers;