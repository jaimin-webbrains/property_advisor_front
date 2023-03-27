import constants from "./constant";

const initState = {
    NETWORK_CALLS: []
};

export default function NetworkCallReducer(state = initState, action) {
    switch (action.type) {
        case constants.ADD_PROPERTY_NETWORK_CALL:
            return {
                ...state,
                NETWORK_CALLS: [...state.NETWORK_CALLS, action.payload]
            };
        case constants.REMOVE_PROPERTY_NETWORK_CALL:
            const updated_data = state.NETWORK_CALLS.filter(e => e !== action.payload)
            return {
                ...state,
                NETWORK_CALLS: updated_data
            }

        default:
            return state;
    }
}
