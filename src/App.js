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
  //   dispatch(requestJSON(json.ProductBuilder));
  // }, [dispatch]);

  const listValues = useSelector((state) => state.requestData.listValues);

  const order = useSelector((state) => state.requestData.order);
  const step = useSelector((state) => state.requestData.step);

  // Viewing the state
  const data = useSelector((state) => state.requestData);

  return (
    <div className="App">
      <div className="o-wrap">
        <div className="o-container">
          <Header />
            <nav className="c-nav__desktop-wrapper">
              <ul className={`c-nav__desktop o-list-unstyled ${order && step > 0 ? '' : 'u-hidden'}`}>
                {order
                  ? order.map((order, index) => {
                    let listThing = listValues.filter(listValue => listValue.listID === order);
                    return(
                      <li key={index} className={index + 1 === step ? "c-nav__desktop-item c-nav__desktop-item--active u-type-bold" : "c-nav__desktop-item"}>
                        {listThing[0].listName}
                      </li>
                  )} )
                  : null}
                {order && step > 0 ? (
                  <li className={step > order.length ? "c-nav__desktop-item c-nav__desktop-item--active u-type-bold" : "c-nav__desktop-item"}>
                    Summary
                  </li>
                ) : null}
              </ul>
            </nav>
             <nav className="c-nav__mobile-wrapper">

              <ul className={`c-nav__mobile o-list-unstyled ${order && step > 0 ? '' : 'u-hidden'}`}>
                {order
                  ? order.map((order, index) => {
                    let listThing = listValues.filter(listValue => listValue.listID === order);
                    return(
                      <li key={index} className={index + 1 === step ? "c-nav__mobile-item c-nav__mobile-item--active" : "c-nav__mobile-item"}>
                        {listThing[0].listName}
                      </li>
                  )} )
                  : null}
                {order && step > 0 ? (
                  <li className={step > order.length ? "c-nav__mobile-item c-nav__mobile-item--active" : "c-nav__mobile-item"}>
                    Summary
                  </li>
                ) : null}
              </ul>
            </nav>
            <Switch>
              {/* Dynamically creating routes */}
              {listValues.map((listValue, listValueIndex) => {
                return (
                  <Route key={listValue.listValueIndex} exact path={`/${listValue.keyName}`}>
                    <Feature
                      CDN_URI={constants.CDN_URI}
                      CDN_URI_VIDEO={constants.CDN_URI_VIDEO}
                      meta={listValue}
                      keyName={listValue.keyName}
                      key={listValue.listItemID}
                      name={listValue.listName}
                      items={listValue.listItems}
                      listDescription={listValue.listDescription}
                      defaultGroupImage={listValue.listGroupImg}
                      defaultGroupVideo={listValue.listGroupvideoID}
                    />
                  </Route>
                  )
              } 
              )}
              {step > order.length - 1 ? (
                <Route path="/summary">
                  <Summary />
                </Route>
              ) :  null
              }
              {/* HOME ROUTE */}
              <Route exact path="/">
                <Home />
              </Route>
              <Redirect to="/" />
            </Switch>

        </div>
      </div>
      <hr />
      <footer className="c-footer o-container">
        <ul className="c-footer__list o-list-unstyled">
          <li className="c-footer__item">
            <a href="https://www.bosch-home.com/us/about/imprint" target="_blank"><span>Imprint</span></a>
          </li>
          <li className="c-footer__item">
            <a href="https://www.bosch-home.com/us/about/imprint/legal" target="_blank"><span>Legal</span></a>
          </li>
          <li className="c-footer__item">
            <a href="https://www.bosch-home.com/us/about/imprint/privacypolicy" target="_blank"><span>Privacy Policy &amp; Data Protection Notice</span></a>
          </li>
          <li className="c-footer__item">
            <a href="https://www.bosch-home.com/us/experience-bosch/report_a_vulnerability" target="_blank"><span>Report a Vulnerability</span></a>
          </li>
        </ul>
          
      </footer>
    </div>
  );
}

export default App;
