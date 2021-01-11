import React from "react";
import backIcon from '../../img/icons/back-icon.svg';
import fowardIcon from '../../img/icons/forward-icon.svg';

const Button = ({ click, disabled, direction}) => {
  let mobileIcon = direction === 'Next' ? fowardIcon : backIcon;
  return (
  	<button 
  		className={`c-btn c-btn--${direction} ${disabled ? '' : 'c-btn--active'}`}
			onClick={click}
			disabled={disabled}
  		>
  		<span className="c-btn__mobile-text">{direction}</span>
  		<img className="c-btn__mobile-img u-spacing-none" src={mobileIcon} alt="icon" />
      
  	</button>
  );
};

export default Button;
