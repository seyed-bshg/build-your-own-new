import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Option from "../../components/Option";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectedOption, clickedNext, clickedPrev, clickedPrevToJourney } from "../../redux/actions";

const Feature = ({ name, keyName, items, listDescription }) => {
  const [choiceCopy, setChoiceCopy] = useState("");
  const [choiceImage, setChoiceImage] = useState("");
  let isDirty = useSelector((state) => state.requestData.isDirty);
  let order = useSelector((state) => state.requestData.order);
  let step = useSelector((state) => state.requestData.step);
  let choice = useSelector((state) => state.requestData.choiceID);
  let productList = useSelector((state) => state.requestData.reducedProducts);
  const dispatch = useDispatch();
  //React Router for Prev/Next buttons
  const history = useHistory();

  //ComponentDidMount() and ComponentShouldUpdate() Equivalent
  // Getting the feature copy on selecting an option
  useEffect(() => {
    console.log('items ', items)
    if (!!choice === true) {
      let selectedChoice = items.filter((item) => item.listItemID === choice);
      const { listTxt } = selectedChoice[0];
      setChoiceCopy(listTxt);
    }
    window.scrollTo(0, 0);
  }, [choice, items, isDirty]);

  //Seleting an Option
  const onSelectChoice = (e) => {
    const value = Number(e.target.value);
    // Needs to set choiceCopy and choiceImage
    dispatch(selectedOption(value));
  };

  const clickedPrevHandler = () => {
     step > 1 ? dispatch(clickedPrev()) : dispatch(clickedPrevToJourney());
    history.goBack();
  };

  const clickedNextHandler = () => {
    let reducedProductList = productList.filter(
      (product) => product[`${keyName}`] === choice
    );
    dispatch(clickedNext(reducedProductList, productList));
    setChoiceCopy("");
    step > order.length - 1 ? history.push("summary") : history.push(`${order[step]}`);
  };

  // Helping logic to find disabled options
  // Disabling all of the options that you are unable to choose after making your selection and moving on to the next screen
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
    <div className="c-feature">
      <div className="c-feature__options">
        <fieldset className="c-feature__description">
          <p>{listDescription}</p>
          <span style={{display: 'none'}}>{name}</span>
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
          <div className="o-aspect o-aspect--536x590 u-spacing-flush">
            <img src="https://via.placeholder.com/540x590" alt="placeholder" />
          </div>
        </div>
        <p>{choiceCopy}</p>
        {/* Button would be its own component */}
        <div className="c-btn__wrapper">
          <Button 
            click={clickedPrevHandler}
            direction="Previous"
          />
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
