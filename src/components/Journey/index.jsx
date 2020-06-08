import React from "react";
import { CDN_URI } from '../../uri-constants';
import {
  Tooltip,
} from 'react-tippy';

const Journey = ({ groupID, groupName, description, clicked, img }) => {
	const bgImage = `${CDN_URI + img}`;
  let tooltipDescription = '';
  switch (groupName.toLowerCase()) {
    case 'flexibility':
      tooltipDescription = "Bosch offers several third rack designs based on your loading needs.";
      break;
    case 'drying':
      tooltipDescription = "Bosch offers several innovative drying technologies that make hand drying a thing of the past.";
      break;
    case 'design':
       tooltipDescription = "A variety of sleek handle styles and finishes that suit different tastes.";
      break;
    case 'quiet':
      tooltipDescription = "Bosch is the quietest brand of dishwashers in the US";
      break;
    default:
      tooltipDescription = ''
  }

  return (
   
    <div className="c-journey__option col-12 col-md-6">
     <Tooltip
      // options
      theme="dark"
      title={description}
      position="top"
      trigger="mouseenter"
      arrow="true"
      followCursor="true"
    >
    
    	<img src={bgImage} className="u-img-respond" />
    	<label>
      	<input type="radio" value={groupID} name="journey" onClick={clicked}/>
      		{groupName}
      	</label>
    </Tooltip>
    </div>
  );
};

export default Journey;
