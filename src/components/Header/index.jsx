import React from 'react';
import logoDesktop from '../../img/bosch-main-nav-logo-desktop.png';
import logoMobile from '../../img/bosch-main-nav-logo-mobile.png';
import {
  Link
} from "react-router-dom";
import { clickedStartOver } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Logo = () => {
  const dispatch = useDispatch();

  const onStartOverHandler = () => {
    dispatch(clickedStartOver());
  };
  
  return (
    <header className="c-header">
       <Link to="/" className="c-header__wrapper" onClick={onStartOverHandler}>
          <div className="c-header__logo-link--desktop">
            <img alt="Bosch build your own dishwasher logo" className="u-img-respond c-header__img u-spacing-none" src={logoDesktop} />
          </div>
          <div className="c-header__logo-link--mobile">
            <img alt="Bosch build your own dishwasher logo" className="u-img-respond c-header__img u-spacing-none" src={logoMobile} />
          </div>
       </Link>
    </header>
  )
};


export default Logo;