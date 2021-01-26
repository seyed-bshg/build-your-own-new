// These must be the first lines in src/index.js
// cross browser polyfills
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { Helmet } from "react-helmet";

// library css imports
import "react-tippy/dist/tippy.css";

// React
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { requestData } from "./redux/productsReducer";
import { CookiesProvider } from "react-cookie";

const rootReducer = combineReducers({ requestData });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

class Application extends React.Component {
  render() {
    return (
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Bosch Dishwasher Builder</title>
        </Helmet>
        ...
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
