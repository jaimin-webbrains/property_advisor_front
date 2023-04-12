import { toast } from "react-toastify";
import constants from "./constants";
import UserServices from "./service";
import NETWORK_CONSTANTS from '../../networkCall/constant'

const UserActions = {
  getUser: () => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.GET_USER
      })
      UserServices.GET_USER()
        .then(res => {
          dispatch({
            type: constants.GET_USER,
            payload: res.data.data
          });
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_USER
          })
        })
        .catch(e => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_USER
          })
        });
    };
  },
  addUser: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.ADD_USER
      })
      UserServices.ADD_USER(data)
        .then(res => {
          toast.success(res.data.message)
          dispatch({
            type: constants.ADD_USER,
            payload: res.data.data
          });
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_USER
          })
        })
        .catch(e => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_USER
          })
        });
    };
  },
  updateUser: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.UPDATE_USER
      })
      UserServices.UPDATE_USER(data)
        .then(res => {
          toast.success(res.data.message)
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.UPDATE_USER
          })
          dispatch(UserActions.getUser())
        })
        .catch(e => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.UPDATE_USER
          })
        });
    };
  },
  deleteUser:(data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.DELETE_USER
      })
      UserServices.DELETE_USER(data)
        .then(res => {
          toast.success(res.data.message)
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_USER
          })
          dispatch(UserActions.getUser())
        })
        .catch(e => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_USER
          })
        });
    };
  },
}

export default UserActions;
