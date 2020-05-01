// I want to split up my actions to reducers just found it easier right now to put it in one file.

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
  CLICKED_START_OVER,
} from "./constants";

const initialStateData = {
  isPending: false,
  meta: {},
  data: {},
  groups: [],
  listValues: [],
  products: [],
  reducedProducts: [],
  productsHistory: [[]],
  error: "",
  journey: "",
  order: [],
  step: 0,
  isDirty: false,
  choiceID: null,
};

export const requestData = (state = initialStateData, action = {}) => {
  switch (action.type) {
    case REQUEST_DATA_PENDING:
      return { ...state, isPending: true };
    case REQUEST_DATA_SUCCESS:
      return {
        ...state,
        isPending: false,
        meta: action.payload.Meta[0],
        data: action.payload,
        groups: [...action.payload.group],
        listValues: [...action.payload.ListValues],
        products: [...action.payload.products],
        reducedProducts: [...action.payload.products],
        productsHistory: [...action.payload.products],
      };
    case REQUEST_DATA_FAILED:
      return { ...state, error: action.payload, isPending: true };

    case REQUEST_JSON_DATA:
      return {
        ...state,
        isPending: false,
        meta: action.payload.Meta[0],
        data: action.payload,
        groups: [...action.payload.group],
        listValues: [...action.payload.ListValues],
        products: [...action.payload.products],
        reducedProducts: [...action.payload.products],
        productsHistory: [],
      };

    case SELECTED_JOURNEY:
      return {
        ...state,
        journey: action.payload.groupID,
        order: [...action.payload.displayOrder],
        step: (state.step += 1),
      };

    case SELECTED_OPTION:
      return {
        ...state,
        isDirty: true,
        choiceID: action.payload,
      };
      
    case CLICKED_NEXT:
      return {
        ...state,
        isDirty: false,
        reducedProducts: action.payload.reducedProductsList,
        productsHistory: state.productsHistory.concat([
          action.payload.productList,
        ]),
        step: (state.step += 1),
        choiceID: "",
      };

    case CLICKED_PREV:
      return {
        ...state,
        reducedProducts: state.productsHistory.pop(),
        productsHistory: state.productsHistory,
        step: (state.step -= 1),
        choiceID: "",
      };
    case CLICKED_PREV_TO_JOURNEY:
      return{
        ...state,
        order: [],
        step: (state.step -= 1),
        choiceID: "",
      }
    case CLICKED_START_OVER:
      return {
        ...state,
        isPending: false,
        reducedProducts: [...state.products],
        productsHistory: [],
        journey: "",
        order: [],
        step: 0,
        isDirty: false,
        choiceID: null,
      };
    default:
      return state;
  }
};
