import { VALIDATOR_CHECK } from "../../actionTypes"

const initialState = {
    userData: null,
};

const validatorReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case VALIDATOR_CHECK:
            return {
                validateUserData: payload.data
            }
        default:
            return state;
    }
};

export default validatorReducer;
