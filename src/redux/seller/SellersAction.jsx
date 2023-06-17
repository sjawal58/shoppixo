/* eslint-disable no-unused-vars */
import { GET_SELLERS, } from "../actionTypes"
import axios from "axios";
import { URL } from "../../env";

export const sellersAction = () => {
    return async (dispatch) => {
        var sellersList = [];
        var isLoading = false;
        var isError = false;
        var errorMessage = null;

        await axios({
            method: 'GET',
            url: URL + "/sellers",
        }).then((response) => {
            const allSellers = response.data.data;
            const newSellers = [];
            allSellers.map((seller) => {
                newSellers.push({
                    seller_id: seller._id,
                    firstname: seller.firstname,
                    lastname: seller.lastname,
                    fullname: seller.firstname + " " + (seller?.lastname || ""),
                    shop_name: seller?.shop_name || null,
                })
            })
            dispatch({
                type: GET_SELLERS,
                payload: {
                    sellersList: newSellers,
                    isLoading,
                    isError,
                    errorMessage,
                },
            });
        }).catch((error) => {
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: GET_SELLERS,
                payload: {
                    sellersList,
                    isLoading,
                    isError,
                    errorMessage,
                },
            });
        })
    }
}
