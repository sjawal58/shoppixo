/* eslint-disable no-unused-vars */
import { GET_ALL_PRODUCTS, ALL_PRODUCTS_LOADER, } from "../actionTypes"
import axios from "axios";
import { URL } from "../../env";

export const GetAllProductsAction = () => {
    return async (dispatch) => {
        var productsList = [];
        var isLoading = false;
        var isError = false;
        var errorMessage = null;

        await axios({
            method: 'GET',
            url: URL + "/products-by-category",
        }).then((response) => {
            const allProducts = response.data.data;
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: {
                    productsList: allProducts,
                    isLoading,
                    isError,
                    errorMessage,
                },  
            });
        }).catch((error) => {
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: {
                    productsList,
                    isLoading,
                    isError,
                    errorMessage,
                },
            });
        })
    }
}


export const AllProductsLoaderAction = () => {
    return (dispatch) => {
        dispatch({ type: ALL_PRODUCTS_LOADER, });
    };
};