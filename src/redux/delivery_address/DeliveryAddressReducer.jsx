/* eslint-disable no-unused-vars */
import { DELIVERY_ADDRESS_ADD, DELIVERY_ADDRESS_REMOVE, } from "../actionTypes"

const initialState = {
    isDevileryAddress: false,
    full_name: null,
    email: null,
    phone_number: null,
    address: null,
    province: null,
    city: null,
    delivery_label: null,
};

const DeliveryAddressReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case DELIVERY_ADDRESS_ADD:
            const data = payload;
            if (data?.firstname && data.lastname && data?.email && data?.phone_number && data?.province && data?.city && data?.delivery_label) {
                state.isDevileryAddress = true;
            } else {
                state.isDevileryAddress = false;
            }
            const devileryData = {
                full_name: data?.firstname + " " + data.lastname,
                email: data?.email,
                phone_number: data?.phone_number,
                address: data?.address,
                province: data?.province,
                city: data?.city,
                delivery_label: data?.delivery_label,
            };
            return {
                ...state,
                ...devileryData,
            };
        case DELIVERY_ADDRESS_REMOVE: {
            return {
                state,
            }
        }
        default: {
            return state;
        }
    }
};

export default DeliveryAddressReducer;