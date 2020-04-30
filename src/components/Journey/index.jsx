import React from "react";
import { CDN_URI } from '../../uri-constants';

const Journey = ({ groupID, groupName, description, clicked }) => {
	const bgImage = `${CDN_URI + groupName.toLowerCase() + '-journey' + '.jpg'}`;
  return (

    <div className="c-journey__option col-6" >
    	<img src={bgImage} className="u-img-respond" />
    	<label>
      	<input type="radio" value={groupID} name="journey" onClick={clicked}/>
      		{description}
      	</label>

    </div>
  );
};

export default Journey;
