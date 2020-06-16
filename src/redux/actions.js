import {
  REQUEST_DATA_PENDING,
  REQUEST_DATA_SUCCESS,
  REQUEST_DATA_FAILED,
  REQUEST_JSON_DATA,
  SELECTED_JOURNEY,
  SELECTED_OPTION,
  CLICKED_NEXT,
  CLICKED_PREV,
  CLICKED_PREV_TO_JOURNEY,
  CLICKED_START_OVER
} from "./constants";

import axios from 'axios'

export const requestData = () => (dispatch) => {
  dispatch({ type: REQUEST_DATA_PENDING });
      fetch('https://bshpersona.com/personaAPI/data/GetBYOData')
      .then(response => response.json())
      .then(response => {
        console.log(response)
        
        dispatch({
          type: REQUEST_DATA_SUCCESS,
          payload: response.ProductBuilder
        })
      })
    .catch(error => console.error(error));
};

export const requestJSON = (data) => ({
  type: REQUEST_JSON_DATA,
  payload: data,
});

export const selectedJourney = (group) => ({
  type: SELECTED_JOURNEY,
  payload: group,
});

export const selectedOption = (group) => ({
  type: SELECTED_OPTION,
  payload: group,
});

export const clickedNext = (reducedProductsList, productList) => ({
  type: CLICKED_NEXT,
  payload: { reducedProductsList, productList },
});

export const clickedPrev = () => ({
  type: CLICKED_PREV,
  payload: null,
});

export const clickedPrevToJourney = () =>({
  type: CLICKED_PREV_TO_JOURNEY,
  payload: null,
})

export const clickedStartOver = () => ({
  type: CLICKED_START_OVER,
  payload: null,
});
