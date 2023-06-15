/* eslint-disable no-unused-vars */
import {  TOKEN_EXPIRY_TIME } from "../../../actionTypes";

export const isTokenExpiryTime = () => {
  return {
    type: TOKEN_EXPIRY_TIME,
    payload: localStorage.getItem("token_expiry_time"),
  };
}
