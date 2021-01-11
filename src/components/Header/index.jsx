import React from "react";
import logoDesktop from "../../img/bosch-main-nav-logo-desktop.png";
import logoMobile from "../../img/bosch-main-nav-logo-mobile.png";
import { Link } from "react-router-dom";
import { clickedStartOver } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.scss";

const Logo = ({ step }) => {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.requestData.order);
  const onStartOverHandler = () => {
    dispatch(clickedStartOver());
  };

  return (
    <header className={`${styles.CustomHeaderContainer} c-header`}>
      <Link
        to="/"
        className={` c-header__wrapper `}
        onClick={onStartOverHandler}
      >
        <div className={`c-header__logo-link--desktop  `}>
          <img
            alt="Bosch build your own dishwasher logo"
            className="u-img-respond c-header__img u-spacing-none"
            src={logoDesktop}
          />
        </div>

        <div className="c-header__logo-link--mobile">
          <img
            alt="Bosch build your own dishwasher logo"
            className="u-img-respond c-header__img u-spacing-none"
            src={logoMobile}
          />
        </div>
      </Link>

      {step > 0 && step < order.length + 1 ? (
        <div className={styles.ButtonContainer}>
          <Link
            to="/"
            className={`${styles.CustomHeaderContainer} c-header__wrapper `}
            onClick={onStartOverHandler}
          >
            <button
              className={`c-btn c-btn--summary ${styles.HeaderButton}`}
              onClick={onStartOverHandler}
            >
              <div className={`c-btn-summary__text ${styles.HeaderButtonText}`}>
                Start Over
              </div>
            </button>
          </Link>
        </div>
      ) : null}
    </header>
  );
};

export default Logo;
