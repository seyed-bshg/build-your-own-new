import React from "react";
import helpers from "../../helpers";

const Option = ({ value, label, name, clicked, disabled }) => {
  return (
    <fieldset className="c-feature__option">
      <label htmlFor={name + value} className="c-feature__label">
        <input
          type="radio"
          value={value}
          name={name}
          id={name + value}
          onClick={clicked}
          disabled={disabled}
        />
        <div className="c-feature__label-bg"></div>
        <span className="c-feature__label-text" dangerouslySetInnerHTML={helpers.createMarkup(label)}></span>
      </label>
    </fieldset>
  );
};

export default Option;
