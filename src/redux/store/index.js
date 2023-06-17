import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import thunk from "redux-thunk";

import rootReducer from "../combineReducers"
import rootSaga from "../combineSagas"

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [thunk, sagaMiddleware]

const store = createStore(
  rootReducer,
  // composeEnhancers(applyMiddleware(sagaMiddleware))
  composeEnhancers(applyMiddleware(...middlewares))
)
sagaMiddleware.run(rootSaga)

export default store
