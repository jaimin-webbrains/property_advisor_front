import constants from "./constants";

const initState = {
    states: [],
    cities: [],
    zones: []
};

export default function GeolocationReducer(state = initState, action) {
    switch (action.type) {
        case constants.GET_STATES:
            return {
                ...state,
                states: action.payload
            };
        case constants.GET_CITIES:
            return {
                ...state,
                cities: action.payload
            };
        case constants.GET_ZONES:
            return{
                ...state,
                zones: action.payload
            }
        default:
            return state;
    }
}
