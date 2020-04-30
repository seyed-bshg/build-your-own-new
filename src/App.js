import React, { useCallback, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { requestData, requestJSON } from "./redux/actions";
import Home from "./components/Home";
import Feature from "./components/Feature";
import Summary from "./components/Summary";
import json from "./what.json";
import "./App.css";

function App() {
  // REACT REDUX HOOK
  const dispatch = useDispatch();

  /**************** COMMENTED CODE BELOW  IS USED FOR CALLING THE API*************************/
  const onRequestData = useCallback(() => dispatch(requestData()), [dispatch]);
  useEffect(() => {
    console.log(onRequestData);
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
  console.log("data", data);

  return (
    <div className="App">
      {/* Steps Navigation Indicator STYLED CAUSE I JUST NEEDED TO SEE WHAT I WAS DOING*/}
      <div className="order-wrapper">
        {/* {order
          ? order.map((order, index) => {
            let listThing = listValues.filter(listValue => listValue.listID === order);
            console.log('listName' + listThing.listName)
            return(
              <p  key={index} className={index + 1 === step ? "order-active" : "order"}>
                {listThing.listName}
              </p>
          )} )
          : null} */}
        {/* {order && step > 0 ? (
          <p className={step > order.length ? "order-active" : "order"}>
            summary
          </p>
        ) : null} */}
      </div>

      <Switch>
        {/* Dynamically creating routes */}
        {listValues.map((listValue) => (
          <Route key={listValue.listItemID} exact path={`/${listValue.listID}`}>
            <Feature
              keyName={listValue.keyName}
              key={listValue.listItemID}
              name={listValue.listName}
              items={listValue.listItems}
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
  );
}

export default App;
