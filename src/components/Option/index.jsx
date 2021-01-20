import React from "react";
import helpers from "../../helpers";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Tooltip } from "react-tippy";
import { clickedStartOver } from "../../redux/actions";

const Option = ({ value, label, name, clicked, disabled }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onStartOverHandler = () => {
    dispatch(clickedStartOver());
    history.push("/");
  };

  let meta = useSelector((state) => state.requestData.meta);

  const unavailableText = `This combination is not available with the options you previously selected. `;
  //html={(<div><p className="u-spacing-none">{unavailableText}</p><a className="c-feature__link" href="#" onClick={onStartOverHandler}>Click here to start over</a></div>)}>
  //<label htmlFor={name + value} className="c-feature__label">
  return (
    <div
      className={`c-feature__option ${
        disabled ? "c-feature__option--disabled" : ""
      }`}
    >
      {/* <label htmlFor={name + value} className="c-feature__label"> */}
      <div className="c-feature__label">
        <input
          aria-label={name + value}
          aria-required="true"
          type="radio"
          value={value}
          name={name}
          id={name + value}
          onClick={clicked}
          disabled={disabled}
        />
        <div className="c-feature__label-bg"></div>
        <span
          className="c-feature__label-text"
          dangerouslySetInnerHTML={helpers.createMarkup(label)}
        ></span>
        {disabled ? (
          <p className="c-disabled c-disabled--desktop u-spacing-none">
            {meta.optionNAText}
            <br />
            <a
              className="c-disabled__link"
              href="#"
              onClick={onStartOverHandler}
            >
              {" "}
              Click here to start over
            </a>
          </p>
        ) : null}
        {/* </label> */}
      </div>
    </div>
  );
};
export default Option;
