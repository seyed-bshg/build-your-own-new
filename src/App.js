import React, { useCallback, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { requestData, requestJSON } from "./redux/actions";
import Home from "./components/Home";
import Nav from "./components/Nav";
import NavMobile from "./components/NavMobile";
import Feature from "./components/Feature";
import Header from "./components/Header";
import Summary from "./components/Summary";
import * as constants from "./uri-constants";
import json from "./what.json";
import "./App.scss";

function App() {
  // REACT REDUX HOOK
  const dispatch = useDispatch();

  /**************** COMMENTED CODE BELOW  IS USED FOR CALLING THE API*************************/
  const onRequestData = useCallback(() => dispatch(requestData()), [dispatch]);
  useEffect(() => {
    onRequestData();
  }, [onRequestData]);
  /*******************************************************************************************/

  /* MADE MINOR EDITS TO API, BROUGHT IN JSON LOCALLY*/
  // useEffect(() => {
  //   // console.log(json.ProductBuilder)
  //   dispatch(requestJSON(json.ProductBuilder));
  // }, [dispatch]);

  const listValues = useSelector((state) => state.requestData.listValues);

  const order = useSelector((state) => state.requestData.order);
  const step = useSelector((state) => state.requestData.step);

  // Viewing the state
  const data = useSelector((state) => state.requestData);
  console.log(order, 'order')
  return (
    
    <div className="App">
      <div className="o-wrap">
        <div className="o-container">
          <Header />
          <nav>

            <ul className={`c-nav o-list-unstyled ${order && step > 0 ? '' : 'u-hidden'}`}>
              {order
                ? order.map((order, index) => {
                  let listThing = listValues.filter(listValue => listValue.listID === order);
                  return(
                    <li key={index} className={index + 1 === step ? "c-nav__item c-nav__item--active" : "c-nav__item"}>
                      {listThing[0].listName}
                    </li>
                )} )
                : null}
              {order && step > 0 ? (
                <li className={step > order.length ? "c-nav__item c-nav__item--active" : "c-nav__item"}>
                  summary
                </li>
              ) : null}
            </ul>
          </nav>
          <Switch>
            {/* Dynamically creating routes */}
            {listValues.map((l, index) => {
              // console.log('listValues ', l.keyName)
            })}
            {listValues.map((listValue) => (

              <Route key={listValue.listItemID} exact path={`/${listValue.listID}`}>
                <Feature
                  CDN_URI={constants.CDN_URI}
                  meta={listValue}
                  keyName={listValue.keyName}
                  key={listValue.listItemID}
                  name={listValue.listName}
                  items={listValue.listItems}
                  listDescription={listValue.listDescription}
                />
              </Route>
            ))}
            {step > 9 ? (
              <Route path="/summary">
                <Summary />
              </Route>
            ) : null}
            {/* HOME ROUTE */}
            <Route exact path="/">
              <Home />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
