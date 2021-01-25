import React from "react";
import { CDN_URI } from "../../uri-constants";
// import { Tooltip } from "react-tippy";

import styles from "./Journey.module.scss";

const Journey = ({ groupID, groupName, description, clicked, img }) => {
  const bgImage = `${CDN_URI + img}`;

  return (
    <div
      className={`c-journey__option col-12 col-md-6 ${styles.JourneyContainer}`}
    >
      {/* <Tooltip
      // options
      theme="dark"
      title={description}
      position="top"
      trigger="mouseenter"
      arrow="true"
      followCursor="true"
    > */}

      <img
        src={bgImage}
        className={`u-img-respond ${styles.JourneyImages}`}
        alt={description}
      />
      <fieldset>
      <legend className="sr-only">{groupName}</legend>
      <label>
        <input type="radio" value={groupID} name="journey" onClick={clicked} />
        {groupName}
      </label>
      </fieldset>
      {/* </Tooltip> */}
    </div>
  );
};

export default Journey;
