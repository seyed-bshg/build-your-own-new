import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import imgURL from "../../uri-constants";
import Option from "../../components/Option";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import * as constants from "../../uri-constants";
import axios from "axios";
import helpers from "../../helpers";
import doubleArrow from '../../img/icons/double-down-arrow.png';


import {
  selectedOption,
  clickedNext,
  clickedPrev,
  clickedPrevToJourney,
} from "../../redux/actions";

const Feature = ({ name, keyName, items, listDescription, CDN_URI, CDN_URI_VIDEO, defaultGroupImage, defaultGroupVideo }) => {
  const [choiceCopy, setChoiceCopy] = useState("");
  const [choiceImage, setChoiceImage] = useState("");
  const [choiceVideo, setChoiceVideo] = useState("");
  const [isToggled, setToggled] = useState(false);
  let isDirty = useSelector((state) => state.requestData.isDirty);
  let order = useSelector((state) => state.requestData.order);
  let step = useSelector((state) => state.requestData.step);
  let choice = useSelector((state) => state.requestData.choiceID);
  let productList = useSelector((state) => state.requestData.reducedProducts);
  let listValues = useSelector((state) => state.requestData.listValues);
  let meta = useSelector((state) => state.requestData.meta);

  const dispatch = useDispatch();
  //React Router for Prev/Next buttons
  const history = useHistory();

  // text toggle
  const toggleTrueFalse = () => setToggled(!isToggled);

  //ComponentDidMount() and ComponentShouldUpdate() Equivalent
  // Getting the feature copy on selecting an option

  useEffect(() => {
    if (!!choice === true) {
      let selectedChoice = items.filter((item) => item.listItemID === choice);
      const { listTxt, listImg, listVd } = selectedChoice[0];
      console.log('selectedChoice[0]; ', selectedChoice[0])
      setChoiceCopy(listTxt);
      setChoiceImage(listImg);
      setChoiceVideo(listVd);
      axios.post(`${constants.LOG_URI}`, {
        logIID: `${selectedChoice[0].listItemID}`,
        logdetails: `FEATURE SELECTION`,
        loginName: ""
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }, [choice, items, isDirty]);


  //Seleting an Option
  const onSelectChoice = (e) => {
    // window.scrollTo(0, 0)
    
    const value = Number(e.target.value);
    // Needs to set choiceCopy and choiceImage
    dispatch(selectedOption(value));
  };

  const clickedPrevHandler = () => {
    setChoiceImage("");
    setChoiceCopy("");
    setChoiceVideo("");
    let reducedListValues = listValues.filter(
      (listValue) => listValue.listID === order[step]
    );

    // console.log(reducedListValues[0])
    
    axios.post(`${constants.LOG_URI}`, {
      logIID: `${reducedListValues[0].listID}`,
      logdetails: `PREVIOUS SELECTION`,
      loginName: ""
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });

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
      // console.log('reducedListValues[0] ', reducedListValues[0])

      axios.post(`${constants.LOG_URI}`, {
        logIID: `${reducedListValues[0].listID}`,
        logdetails: `NEXT SELECTION`,
        loginName: ""
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
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
          <legend className="sr-only">{listDescription}</legend>
            <div className="c-feature__description-text-wrapper">
              <p className="c-feature__description-text">
                {listDescription}
              </p>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="c-feature">
        <div className="c-feature__options c-feature__options--desktop">
          <fieldset className="c-feature__description c-feature__description--desktop">
          <legend className="sr-only">{listDescription}</legend>
            <div className="c-feature__description-text-wrapper">
              <p className="c-feature__description-text">
                {listDescription}
              </p>
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
        <div className="c-feature__wrapper">
          <div className="c-feature__img">
            <div className="o-aspect o-aspect--536x590 u-spacing-flush u-text-center c-feature__img-desktop">
              
              {defaultGroupVideo && !isDirty ? (
                <video controls autoPlay loop={true} key={defaultGroupVideo} style={{top: '-25%'}}>
                
                  <source src={CDN_URI_VIDEO + defaultGroupVideo}
                            type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                </video>
                ) : (
                  choiceVideo ? (
                    <video controls autoPlay loop={true} key={choiceVideo} style={{top: '-25%'}}>
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
                          key={choiceImage}
                          alt={choiceImage}
                        />
                      </div>
                    ) : (
                        defaultGroupVideo ? (
                          <video controls autoPlay loop={true} key={defaultGroupVideo} style={{top: '-25%'}}>
                            <source src={CDN_URI_VIDEO + defaultGroupVideo}
                                      type="video/mp4" />
                              Sorry, your browser doesn't support embedded videos.
                          </video>
                        ) : (

                          <div>
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
                          alt={"placeholder" + choiceImage}
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
                  <div className="c-description__toggle" onClick={toggleTrueFalse}><img src={doubleArrow} alt="double arrow"/></div>
                  <p
                    className="c-description__text u-spacing-none"
                    dangerouslySetInnerHTML={helpers.createMarkup(choiceCopy)}
                  >
                  
                  </p>

                </div>
              ) : null}
          </div>

        </div>
        <div className="c-feature__options c-feature__options--mobile">
          <fieldset className="c-feature__description c-feature__description--desktop">
            <div className="c-feature__description-text-wrapper">
              <p className="c-feature__description-text">
                {listDescription}
              </p>
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
