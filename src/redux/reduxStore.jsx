import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from "./combineReducers";

const middleware = [thunk]

/** whitelist: => iss array ma wo reducers liknay hain jin jin ko localstorage ma save rakhna ha. */
const persistConfig = {
    key: 'persist-store',
    storage,
    whitelist: ['productsCart', 'deliveryAddress',],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store)
export default store;
