import { toast } from "react-toastify";
import constants from "./constants";
import RoleServices from "./service";
import NETWORK_CONSTANTS from '../../networkCall/constant'

const RoleActions = {
  getRoles: () => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.GET_ROLES
      })
      RoleServices.GET_ROLES()
        .then(res => {
          dispatch({
            type: constants.GET_ROLES,
            payload: res.data.data
          });
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_ROLES
          })
        })
        .catch(e => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_ROLES
          })
        });
    };
  },
  addRole: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.ADD_ROLE
      })
      RoleServices.ADD_ROLE(data)
        .then(res => {
          toast.success(res.data.message)
          const data = {
            _id: res.data.data._id,
            name: res.data.data.name
          }
          dispatch({
            type: constants.ADD_ROLE,
            payload: data
          });
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_ROLE
          })
        })
        .catch(e => {
          if(e.response){
            toast.error(e.response.data.message);
          }else{
            toast.error(e.message);
          }
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_ROLE
          })
        });
    };
  },
  updateRole: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.UPDATE_ROLE
      })
      RoleServices.UPDATE_ROLE(data)
        .then(res => {
          toast.success(res.data.message)
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.UPDATE_ROLE
          })
          dispatch(RoleActions.getRoles())
        })
        .catch(e => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.UPDATE_ROLE
          })
        });
    };
  },
  deleteRole:(data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.DELETE_ROLE
      })
      RoleServices.DELETE_ROLE(data)
        .then(res => {
          toast.success(res.data.message)
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_ROLE
          })
          dispatch(RoleActions.getRoles())
        })
        .catch(e => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_ROLE
          })
        });
    };
  },
}

export default RoleActions;
