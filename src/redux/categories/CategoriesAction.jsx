/* eslint-disable no-unused-vars */
import { GET_CATEGORIES, CATEGORIES_LOADER, } from "../actionTypes"
import axios from "axios";
import { URL } from "../../env";

export const categoriesAction = () => {
    return async (dispatch) => {
        var categoriesList = [];
        var isLoading = false;
        var isError = false;
        var errorMessage = null;

        await axios({
            method: 'GET',
            url: URL + "/categories",
        }).then((response) => {
            const allCategories = response.data.data;
            dispatch({
                type: GET_CATEGORIES,
                payload: {
                    categoriesList: allCategories,
                    isLoading,
                    isError,
                    errorMessage,
                },
            });
        }).catch((error) => {
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: GET_CATEGORIES,
                payload: {
                    categoriesList,
                    isLoading,
                    isError,
                    errorMessage,
                },
            });
        })
    }
}


export const categoriesLoaderAction = () => {
    return (dispatch) => {
        dispatch({ type: CATEGORIES_LOADER, });
    };
};