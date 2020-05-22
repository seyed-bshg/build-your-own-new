import React from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clickedStartOver } from "../../redux/actions";
import helpers from "../../helpers";

const Summary = () => {
  console.log(helpers)
  // Should only have one product when we come to this component
  // Will put into useState hook
  let finalProduct = useSelector((state) => state.requestData.reducedProducts);

  finalProduct = finalProduct[0];
  const dispatch = useDispatch();
  console.log('finalProduct ', finalProduct)
  // Restting State Values
  const onStartOverHandler = () => {
    console.log('onStartOverHandler ')
    dispatch(clickedStartOver());
  };

  const opennewone = (type, SKU) => {
    console.log('type ', type)
    console.log('SKU ', SKU)
    let BASE_URI = 'https://www.bosch-home.com/us/';
    let link = '';
    if(type === "dealer") {
      link = `dealer-locator?product=${SKU}`
    } else if(type === "learn") {
      link = `search-result?search=${SKU}`
    } else {
      link = ''
    }
    let fullLink = BASE_URI + link;
    console.log()
    window.open(`${fullLink}`, "_blank")
  };

  return (
    <div className="c-feature">
      <div className="c-feature__options c-feature__options--summary">

        <div className="c-feature__description">
          <div className="c-feature__description-text-wrapper c-feature__description-text-wrapper--summary">
            <p className="c-feature__description-text c-feature__description-text--summary">We think this dishwasher suits you best!</p>
            <span className="u-type-bold">
              {finalProduct.productTitle}
              </span>
          </div>
          
        </div>
        {/* USPs came with <strong> tags */}
        {/* Component USP's? */}
        {/* Some USPs retrieved from XML are null. */}
            {finalProduct.usp_1
            ? <div className="c-feature__description">
                <div className="c-feature__description-text-wrapper c-feature__description-text-wrapper--summary">
                  <span className="c-feature__description-text c-feature__description-text--summary" dangerouslySetInnerHTML={helpers.createMarkup(finalProduct.usp_1.replace(/(<([^>]+)>)/gi, ""))}>
                  </span>
                </div>
              </div>
            : null}

            {finalProduct.usp_2
            ? <div className="c-feature__description">
                <div className="c-feature__description-text-wrapper c-feature__description-text-wrapper--summary">
                  <span className="c-feature__description-text c-feature__description-text--summary" dangerouslySetInnerHTML={helpers.createMarkup(finalProduct.usp_2.replace(/(<([^>]+)>)/gi, ""))}>
                  </span>
                </div>
              </div>
            : null}
            {finalProduct.usp_3
            ? <div className="c-feature__description">
                <div className="c-feature__description-text-wrapper c-feature__description-text-wrapper--summary">
                  <span className="c-feature__description-text c-feature__description-text--summary" dangerouslySetInnerHTML={helpers.createMarkup(finalProduct.usp_3.replace(/(<([^>]+)>)/gi, ""))}>
                  </span>
                </div>
              </div>
            : null}
            {finalProduct.usp_4
            ? <div className="c-feature__description">
                <div className="c-feature__description-text-wrapper c-feature__description-text-wrapper--summary">
                  <span className="c-feature__description-text c-feature__description-text--summary" dangerouslySetInnerHTML={helpers.createMarkup(finalProduct.usp_4.replace(/(<([^>]+)>)/gi, ""))}>
                  </span>
                </div>
              </div>
            : null}
            {finalProduct.usp_5
            ? <div className="c-feature__description">
                <div className="c-feature__description-text-wrapper c-feature__description-text-wrapper--summary">
                  <span className="c-feature__description-text c-feature__description-text--summary" dangerouslySetInnerHTML={helpers.createMarkup(finalProduct.usp_5.replace(/(<([^>]+)>)/gi, ""))}>
                  </span>
                </div>
              </div>
            : null}
            
          </div>
      <div className="c-feature__wrapper">
        <div className="c-summary__price-wrapper">
          <p className="c-summary__price">{`${helpers.formatter.format(finalProduct.MSRP)}`}</p>
        </div>
        <div className="c-summary__img-wrapper">
          <div className="o-aspect o-aspect--536x590 o-aspect--smaller u-spacing-flush u-text-center">
            <div className="c-summary__img" style={{backgroundImage: `url(http://media3.bosch-home.com/Product_Shots/900x506/${finalProduct.productImage})`}} alt="dishwasher" />
          </div>
        </div>
        

        <div className="c-btn__summary-wrapper">
          
          <button className="c-btn c-btn--summary" onClick={onStartOverHandler}>Start Over</button>
          <button className="c-btn c-btn--summary" onClick={() => opennewone('learn', `${finalProduct.SKU}`)}>Learn more</button>
          <button className="c-btn c-btn--summary" onClick={() => opennewone('dealer', `${finalProduct.SKU}`)}>Where to buy</button>
        </div>
        
      </div>
    </div>
  );
};

export default Summary;
