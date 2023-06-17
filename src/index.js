import React from "react"
import "./index.css"
import ReactDOM from "react-dom"
import App from "./App"
import "./locales/i18n"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
import * as serviceWorker from "./serviceWorker"
/** ******************* */
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-dropzone-uploader/dist/styles.css'
/** ******************* */

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()