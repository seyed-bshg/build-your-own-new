import React from "react";
import backIcon from '../../img/icons/back-icon.svg';
import fowardIcon from '../../img/icons/forward-icon.svg';

const Button = ({ click, disabled, direction}) => {
  return (
  	<button 
  		className={`c-btn c-btn--${direction}`}
			onClick={click}
			disabled={disabled}
  		>
  		{/* <span className="c-btn c-btn--mobile">{direction}</span> */}
  		<span className="c-btn c-btn--desktop">{direction}</span>
  	</button>
  );
};

export default Button;
