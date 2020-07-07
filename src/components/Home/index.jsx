import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { selectedJourney } from "../../redux/actions";
import helpers from "../../helpers";
import * as constants from "../../uri-constants";
import Journey from "../Journey";

function Home() {
  const meta = useSelector((state) => state.requestData.meta);
  const groups = useSelector((state) => state.requestData.groups);
  const dispatch = useDispatch();
  const history = useHistory();


  const onChoiceHandler = (e) => {
    window.scrollTo(0, 0)
    const selectedGroup = groups[e.target.value - 1];
    // console.log('selectedGroup ', selectedGroup)
    axios.post(`${constants.LOG_URI}`, {
      logIID: `${selectedGroup.groupID}`,
      logdetails: `JOURNEY SELECTION, ${selectedGroup.groupName}, ${selectedGroup.groupID}`,
      loginName: ""
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
    // console.log('selectedGroup ', selectedGroup.groupID)
    dispatch(selectedJourney(selectedGroup));
    history.push('priceRange');
  };

  return (
    <div className="c-journey">
      <div className="c-journey__text-wrapper">
        <h1 className="c-heading-44">{meta.header}</h1>
        {/*  4 Main Journeys to choose from:  Flexibility, Design, etc.*/}
        <div className="c-heading-26 c-journey__intro" dangerouslySetInnerHTML={helpers.createMarkup(meta.description)}></div>
        <ul className="c-journey__list-mobile o-list-unstyled ">
        {groups.map((group, groupIndex) => {
          return <li className="c-journey__list-item" dangerouslySetInnerHTML={helpers.createMarkup(group.description)}></li>
        })}
      </ul>
      </div>
      
      {/*  4 Main Journeys to choose from:  Flexibility, Design, etc.*/}
      <div className="c-journey__option-wrapper">
        <div className="row">
          {groups.map((group, groupIndex) => {
            if(groupIndex < 2) {
              return (
                <Journey
                  img = {group.featureImage}
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
                  img={group.featureImage}
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
