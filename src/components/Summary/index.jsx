import React from "react";
import SurveyModal from "../SurveyModal";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { clickedStartOver } from "../../redux/actions";
import searchIcon from "../../img/icons/search-icon.svg";
import startIcon from "../../img/icons/start-over-icon.svg";
import whereIcon from "../../img/icons/where-to-buy-icon.svg";
import helpers from "../../helpers";
import axios from "axios";
import * as constants from "../../uri-constants";
import Cookies from "universal-cookie";
import { useCookies } from "react-cookie";
const cookies = new Cookies();

const Summary = () => {
  // Should only have one product when we come to this component
  // Will put into useState hook
  const history = useHistory();
  let finalProducts = useSelector((state) => state.requestData.reducedProducts);
  const meta = useSelector((state) => state.requestData.meta);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalHasBeenOpened, setHasBeenOpened] = React.useState(false);
  // finalProduct = finalProduct[0];
  const dispatch = useDispatch();

  //Andrew's COOKIES
  const [modalCookie, setModalCookies] = useCookies(["seenModal"]);

  React.useEffect(() => {
    axios
      .post(`${constants.LOG_URI}`, {
        logIID: "",
        logdetails: `SUMMARY`,
        loginName: "",
      })
      .then(function (response) {
        //        console.log(response)
      })
      .catch(function (error) {
        //       console.log(error);
      });
  }, []);

  // Restting State Values
  const onStartOverHandler = () => {
    history.push("/");
    dispatch(clickedStartOver());
  };
  function openModal() {
    document.body.classList.add("modal-open");
    // Andrew Cookies
    setModalCookies("seenModal", "true", {
      path: "/",
    });
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // cookies.set('loggedIn', loggedIn, { path: '/', maxAge: time );

    // console.log(cookies);
    // cookies.set('loggedIn', loggedIn, { path: '/', maxAge: time });
    if (
      cookies.get("survey") === null ||
      cookies.set("survey", { maxAge: "200", path: "/" })
    );
    // console.log('afterOpenModal')
  }
  function closeModal() {
    cookies.set("survey", { maxAge: "200", path: "/" });
    document.body.classList.remove("modal-open");
    setIsOpen(false);
  }

  function hasBeenOpened() {
    setHasBeenOpened(true);
    cookies.remove("survey");
    if (cookies.get("survey") !== null) {
      closeModal();
    }
  }

  function handleAfterCloseFunc() {
    setIsOpen(false);
    hasBeenOpened(true);
  }

  function handleSubmit(event) {
    // cookies.remove('survey');
    event.preventDefault();
    const data = new FormData(event.target);
    let formData = new FormData(event.target);

    const mydata = new FormData(event.target);
    // NOTE: you access FormData fields with `data.get(fieldName)`
    const Q1 = mydata.get("Q1") || "";
    const Q2 = mydata.get("Q2") || "";
    const Q3 = mydata.get("Q3") || "";
    const Q4 = mydata.getAll("Q4").toString() || "";
    const Q5 = mydata.get("Q5").toString() || "";

    let bodyFormData = {};
    let bodyidentifier = {
      typeID: 173,
      Q1: Q1,
      Q2: Q2,
      Q3: Q3,
      Q4: Q4,
      Q1Text: Q5,
    };
    for (var [key, value] of formData.entries()) {
      bodyFormData.key = value;
      // console.log('key ', key)
      // console.log('value ', value)
    }

    // console.log('JSON.stringify ', JSON.stringify(bodyidentifier))
    // console.log('bodyidentifier ', bodyidentifier)

    axios({
      method: "post",
      url:
        "/data/SendSurveyData?cid=campaignName~buildyourowndishwasher~2021~SendSurveyData~bsh",
      data: bodyidentifier,
      config: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      contentType: "application/json; charset=utf-8",
    })
      .then((res) => closeModal())
      .catch((error) => closeModal())
      .then(() => closeModal());
  }

  Modal.setAppElement("html");

  const opennewone = (type, SKU) => {
    let BASE_URI = "https://www.bosch-home.com/us/";
    let link = "";
    if (type === "dealer") {
      link = `dealer-locator?product=${SKU}?cid=campaignName~buildyourowndishwasher~2021~dealer-locator~bsh

`;
    } else if (type === "learn") {
      link = `productslist/${SKU}?cid=campaignName~buildyourowndishwasher~2021~learn~bsh`;
    } else {
      link = BASE_URI;
    }
    let fullLink = BASE_URI + link;
    window.open(`${fullLink}`, "_blank");
  };

  if (!modalIsOpen && !modalHasBeenOpened && !modalCookie.seenModal) {
    setTimeout(() => {
      openModal();
    }, 15000);
    hasBeenOpened(true);
  }

  //
  //ADD SURVEY HERE USING LOCAL STATE

  return (
    <div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onAfterClose={handleAfterCloseFunc}
          contentLabel="Example Modal"
          overlayClassName={"ReactModal__Overlay"}
          bodyOpenClassName={"ReactModal__Body--open"}
          contentLabel={
            "Survey modal; how was your experience building a dishwasher?"
          }
        >
          <button onClick={closeModal}>close</button>
          <h2 className="c-heading-26">
            Please answer the following questions:
          </h2>

          <form
            className="c-form"
            onSubmit={handleSubmit}
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            onMouseOver={(e) => e.stopPropagation()}
          >
            <ol className="o-list-unstyled">
              <li>
                <fieldset className="form-row form-row-fullwidth">
                  <legend className="sr-only">
                    How was the experience of building your dishwasher?
                  </legend>
                  <h2 className="a-heading">
                    How was the experience of building your dishwasher?{" "}
                    <sup className="sub">*</sup>{" "}
                  </h2>
                  {/* http://bshpersona.com/personaAPI/data/SendSurveyData
                      data['typeID']='173';d
                      data[textarea]= x.value || ''; on ALL textfield as they are not required

                   */}
                </fieldset>
                <h2 className="m-forminput m-forminput-radio had-focus">
                  <fieldset>
                    <legend className="sr-only">Extremely Easy</legend>
                    <input
                      required
                      type="radio"
                      id="1"
                      name="Q1"
                      value="Extremely Easy"
                    />
                    <label htmlFor="1">Extremely Easy</label>
                  </fieldset>
                </h2>

                <h2 className="m-forminput m-forminput-radio had-focus">
                  <fieldset>
                    <legend className="sr-only">Very Easy</legend>
                    <input
                      required
                      type="radio"
                      id="2"
                      name="Q1"
                      value="Very Easy"
                    />
                    <label htmlFor="2">Very Easy</label>
                  </fieldset>
                </h2>

                <h2 className="m-forminput m-forminput-radio had-focus">
                  <fieldset>
                    <legend className="sr-only">Somewhat Easy</legend>
                    <input
                      required
                      type="radio"
                      id="3"
                      name="Q1"
                      value="Somewhat Easy"
                    />
                    <label htmlFor="3">Somewhat Easy</label>
                  </fieldset>
                </h2>

                <h2 className="m-forminput m-forminput-radio had-focus">
                  <fieldset>
                    <legend className="sr-only">Somewhat Difficult</legend>
                    <input
                      required
                      type="radio"
                      id="4"
                      name="Q1"
                      value="Somewhat Difficult"
                    />
                    <label htmlFor="4">Somewhat Difficult</label>
                  </fieldset>
                </h2>

                <h2 className="m-forminput m-forminput-radio had-focus">
                  <fieldset>
                    <legend className="sr-only">Very Difficult</legend>
                    <input
                      required
                      type="radio"
                      id="5"
                      name="Q1"
                      value="Very Difficult"
                    />
                    <label htmlFor="5">Very Difficult</label>
                  </fieldset>
                </h2>
              </li>

              <li>
                <fieldset className="form-row form-row-fullwidth">
                  <legend className="sr-only">
                    Were you able to build the right dishwasher for you?
                  </legend>
                  <h2 className="a-heading">
                    Were you able to build the right dishwasher for you?{" "}
                    <sup className="sub">*</sup>{" "}
                  </h2>
                  <div className="m-forminput m-forminput-radio had-focus">
                    <input required type="radio" id="6" name="Q2" value="Yes" />
                    <label htmlFor="6">Yes</label>
                  </div>
                  <div className="m-forminput m-forminput-radio had-focus">
                    <input required type="radio" id="7" name="Q2" value="No" />
                    <label htmlFor="7">No</label>
                  </div>
                </fieldset>
              </li>

              <li>
                <fieldset className="form-row form-row-fullwidth">
                  <h2 className="a-heading">
                    How likely are you to purchase the dishwasher(s) you built?{" "}
                    <sup className="sub">*</sup>{" "}
                  </h2>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Extremely likely</legend>
                      <input
                        required
                        type="radio"
                        id="8"
                        name="Q3"
                        value="Extremely likely"
                      />
                      <label htmlFor="8">Extremely likely</label>
                    </fieldset>
                  </div>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Very likely</legend>
                      <input
                        required
                        type="radio"
                        id="9"
                        name="Q3"
                        value="Very Easy"
                      />
                      <label htmlFor="9">Very likely</label>
                    </fieldset>
                  </div>
                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Somewhat likely</legend>
                      <input
                        required
                        type="radio"
                        id="10"
                        name="Q3"
                        value="Somewhat Easy"
                      />
                      <label htmlFor="10">Somewhat likely</label>
                    </fieldset>
                  </div>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Not Very Likely</legend>
                      <input
                        required
                        type="radio"
                        id="11"
                        name="Q3"
                        value="Somewhat Difficult"
                      />
                      <label htmlFor="11">Not very likely</label>
                    </fieldset>
                  </div>
                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only"> Not at all likely</legend>
                      <input
                        required
                        type="radio"
                        id="12"
                        name="Q3"
                        value="Very Difficult"
                      />
                      <label htmlFor="12">Not at all likely</label>
                    </fieldset>
                  </div>
                </fieldset>
              </li>
              <li>
                <fieldset className="form-row form-row-fullwidth">
                  <h2 className="a-heading">
                    What are your Top 5 categories when purchasing a dishwasher?{" "}
                    <sup className="sub">*</sup>{" "}
                  </h2>
                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Flexibility</legend>
                      <input
                        type="checkbox"
                        id="13"
                        name="Q4"
                        value="Flexibility"
                      />
                      <label htmlFor="13">Flexibility</label>
                    </fieldset>
                  </div>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Quiet</legend>
                      <input type="checkbox" id="14" name="Q4" value="Quiet" />
                      <label htmlFor="14">Quiet</label>
                    </fieldset>
                  </div>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Drying</legend>
                      <input type="checkbox" id="15" name="Q4" value="Drying" />
                      <label htmlFor="15">Drying</label>
                    </fieldset>
                  </div>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Design</legend>
                      <input type="checkbox" id="16" name="Q4" value="Design" />
                      <label htmlFor="16">Design</label>
                    </fieldset>
                  </div>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Price</legend>
                      <input type="checkbox" id="17" name="Q4" value="Price" />
                      <label htmlFor="17">Price</label>
                    </fieldset>
                  </div>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Energy Star</legend>
                      <input
                        type="checkbox"
                        id="18"
                        name="Q4"
                        value="Energy Star"
                      />
                      <label htmlFor="18">Energy Star</label>
                    </fieldset>
                  </div>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Consumer Reviews</legend>
                      <input
                        type="checkbox"
                        id="19"
                        name="Q4"
                        value="Consumer Reviews"
                      />
                      <label htmlFor="19">Consumer Reviews</label>
                    </fieldset>
                  </div>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">
                        Smart Appliance/Connected Appliance
                      </legend>
                      <input
                        type="checkbox"
                        id="20"
                        name="Q4"
                        value="Smart Appliance/Connected Appliance"
                      />
                      <label htmlFor="20">
                        Smart Appliance/Connected Appliance
                      </label>
                    </fieldset>
                  </div>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Brand</legend>
                      <input type="checkbox" id="21" name="Q4" value="Brand" />
                      <label htmlFor="21">Brand</label>
                    </fieldset>
                  </div>

                  <div className="m-forminput m-forminput-radio had-focus">
                    <fieldset>
                      <legend className="sr-only">Other</legend>
                      <input type="checkbox" id="22" name="Q4" value="Other" />
                      <label htmlFor="22">Other</label>
                    </fieldset>
                  </div>
                </fieldset>
                <fieldset className="form-row form-row-fullwidth">
                  <legend className="sr-only">
                    Any additional comments or suggestions to help us improve
                    the "Build Your Own" dishwasher?
                  </legend>
                  <h2 className="a-heading">
                    Any additional comments or suggestions to help us improve
                    the "Build Your Own" dishwasher?
                  </h2>
                  <label htmlFor="23" className="u-sr-only">
                    suggestions
                  </label>
                  <textarea
                    id="23"
                    fullWidth={true}
                    name="Q5"
                    rows="4"
                    cols="50"
                    maxLength="800"
                    placeholder="Your feedback
                      is appreciated"
                  ></textarea>
                </fieldset>
              </li>
            </ol>
            <button className="" type="submit">
              submit
            </button>
          </form>
        </Modal>
      </div>
      <div>
        <p
          className="c-heading-28 u-spacing-40"
          dangerouslySetInnerHTML={helpers.createMarkup(meta.summaryHeader)}
        ></p>
      </div>
      {finalProducts.map((finalProduct, finalProductsIndex) => {
        return (
          <div className="u-spacing-40" key={finalProduct.productID}>
            <div
              className="u-position-align-self"
              style={{ paddingBottom: "30px" }}
            >
              <span className="u-type-bold c-heading-18">
                {finalProduct.productTitle}
              </span>
            </div>

            <div className="c-feature" key={finalProductsIndex}>
              <div className="c-feature__options c-feature__options--summary">
                {/* USPs came with <strong> tags */}
                {/* Component USP's? */}
                {/* Some USPs retrieved from XML are null. */}
                {finalProduct.usp_1 ? (
                  <div className="c-feature__description">
                    <div className="c-feature__description-text-wrapper c-feature__description-text-wrapper--summary">
                      <span
                        className="c-feature__description-text c-feature__description-text--summary"
                        dangerouslySetInnerHTML={helpers.createMarkup(
                          finalProduct.usp_1.replace(/(<([^>]+)>)/gi, "")
                        )}
                      ></span>
                    </div>
                  </div>
                ) : null}

                {finalProduct.usp_2 ? (
                  <div className="c-feature__description">
                    <div className="c-feature__description-text-wrapper c-feature__description-text-wrapper--summary">
                      <span
                        className="c-feature__description-text c-feature__description-text--summary"
                        dangerouslySetInnerHTML={helpers.createMarkup(
                          finalProduct.usp_2.replace(/(<([^>]+)>)/gi, "")
                        )}
                      ></span>
                    </div>
                  </div>
                ) : null}
                {finalProduct.usp_3 ? (
                  <div className="c-feature__description">
                    <div className="c-feature__description-text-wrapper c-feature__description-text-wrapper--summary">
                      <span
                        className="c-feature__description-text c-feature__description-text--summary"
                        dangerouslySetInnerHTML={helpers.createMarkup(
                          finalProduct.usp_3.replace(/(<([^>]+)>)/gi, "")
                        )}
                      ></span>
                    </div>
                  </div>
                ) : null}
                {finalProduct.usp_4 ? (
                  <div className="c-feature__description">
                    <div className="c-feature__description-text-wrapper c-feature__description-text-wrapper--summary">
                      <span
                        className="c-feature__description-text c-feature__description-text--summary"
                        dangerouslySetInnerHTML={helpers.createMarkup(
                          finalProduct.usp_4.replace(/(<([^>]+)>)/gi, "")
                        )}
                      ></span>
                    </div>
                  </div>
                ) : null}
                {finalProduct.usp_5 ? (
                  <div className="c-feature__description">
                    <div className="c-feature__description-text-wrapper c-feature__description-text-wrapper--summary">
                      <span
                        className="c-feature__description-text c-feature__description-text--summary"
                        dangerouslySetInnerHTML={helpers.createMarkup(
                          finalProduct.usp_5.replace(/(<([^>]+)>)/gi, "")
                        )}
                      ></span>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="c-feature__wrapper">
                <div className="c-summary__img-wrapper">
                  <div className="o-aspect  o-aspect--smaller u-spacing-flush u-text-center">
                    <div
                      className="c-summary__img"
                      style={{
                        backgroundImage: `url(https://media3.bosch-home.com/Product_Shots/900x506/${finalProduct.productImage})`,
                      }}
                      alt="dishwasher"
                    />
                  </div>
                  <div className="c-summary__price-wrapper">
                    <h2 className="c-summary__price u-type-bold">{`${helpers.formatter.format(
                      finalProduct.MSRP
                    )}`}</h2>
                  </div>
                </div>

                <div className="c-btn__summary-wrapper">
                  <button
                    className="c-btn c-btn--summary"
                    onClick={onStartOverHandler}
                  >
                    <div className="c-btn-summary__text">
                      {meta.startOverText}
                    </div>
                    <img
                      className="c-btn-summary__img u-img-respond u-spacing-none"
                      src={startIcon}
                      alt="start icon"
                    />
                  </button>
                  <button
                    className="c-btn c-btn--summary-learnmore"
                    onClick={() => opennewone("learn", `${finalProduct.SKU}`)}
                  >
                    <div className="c-btn-summary__text">
                      {meta.learnMoreText}
                    </div>
                    <img
                      className="c-btn-summary__img u-img-respond u-spacing-none"
                      src={searchIcon}
                      alt="Search Icon"
                    />
                  </button>
                  <button
                    className="c-btn c-btn--summary"
                    onClick={() => opennewone("dealer", `${finalProduct.SKU}`)}
                  >
                    <div className="c-btn-summary__text">
                      {meta.where2BuyText}
                    </div>
                    <img
                      className="c-btn-summary__img u-img-respond u-spacing-none"
                      src={whereIcon}
                      alt="Where Icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Summary;
