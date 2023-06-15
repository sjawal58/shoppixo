/* eslint-disable no-unused-vars */
import { GET_CATEGORIES, CATEGORIES_LOADER, } from "../actionTypes"

const initialState = {
    categoriesList: [],
    isLoading: true,
    isError: false,
    errorMessage: null,
};

const CategoriesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categoriesList: payload.categoriesList,
                isLoading: payload.isLoading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        case CATEGORIES_LOADER: {
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

export default CategoriesReducer;