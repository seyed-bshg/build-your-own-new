import React from "react";

const Journey = ({ groupID, groupName, description, clicked }) => {
  return (
    <div>
      <input type="radio" value={groupID} name="journey" onClick={clicked}/>
      <label>{description}</label>
    </div>
  );
};

export default Journey;
