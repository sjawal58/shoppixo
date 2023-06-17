/* eslint-disable no-unused-vars */
import { ADD_CART_ITEM, INCREMENT_ITEM_QUANTITY, DECREMENT_ITEM_QUANTITY, REMOVE_CART_ITEM, DELETE_TOTAL_CART, } from "../actionTypes"

const initialState = {
    cartGrandTotal: 0,
    cartItemsList: [],
    cartItem: null,
};

const CartPageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_CART_ITEM:
            console.log("ADD_CART_ITEM --------- Reducer:", payload)
            if (state.cartItemsList.length == 0) {
                state.cartGrandTotal = 0;
            }
            const newPayloadObject = {
                product_id: payload?.product_id,
                details: {
                    name: payload?.name,
                    image: payload?.image,
                    description: payload?.description,
                },
                prod_price: payload.prod_price,
                quantity: payload.quantity,
                seller_id: payload.seller_id,
                itemQtyTotal: parseFloat((payload.prod_price * payload.quantity).toFixed(2))
            };
            const totalAddedCartPrice = (state.cartGrandTotal * 1) + (payload.prod_price * payload.quantity * 1);
            return {
                ...state,
                cartItemsList: [...state.cartItemsList, newPayloadObject],
                cartGrandTotal: totalAddedCartPrice.toFixed(2),
            };
        case INCREMENT_ITEM_QUANTITY: {
            console.log("INCREMENT_ITEM_QUANTITY --------- Reducer:", payload)
            const addItemQuantity = state.cartItemsList.filter((prod) =>
                prod.product_id == payload.product_id
                    ? ((prod.quantity = payload.quantity),
                        (prod.itemQtyTotal = parseFloat(
                            (payload.quantity * prod.prod_price).toFixed(2)
                        )))
                    : (prod.quantity, prod.itemQtyTotal)
            );
            console.log("INCREMENT_ITEM_QUANTITY --------- Reducer-cartAddItemQuantity:", addItemQuantity)
            const totalCartPriceInc = ((state.cartGrandTotal * 1) + (payload.prod_price * 1));
            console.log("INCREMENT_ITEM_QUANTITY --------- Reducer-totalCartPriceInc:", totalCartPriceInc)
            return {
                ...state,
                cartItemsList: addItemQuantity,
                cartGrandTotal: totalCartPriceInc?.toFixed(2),
            }
        }
        case DECREMENT_ITEM_QUANTITY: {
            console.log("DECREMENT_ITEM_QUANTITY --------- Reducer:", payload)
            const addItemQuantity = state.cartItemsList.filter((prod) =>
                prod.product_id == payload.product_id
                    ? ((prod.quantity = payload.quantity),
                        (prod.itemQtyTotal = parseFloat(
                            (payload.quantity * prod.prod_price).toFixed(2)
                        )))
                    : (prod.quantity, prod.itemQtyTotal)
            );
            console.log("DECREMENT_ITEM_QUANTITY --------- Reducer-cartAddItemQuantity:", addItemQuantity)
            const totalCartPriceDec = ((state.cartGrandTotal * 1) - (payload.prod_price * 1));
            return {
                ...state,
                cartItemsList: addItemQuantity,
                cartGrandTotal: totalCartPriceDec.toFixed(2),
            }
        }
        case REMOVE_CART_ITEM: {
            const findRemoveItem = state.cartItemsList.find((prod) => prod.product_id == payload.product_id)
            const totalCartPriceDec = ((state.cartGrandTotal * 1) - (findRemoveItem?.prod_price * findRemoveItem?.quantity * 1));
            const removeItemFromCart = state.cartItemsList.filter((prod) => prod.product_id != payload.product_id)
            return {
                ...state,
                cartItemsList: removeItemFromCart,
                cartGrandTotal: totalCartPriceDec.toFixed(2),
            }
        }
        case DELETE_TOTAL_CART: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};

export default CartPageReducer;