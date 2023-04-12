import constants from "./constants";

const initState = {
  roles:[]
};

export default function RoleReduce(state = initState, action) {
  switch (action.type) {
    case constants.GET_ROLES:
      return {
        ...state,
        roles: action.payload
      };
      case constants.ADD_ROLE:
        return {
          ...state,
          roles:[...state.roles,action.payload]
        }
    default:
      return state;
  }
}
