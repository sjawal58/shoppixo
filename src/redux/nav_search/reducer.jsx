/* eslint-disable no-unused-vars */
import { SEARCH_QUERY, SEARCH_QUERY_REMOVE } from "../actionTypes";

const initialState = '';

const NavSerchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_QUERY:
      const value = action.payload;
      console.log("NavSerchReducer-value: " + value);
      return value
    case SEARCH_QUERY_REMOVE:
      return initialState;
    default:
      return state;
  }
};

export default NavSerchReducer;
