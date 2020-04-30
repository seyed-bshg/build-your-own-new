import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Option from "../../components/Option";
import { useSelector, useDispatch } from "react-redux";
import { selectedOption, clickedNext, clickedPrev } from "../../redux/actions";

const Feature = ({ name, keyName, items }) => {
  const [choiceCopy, setChoiceCopy] = useState("");
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
    if (!!choice === true) {
      let selectedChoice = items.filter((item) => item.listItemID === choice);
      const { listTxt } = selectedChoice[0];
      setChoiceCopy(listTxt);
    }
  }, [choice, items, isDirty]);

  //Seleting an Option
  const onSelectChoice = (e) => {
    const value = Number(e.target.value);
    // Needs to set choiceCopy and choiceImage
    dispatch(selectedOption(value));
  };

  const clickedPrevHandler = () => {
    console.log("productLIST FROM PREV", productList);
    if (step > 1) dispatch(clickedPrev());
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
        <p>FEATURE DESCRIPTION PLACEHOLDER</p>
        <span style={{display: 'none'}}>{name}</span>
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
          <div className="o-aspect o-aspect--540x960 u-spacing-flush">
            <img src="https://via.placeholder.com/540x960" alt="placeholder" />
          </div>
        </div>
        <p>{choiceCopy}</p>
        {/* Button would be its own component */}
        <div className="c-btns">
          <button onClick={clickedPrevHandler}>prev</button>
          <button disabled={!isDirty} onClick={clickedNextHandler}>next
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Feature;
