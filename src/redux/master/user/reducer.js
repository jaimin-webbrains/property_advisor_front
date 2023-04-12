import constants from "./constants";

const initState = {
  users:[]
};

export default function RoleReduce(state = initState, action) {
  switch (action.type) {
    case constants.GET_USER:
      return {
        ...state,
        users: action.payload
      };
      case constants.ADD_USER:
        return {
          ...state,
          users:[...state.users,action.payload]
        }
    default:
      return state;
  }
}
