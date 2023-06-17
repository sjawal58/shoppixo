/* eslint-disable no-unused-vars */
import { GET_SELLERS, } from "../actionTypes"

const initialState = {
    sellersList: [],
    isLoading: true,
    isError: false,
    errorMessage: null,
};

const SellersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_SELLERS:
            return {
                ...state,
                sellersList: payload.sellersList,
                isLoading: payload.isLoading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        default: {
            return state;
        }
    }
};

export default SellersReducer;