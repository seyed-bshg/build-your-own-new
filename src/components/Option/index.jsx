import React from "react";
import helpers from "../../helpers";
import { useSelector, useDispatch } from "react-redux";
import {
  Tooltip,
} from 'react-tippy';
import { clickedStartOver } from "../../redux/actions";



const Option = ({ value, label, name, clicked, disabled }) => {

  const dispatch = useDispatch();

   const onStartOverHandler = () => {
    dispatch(clickedStartOver());
  };

  const unavailableText = 'This combination is not available with the options you previously selected.';

  return (
    <React.Fragment>
      {disabled 
        ? <Tooltip 
        // options
          delay={[100, 300]}
          interactive="true"
          theme="dark"
          position="top"
          trigger="mouseenter"
          arrow="true"
          className="c-feature__option"
          html={(<div><p>{unavailableText}</p></div>)}>
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
          </Tooltip>
        : <fieldset className="c-feature__option">
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
      }
    </React.Fragment>
  );  
}
export default Option;