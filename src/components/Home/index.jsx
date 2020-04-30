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
    <div>
      <span>title</span>
      <h1>{meta.header}</h1>
      <p>{meta.description}</p>
      
      {/*  4 Main Journeys to choose from:  Flexibility, Design, etc.*/}
      {groups.map((group) => (
        <Journey
          key={group.groupID}
          groupID={group.groupID}
          description={group.description}
          clicked={onChoiceHandler}
        />
      ))}
    </div>
  );
}

export default Home;
