/* eslint-disable no-unused-vars */
import { DELIVERY_ADDRESS_ADD, DELIVERY_ADDRESS_REMOVE, } from "../actionTypes"

export const AddDeliveryAddressAction = (formData) => {
    return (dispatch) => {
        dispatch({
            type: DELIVERY_ADDRESS_ADD,
            payload: formData
        })
    }
}


export const RemoveDeliveryAddressAction = () => {
    return (dispatch) => {
        dispatch({
            type: DELIVERY_ADDRESS_REMOVE,
        })
    }
}