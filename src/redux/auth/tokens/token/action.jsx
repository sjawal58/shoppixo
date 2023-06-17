/* eslint-disable no-unused-vars */
import { TOKEN_SET } from "../../../actionTypes";

export const isTokenAvailable = () => {
  return {
    type: TOKEN_SET,
    payload: localStorage.getItem("token123"),
  };
};
