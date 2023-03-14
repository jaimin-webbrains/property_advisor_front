import constants from "./constants";

const initState = {
  states: [],
  tracks_data: []
};

export default function PropertyReducer(state = initState, action) {
  switch (action.type) {
    case constants.GET_STATES:
      return {
        ...state,
        states: action.payload
      };
    case constants.GET_ALL_TS_DATA:
      return {
        ...state,
        tracks_data: action.payload
      };
    case constants.UPDATE_TS_DATA:
      return {
        ...state,
        tracks_data: [...state.tracks_data, action.payload]
      };

    default:
      return state;
  }
}
