import {
  REQUEST_DATA_PENDING,
  REQUEST_DATA_SUCCESS,
  REQUEST_DATA_FAILED,
  REQUEST_JSON_DATA,
  SELECTED_JOURNEY,
  SELECTED_OPTION,
  CLICKED_NEXT,
  CLICKED_PREV,
  CLICKED_START_OVER,
  CLICKED_PREV_TO_JOURNEY,
} from "./constants";

import Axios from "axios";

export const requestData = () => (dispatch) => {
  dispatch({ type: REQUEST_DATA_PENDING });
  Axios.get("https://bshpersona.com/personaAPI/data/GetBYOData")
    .then((res) =>
      dispatch({
        type: REQUEST_DATA_SUCCESS,
        payload: res.data.ProductBuilder,
      })
    )
    .catch((error) => dispatch({ type: REQUEST_DATA_FAILED, payload: error }));
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
