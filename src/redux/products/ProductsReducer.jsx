/* eslint-disable no-unused-vars */
import { GET_ALL_PRODUCTS, ALL_PRODUCTS_LOADER, } from "../actionTypes"

const initialState = {
    productsList: [],
    singleListProducts: [],
    isLoading: true,
    isError: false,
    errorMessage: null,
};

const productsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_PRODUCTS:
            let allProductsList = [];
            payload.productsList.map((item) =>
                allProductsList.push(...item?.products)
            )
            return {
                ...state,
                productsList: payload.productsList,
                singleListProducts: allProductsList,
                isLoading: payload.isLoading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        case ALL_PRODUCTS_LOADER: {
            return {
                ...state,
                isLoading: true,
            }
        }
        default: {
            return state;
        }
    }
};

export default productsReducer;