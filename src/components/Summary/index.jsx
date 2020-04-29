import React from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clickedStartOver } from "../../redux/actions";

const Summary = () => {
  // Should only have one product when we come to this component
  // Will put into useState hook
  let finalProduct = useSelector((state) => state.requestData.reducedProducts);
  finalProduct = finalProduct[0];
  const dispatch = useDispatch();

  // Restting State Values
  const onStartOverHandler = () => {
    dispatch(clickedStartOver());
  };

  return (
    <div>
      <p>
        We think this dishwasher suits you best
        <br />
        {finalProduct.productTitle}
      </p>
      {/* USPs came with <strong> tags */}
      {/* Component USP's? */}
      {/* Some USPs retrieved from XML are null. */}
      <p>
        {finalProduct.usp_1
          ? finalProduct.usp_1.replace(/(<([^>]+)>)/gi, "")
          : null}
      </p>
      <p>
        {finalProduct.usp_2
          ? finalProduct.usp_2.replace(/(<([^>]+)>)/gi, "")
          : null}
      </p>
      <p>
        {finalProduct.usp_3
          ? finalProduct.usp_3.replace(/(<([^>]+)>)/gi, "")
          : null}
      </p>
      <p>
        {finalProduct.usp_4
          ? finalProduct.usp_4.replace(/(<([^>]+)>)/gi, "")
          : null}
      </p>
      <p>
        {finalProduct.usp_5
          ? finalProduct.usp_5.replace(/(<([^>]+)>)/gi, "")
          : null}
      </p>
      <p>{finalProduct.msrp}</p>
      <img src={`http://media3.bosch-home.com/Product_Shots/600x337/${finalProduct.productImage}`} alt="dishwasher" />
      <Link to="/">
        <button onClick={onStartOverHandler}>Start Over</button>
      </Link>
      <button>Learn more</button>
      <button>Where to buy</button>
    </div>
  );
};

export default Summary;
