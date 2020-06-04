import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import imgURL from "../../uri-constants";
import Option from "../../components/Option";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import helpers from "../../helpers";

import {
  selectedOption,
  clickedNext,
  clickedPrev,
  clickedPrevToJourney,
} from "../../redux/actions";

const Feature = ({ name, keyName, items, listDescription, meta, CDN_URI, CDN_URI_VIDEO, defaultGroupImage, defaultGroupVideo }) => {
  const [choiceCopy, setChoiceCopy] = useState("");
  const [choiceImage, setChoiceImage] = useState("");
  const [choiceVideo, setChoiceVideo] = useState("");
  let isDirty = useSelector((state) => state.requestData.isDirty);
  let order = useSelector((state) => state.requestData.order);
  let step = useSelector((state) => state.requestData.step);
  let choice = useSelector((state) => state.requestData.choiceID);
  let productList = useSelector((state) => state.requestData.reducedProducts);
  let listValues = useSelector((state) => state.requestData.listValues);

  const dispatch = useDispatch();
  //React Router for Prev/Next buttons
  const history = useHistory();


  //ComponentDidMount() and ComponentShouldUpdate() Equivalent
  // Getting the feature copy on selecting an option
  // console.log('items ======================== \n ', items);
  useEffect(() => {
    if (!!choice === true) {
      let selectedChoice = items.filter((item) => item.listItemID === choice);
      // console.log('selectedChoice ', selectedChoice)
      const { listTxt, listImg, listVd } = selectedChoice[0];
      setChoiceCopy(listTxt);
      setChoiceImage(listImg);
      setChoiceVideo(listVd);
    }
  }, [choice, items, isDirty]);

  //Seleting an Option
  const onSelectChoice = (e) => {
    const value = Number(e.target.value);
    // Needs to set choiceCopy and choiceImage
    dispatch(selectedOption(value));
  };

  const clickedPrevHandler = () => {
    setChoiceImage("");
    setChoiceCopy("");
    setChoiceVideo("");
    step > 1 ? dispatch(clickedPrev()) : dispatch(clickedPrevToJourney());
    history.goBack();
  };

  const clickedNextHandler = () => {
    window.scrollTo(0, 0);

    let reducedProductList = productList.filter(
      (product) => product[`${keyName}`] === choice
    );
    
    if (step === 1){
       reducedProductList = productList.filter(
        (product) => product[`${keyName}`] <= choice
      );
    }

    dispatch(clickedNext(reducedProductList, productList));
    setChoiceCopy("");
    setChoiceImage("");
    setChoiceVideo("");

    let nextURL = null;
    if (step < order.length) {
      let reducedListValues = listValues.filter(
        (listValue) => listValue.listID === order[step]
      );
      nextURL = reducedListValues[0].keyName;
    }

    step > order.length - 1
      ? history.push("summary")
      : history.push(`${nextURL}`);
  };

  // Helping logic to find disabled options
  // Disabling all of the options that you are unable to choose after making your selection and moving on to the next screen
  let setImage = defaultGroupImage;
  let disabledItems = [];
  if (step > 1) {
    let values = [];
    productList.forEach((product) => {
      if (!values[product[`${keyName}`]]) values.push(product[`${keyName}`]);
    });
    disabledItems = items.filter((item) => {
      return values.includes(item.listItemID);
    });
  }

  return (
    <div>
      <div className="c-feature">
        <div className="c-feature__options">
          <fieldset className="c-feature__description c-feature__description--mobile">
            <div className="c-feature__description-text-wrapper">
              <span className="c-feature__description-text">
                {listDescription}
              </span>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="c-feature">
        <div className="c-feature__options c-feature__options--desktop">
          <fieldset className="c-feature__description c-feature__description--desktop">
            <div className="c-feature__description-text-wrapper">
              <span className="c-feature__description-text">
                {listDescription}
              </span>
            </div>
          </fieldset>
          {items.map((item) => (
            <Option
              key={item.listItemID}
              name={name}
              value={item.listItemID}
              label={item.listItemValue}
              clicked={onSelectChoice}
              disabled={step > 1 ? !disabledItems.includes(item) : false}
            />
          ))}
        </div>
        <div className="c-feature__wrapper">
          <div className="c-feature__img">
            <div className="o-aspect o-aspect--536x590 o-aspect--smaller u-spacing-flush u-text-center c-feature__img-desktop">
              
              {defaultGroupVideo ? (
                  <video controls autoPlay loop={true} key={defaultGroupVideo} style={{top: '-25%'}}>
                     {console.log('defaultGroupVideo ', defaultGroupVideo)}
                    <source src={CDN_URI_VIDEO + defaultGroupVideo}
                            type="video/mp4" />

                    Sorry, your browser doesn't support embedded videos.
                </video>
                ) : (
                  choiceVideo ? (
                    <video controls autoPlay loop={true} key={choiceVideo} style={{top: '-25%'}}>
                      {console.log('choiceVideo ', choiceVideo)}
                      <source src={CDN_URI_VIDEO + choiceVideo}
                              type="video/mp4" />

                      Sorry, your browser doesn't support embedded videos.
                  
                  </video>

                  ) : (
                    choiceImage ? (
                      <div>
                        {console.log('choiceImage ', choiceImage)}

                        <img
                          className="u-img-respond u-img-respond--80"
                          src={CDN_URI + choiceImage}
                          key={choiceImage}
                        />
                      </div>
                    ) : (
                      <div>
                      {console.log('defaultGroupImage ', defaultGroupImage)}
                        <img
                          className="u-img-respond u-img-respond--80"
                          src={CDN_URI + defaultGroupImage}
                          alt="placeholder"
                          key={defaultGroupImage}
                        />
                      </div>
                    )
                  )
                )
              }

            </div>

            <div className="c-feature__img-mobile">

              {defaultGroupVideo ? (
                  <video controls autoPlay loop={true}>

                    <source src={CDN_URI_VIDEO + defaultGroupVideo}
                            type="video/mp4" />

                    Sorry, your browser doesn't support embedded videos.
                </video>
                ) : (
                  choiceVideo ? (
                    <video controls autoPlay loop={true}>
                      <source src={CDN_URI_VIDEO + choiceVideo}
                              type="video/mp4" />

                      Sorry, your browser doesn't support embedded videos.
                  
                  </video>

                  ) : (
                    choiceImage ? (
                      <div>
                        <img
                          className="u-img-respond u-img-respond--80"
                          src={CDN_URI + choiceImage}
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          className="u-img-respond u-img-respond--80"
                          src={CDN_URI + defaultGroupImage}
                          alt="placeholder"
                        />
                      </div>
                    )
                  )
                )
              }
            </div>



            {choiceCopy ? (
              <div className="c-description__wrapper">
                <p
                  className="c-description__text u-spacing-none"
                  dangerouslySetInnerHTML={helpers.createMarkup(choiceCopy)}
                ></p>
              </div>
            ) : null}
          </div>

          {/* Button would be its own component */}
          <div className="c-btn__wrapper c-btn__wrapper--desktop">
            <Button click={clickedPrevHandler} direction="Previous" />
            <Button
              click={clickedNextHandler}
              direction="Next"
              disabled={!isDirty}
            />
          </div>

        </div>
        <div className="c-feature__options c-feature__options--mobile">
          <fieldset className="c-feature__description c-feature__description--desktop">
            <div className="c-feature__description-text-wrapper">
              <span className="c-feature__description-text">
                {listDescription}
              </span>
            </div>
            <span style={{ display: "none" }}>{name}</span>
          </fieldset>
          {items.map((item) => (
            <Option
              key={item.listItemID}
              name={name}
              value={item.listItemID}
              label={item.listItemValue}
              clicked={onSelectChoice}
              disabled={step > 1 ? !disabledItems.includes(item) : false}
            />
          ))}
        </div>
        {/* Button would be its own component */}
          <div className="c-btn__wrapper c-btn__wrapper--mobile">
            <Button click={clickedPrevHandler} direction="Previous" />
            <Button
              click={clickedNextHandler}
              direction="Next"
              disabled={!isDirty}
            />
          </div>
      </div>
    </div>
  );
};

export default Feature;
