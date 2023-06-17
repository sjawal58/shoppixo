/* eslint-disable no-unused-vars */
import { TOKEN_EXPIRY_TIME } from '../../../actionTypes'

const initialState = 0;

const tokenExpiry = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_EXPIRY_TIME:
      const tokenExpirStorage = action.payload;
      console.log("redux-token_expiry_time: " + tokenExpirStorage);
      return {
        ...(state !== 0
          ? {
            ...state,
            expire_time:
              tokenExpirStorage == undefined ||
                tokenExpirStorage == null ||
                tokenExpirStorage == "null" ||
                tokenExpirStorage == "" ||
                tokenExpirStorage == "[object Object]" ||
                tokenExpirStorage == "undefined"
                ? (true,
                  localStorage.removeItem("token123"),
                  localStorage.removeItem("token_expiry_time"),
                  localStorage.removeItem("username"),
                  localStorage.removeItem("user_id")
                )
                : new Date(Date().toLocaleString()) > new Date(tokenExpirStorage)
                  ? (true,
                    localStorage.removeItem("token123"),
                    localStorage.removeItem("token_expiry_time"),
                    localStorage.removeItem("username"),
                    localStorage.removeItem("user_id")
                  )
                  :
                  false,
          }
          : 0),
      };
    // return tokenExpirStorage;
    default:
      return state;
  }
};

export default tokenExpiry;
