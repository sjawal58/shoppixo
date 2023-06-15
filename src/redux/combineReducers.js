import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

import tokenAvailable from "./auth/tokens/token/reducer";
import tokenExpiry from './auth/tokens/tokenexpire/reducer'
import validateUserData from "./auth/validator/validatorReducer";

const rootReducer = combineReducers({
  // public
  Layout,
  // Auth
  tokenAvailable,
  tokenExpiry,
  validateUserData,
})

export default rootReducer
