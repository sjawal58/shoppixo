/* eslint-disable no-unused-vars */
import { SEARCH_QUERY, SEARCH_QUERY_REMOVE } from "../actionTypes";

export const NavSearchValue = (value) => {
  return {
    type: SEARCH_QUERY,
    payload: value,
  };
}


export const ClearNavSearchValue = (value) => {
  return {
    type: SEARCH_QUERY_REMOVE,
  };
}
