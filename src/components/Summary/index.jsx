import React from "react";

import SurveyModal from '../SurveyModal';

import { Link, useHistory } from "react-router-dom";
import Modal from 'react-modal';
import { useSelector, useDispatch } from "react-redux";
import { clickedStartOver } from "../../redux/actions";
import searchIcon from '../../img/icons/search-icon.svg';
import startIcon from '../../img/icons/start-over-icon.svg';
import whereIcon from '../../img/icons/where-to-buy-icon.svg';
import helpers from "../../helpers";
import axios from 'axios';


const Summary = () => {
  // Should only have one product when we come to this component
  // Will put into useState hook
  const history = useHistory();
  let finalProducts = useSelector((state) => state.requestData.reducedProducts);
  const meta = useSelector((state) => state.requestData.meta);
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [modalHasBeenOpened,setHasBeenOpened] = React.useState(false);
  // finalProduct = finalProduct[0];
  const dispatch = useDispatch();

  // Restting State Values
  const onStartOverHandler = () => {
    history.push('/');
    dispatch(clickedStartOver());
  };
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log('modal open afterOpenModal')
  }
 
  function closeModal(){
    setIsOpen(false);
    hasBeenOpened();
  }

  function testModal() {
    console.log('test modal ')
  }

  function hasBeenOpened(){
    setHasBeenOpened(true);
  }
 
  function handleAfterCloseFunc(){
    setIsOpen(false);
    hasBeenOpened(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let formData = new FormData(event.target);

    const mydata = new FormData(event.target);
    // NOTE: you access FormData fields with `data.get(fieldName)`    
    const Q1 = mydata.get('Q1') || '';
    const Q2 = mydata.get('Q2') || '';
    const Q3 = mydata.get('Q3') || '';
    const Q4 = JSON.stringify(mydata.getAll('Q4')) || '';
    const Q5 = mydata.get('Q5') || '';
 
    let bodyFormData = {};
    let bodyidentifier = {
        "typeID": 173,
        "Q1": Q1,
        "Q2": Q2,
        "Q3": Q3,
        "Q4": Q4,
        "Q1Text": Q5
    };
    for (var [key, value] of formData.entries()) {
        bodyFormData.key = value;
        // console.log('key ', key)
        // console.log('value ', value)
    }

    // console.log('JSON.stringify ', JSON.stringify(bodyidentifier))
    // console.log('bodyidentifier ', bodyidentifier)

    axios({
      method: 'post',
      url: '/data/SendSurveyData',
      data: JSON.stringify(bodyidentifier),
      config: {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      },
      contentType: 'application/json; charset=utf-8'
      })
    .then((res) => closeModal())
    .catch((error) => closeModal())
    .then(() => closeModal())
  };

  Modal.setAppElement('html');

  const opennewone = (type, SKU) => {
    let BASE_URI = 'https://www.bosch-home.com/us/';
    let link = '';
    if(type === "dealer") {
      link = `dealer-locator?product=${SKU}`
    } else if(type === "learn") {
      link = `productslist/${SKU}`
    } else {
      link = BASE_URI
    }
    let fullLink = BASE_URI + link;
    window.open(`${fullLink}`, "_blank")
  };

  if(!modalIsOpen && !modalHasBeenOpened) {
      setTimeout(() => {
         openModal();
      }, 5000);
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
          contentLabel={"Survey modal; how was your experience building a dishwasher?"}
        >

          <button onClick={closeModal}>close</button>
          <h2 className="c-heading-26">Please answer the following questions:</h2>

          <form className="c-form" 
            onSubmit={handleSubmit}
            onKeyDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
            onFocus={e => e.stopPropagation()}
            onMouseOver={e => e.stopPropagation()}
            >

            <ol className="o-list-unstyled">

              <li>
                 
                  <fieldset className="form-row form-row-fullwidth">
                    <h3 className="a-heading">How was the experience of building your dishwasher? <sup>*</sup> </h3>
                   {/* http://bshpersona.com/personaAPI/data/SendSurveyData
                      data['typeID']='173';d
                      data[textarea]= x.value || ''; on ALL textfield as they are not required

                   */}
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input required type="radio" id="1" name="Q1" value="Extremely Easy" />
                      <label htmlFor="1">Extremely Easy</label>
                    </div>

                    <div className="m-forminput m-forminput-radio had-focus">
                      <input required type="radio" id="2" name="Q1" value="Very Easy" />
                      <label htmlFor="2">Very Easy</label>
                    </div>
                   
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input required type="radio" id="3" name="Q1" value="Somewhat Easy" />
                      <label htmlFor="3">Somewhat Easy</label>
                    </div>
                 
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input required type="radio" id="4" name="Q1" value="Somewhat Difficult" />
                      <label htmlFor="4">Somewhat Difficult</label>
                    </div>

                    <div className="m-forminput m-forminput-radio had-focus">
                      <input required type="radio" id="5" name="Q1" value="Very Difficult" />
                      <label htmlFor="5">Very Difficult</label>
                    </div>
                  </fieldset>
              </li>
             
              <li>
                 
                  <fieldset className="form-row form-row-fullwidth">
                    <h3 className="a-heading">Were you able to build the right dishwasher for you? <sup>*</sup> </h3>
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
                    <h3 className="a-heading">How likely are you to purchase the dishwasher(s) you built? <sup>*</sup> </h3>
                   
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input required type="radio" id="8" name="Q3" value="Extremely likely" />
                      <label htmlFor="8">Extremely likely</label>
                    </div>

                    <div className="m-forminput m-forminput-radio had-focus">
                      <input required type="radio" id="9" name="Q3" value="Very Easy" />
                      <label htmlFor="9">Very likely</label>
                    </div>
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input required type="radio" id="10" name="Q3" value="Somewhat Easy" />
                    <label htmlFor="10">Somewhat likely</label>
                    </div>
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input required type="radio" id="10" name="Q3" value="Somewhat Difficult" />
                      <label htmlFor="10">Not very likely</label>
                    </div>
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input required type="radio" id="11" name="Q3" value="Very Difficult" />
                      <label htmlFor="11">Not at all likely</label>
                    </div>

                  </fieldset>
              </li>
              <li>
                 
                  <fieldset className="form-row form-row-fullwidth">
                    <h3 className="a-heading">What are your Top 5 categories when purchasing a dishwasher? <sup>*</sup> </h3>
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input type="checkbox" id="12" name="Q4" value="Flexibility" />
                      <label htmlFor="12">Flexibility</label>
                    </div>
                   
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input type="checkbox" id="13" name="Q4" value="Quiet" />
                      <label htmlFor="13">Quiet</label>
                    </div>
                   
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input type="checkbox" id="14" name="Q4" value="Drying" />
                      <label htmlFor="14">Drying</label>
                    </div>
                   
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input type="checkbox" id="15" name="Q4" value="Design" />
                      <label htmlFor="15">Design</label>
                    </div>
                   
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input type="checkbox" id="16" name="Q4" value="Price" />
                      <label htmlFor="16">Price</label>
                    </div>
                   
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input type="checkbox" id="17" name="Q4" value="Energy Star" />
                      <label htmlFor="17">Energy Star</label>
                    </div>
                   
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input type="checkbox" id="18" name="Q4" value="Consumer Reviews" />
                      <label htmlFor="18">Consumer Reviews</label>
                    </div>
                   
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input type="checkbox" id="19" name="Q4" value="Smart Appliance/Connected Appliance" />
                      <label htmlFor="19">Smart Appliance/Connected Appliance</label>
                    </div>
                   
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input type="checkbox" id="20" name="Q4" value="Brand" />
                      <label htmlFor="20">Brand</label>
                    </div>
                   
                    <div className="m-forminput m-forminput-radio had-focus">
                      <input type="checkbox" id="21" name="Q4" value="Other" />
                      <label htmlFor="21">Other</label>
                    </div>
                     
                  </fieldset>
                  <fieldset className="form-row form-row-fullwidth">
                    <h3 className="a-heading">Any additional comments or suggestions to help us improve the "Build Your Own" dishwasher?</h3>
                    <textarea id="22" name="Q5" rows="4" cols="50" maxLength="800" placeholder="Your feedback
                      is appreciated">
                      </textarea>
                  </fieldset>
              </li>
            </ol>
            <button className="" type="submit">submit</button>
          </form>
        </Modal>
      </div>
      <div>
        <p className="c-heading-28 u-spacing-40" dangerouslySetInnerHTML={helpers.createMarkup(meta.summaryHeader)}></p>
      </div>
      {
        finalProducts.map((finalProduct, finalProductsIndex) => {
          return (
            <div className="u-spacing-40" key={finalProduct.productID}>
              <div className="u-position-align-self" style={{paddingBottom: '30px'}}>
                <span className="u-type-bold c-heading-18">
                  {finalProduct.productTitle}
                </span>
              </div>

              <div className="c-feature" key={finalProductsIndex}>
                <div className="c-feature__options c-feature__options--summary">
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
                  <div className="c-summary__img-wrapper">
                    <div className="o-aspect  o-aspect--smaller u-spacing-flush u-text-center">
                      <div className="c-summary__img" style={{backgroundImage: `url(https://media3.bosch-home.com/Product_Shots/900x506/${finalProduct.productImage})`}} alt="dishwasher" />
                    </div>
                    <div className="c-summary__price-wrapper">
                      <p className="c-summary__price u-type-bold">{`${helpers.formatter.format(finalProduct.MSRP)}`}</p>
                    </div>
                  </div>
                 

                  <div className="c-btn__summary-wrapper">
                   
                    <button className="c-btn c-btn--summary" onClick={onStartOverHandler}>
                      <div className="c-btn-summary__text">{meta.startOverText}</div>
                      <img className="c-btn-summary__img u-img-respond u-spacing-none" src={startIcon} />
                    </button>
                    <button className="c-btn c-btn--summary-learnmore" onClick={() => opennewone('learn', `${finalProduct.SKU}`)}>
                      <div className="c-btn-summary__text">{meta.learnMoreText}</div>
                      <img className="c-btn-summary__img u-img-respond u-spacing-none" src={searchIcon} />
                    </button>
                    <button className="c-btn c-btn--summary" onClick={() => opennewone('dealer', `${finalProduct.SKU}`)}>
                      <div className="c-btn-summary__text">{meta.where2BuyText}</div>
                      <img className="c-btn-summary__img u-img-respond u-spacing-none" src={whereIcon} />
                    </button>
                  </div>
                 
                </div>
              </div>
            </div>
           
          )
        })
      }
    </div>
   
  );
};

export default Summary;