import React from "react";

const Option = ({ value, label, name, clicked, disabled }) => {
  return (
    <fieldset>
      <input
        type="radio"
        value={value}
        name={name}
        onClick={clicked}
        disabled={disabled}
      />
      <label>
        {label} ID: {value}
      </label>
    </fieldset>
  );
};

export default Option;
