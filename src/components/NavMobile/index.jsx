import React from 'react';
import { useSelector } from "react-redux";

const NavMobile = (step, listValues, order) => {  

return (
    <nav>
      {order
        ? order.map((order, index) => {
          let listThing = listValues.filter(listValue => listValue.listID === order);
          return(
            <p  key={index} className={index + 1 === step ? "order-active" : "order"}>
              {listThing[0].listName}
            </p>
        )} )
        : null}
      {order && step > 0 ? (
        <p className={step > order.length ? "order-active" : "order"}>
          summary
        </p>
      ) : null}
    </nav>
  )
};


export default NavMobile;