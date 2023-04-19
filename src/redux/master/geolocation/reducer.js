import constants from "./constants";

const initState = {
  states: [],
  cities: [],
  zones: [],
  district: [],
  subDistrict: [],
  location: [],
  subLocation: [],
};

export default function GeolocationReducer(state = initState, action) {
  switch (action.type) {
    case constants.GET_STATES:
      return {
        ...state,
        states: action.payload,
      };
    case constants.DELETE_STATE:
      return {
        ...state,
        states: [],
      };
    case constants.GET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case constants.DELETE_CITY:
      return {
        ...state,
        cities: [],
      };
    case constants.GET_ZONES:
      return {
        ...state,
        zones: action.payload,
      };
    case constants.DELETE_ZONE:
      return {
        ...state,
        zones: [],
      };
    case constants.GET_DISTRICT:
      return {
        ...state,
        district: action.payload,
      };
    case constants.DELETE_DISTRICT:
      return {
        ...state,
        district: [],
      };
    case constants.GET_SUB_DISTRICT:
      return {
        ...state,
        subDistrict: action.payload,
      };
    case constants.DELETE_SUB_DISTRICT:
      return {
        ...state,
        subDistrict: [],
      };
    case constants.GET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case constants.DELETE_LOCATION:
      return {
        ...state,
        location: [],
      };
    case constants.GET_SUB_LOCATION:
      return {
        ...state,
        subLocation: action.payload,
      };
    case constants.DELETE_SUB_LOCATION:
      return {
        ...state,
        subLocation: [],
      };
    default:
      return state;
  }
}
