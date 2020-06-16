// These must be the first lines in src/index.js
// cross browser polyfills
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import $ from "jquery";

// library css imports
import 'react-tippy/dist/tippy.css'


// React
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { requestData } from "./redux/productsReducer";

const rootReducer = combineReducers({ requestData });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
$.ajax({
    url: 'https://bshpersona.com/personaAPI/data/GetBYOData',
    type: 'GET',
    dataType: 'json',
    headers: {
			
    },
    contentType: 'application/json; charset=utf-8',
    success: function (result) {
    	 console.log('succes ', result)
       window.data = result.ProductBuilder;
	     ReactDOM.render(
				  <React.StrictMode>
				    <Provider store={store}>
				      <Router>
				        <App />
				      </Router>
				    </Provider>
				  </React.StrictMode>,
				  document.getElementById("root")
				);
    },
    error: function (error) {
        ReactDOM.render(
			  <h1>Sorry, there was an error retrieving the data. Please try again</h1>,
			  document.getElementById("root")
			);
    }
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
