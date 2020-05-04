import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectedJourney } from "../../redux/actions";

import Journey from "../Journey";

// import Journey from "./../../components/Journey";

function Home() {
  const meta = useSelector((state) => state.requestData.meta);
  const groups = useSelector((state) => state.requestData.groups);
  
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(groups, "groups");

  const onChoiceHandler = (e) => {
    const selectedGroup = groups[e.target.value - 1];
    console.log('selectedGroup', selectedGroup);
    dispatch(selectedJourney(selectedGroup));
    history.push('10');
  };

  return (
    <div className="c-journey">
      <div className="c-journey__text-wrapper">
        <h1 className="c-heading-44">{meta.header}</h1>
        <p className="c-heading-26">{meta.description}</p>
      </div>
      {/*  4 Main Journeys to choose from:  Flexibility, Design, etc.*/}
      <div className="c-journey__option-wrapper">
        <div className="row">
          {groups.map((group, groupIndex) => {
            if(groupIndex < 2) {
              return (
                <Journey
                  groupName={group.groupName}
                  key={group.groupID}
                  groupID={group.groupID}
                  description={group.description}
                  clicked={onChoiceHandler}
                />
              )
            }
          }
        )}
        </div>
        <div className="row">
          {groups.map((group, groupIndex) => {
            if(groupIndex >= 2) {
              return (
                <Journey
                  groupName={group.groupName}
                  key={group.groupID}
                  groupID={group.groupID}
                  description={group.description}
                  clicked={onChoiceHandler}
                />
              )
            }
          }
        )}
        </div>
      </div>
    </div>
  );
}

export default Home;
