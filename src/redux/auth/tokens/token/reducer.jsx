/* eslint-disable no-unused-vars */
import { TOKEN_SET } from "../../../actionTypes";

const initialState = false;

const tokenAvailable = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_SET:
      const tokenStorage = action.payload;
      // localStorage.setItem("token123", action.payload);
      console.warn("redux-token123: " + tokenStorage);
      return tokenStorage === undefined ||
        tokenStorage === null ||
        tokenStorage === "null" ||
        tokenStorage === "" ||
        tokenStorage === "[object Object]" ||
        localStorage.getItem('username') == null ||
        localStorage.getItem('username') == undefined ||
        localStorage.getItem('user_id') == null ||
        localStorage.getItem('user_id') == undefined
        ? false
        : true;
    default:
      return state;
  }
};

export default tokenAvailable;
