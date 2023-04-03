import { toast } from "react-toastify";
import constants from "./constants";
import PropertyServices from "./services";
import NETWORK_CONSTANTS from '../networkCall/constant'

const PropertyActions = {
  getStates: () => {
    return (dispatch, getState) => {
      PropertyServices.GET_STATES()
        .then(res => {
          dispatch({
            type: constants.GET_STATES,
            payload: res.data.data
          });
        })
        .catch(e => {
          toast.error(e.message);
        });
    };
  },

  addTsData: data => {
    return (dispatch, getState) => {
      dispatch({
          type:NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
          payload:NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL
      })
      PropertyServices.ADD_TS_DATA(data)
        .then(res => {
          dispatch({
            type:NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload:NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL
          })
          if (res.status === 201) {
            dispatch({
              type: constants.UPDATE_TS_DATA,
              payload: res.data.data.track_data
            });
            toast.success(res.data.message)
            // window.location.href = "/project_listing";
          }
        })
        .catch(e => {
          dispatch({
            type:NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload:NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL
          })
          if(e?.response?.data?.message){
            toast.error(e?.response?.data?.message);

          }else{
            toast.error(e.message);
          }
        });
    };
  },

  getAllTSData: () => {
    return (dispatch, getState) => {
      PropertyServices.GET_ALL_TS_DATA()
        .then(res => {
          if (res.status === 200) {
            dispatch({
              type: constants.GET_ALL_TS_DATA,
              payload: res.data.data
            });
          }
        })
        .catch(e => {
          toast.error(e.message);
        });
    };
  },
  getTsDataByReraNumberOrPaId: (id) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload : NETWORK_CONSTANTS.ADD_TRACKS_LIST_NETWORK_CALL
      })
      PropertyServices.GET_TS_DATA_BY_RERA_NUMBER_OR_PA_ID(id)
        .then(res => {
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload : NETWORK_CONSTANTS.ADD_TRACKS_LIST_NETWORK_CALL
          })
          if (res.status === 200) {
            dispatch({
              type: constants.GET_ALL_TS_DATA,
              payload: res.data.data
            });
          }
        })
        .catch(e => {
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload : NETWORK_CONSTANTS.ADD_TRACKS_LIST_NETWORK_CALL
          })
          toast.error(e.message);
        });
    };
  },
  bulkAddProperty: data => {
    return (dispatch, getState) => {
      dispatch({
          type:NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
          payload:NETWORK_CONSTANTS.BULK_ADD_PROPERTY_NETWORK_CALL
      })
      PropertyServices.ADD_BULK_PROPERTIES(data)
        .then(res => {
          dispatch({
            type:NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload:NETWORK_CONSTANTS.BULK_ADD_PROPERTY_NETWORK_CALL
          })
          if (res.status === 201) {
            toast.success(res.data.message)
          }
        })
        .catch(e => {
          dispatch({
            type:NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload:NETWORK_CONSTANTS.BULK_ADD_PROPERTY_NETWORK_CALL
          })
          if(e?.response?.data?.message){
            toast.error(e?.response?.data?.message);

          }else{
            toast.error(e.message);
          }
        });
    };
  },
}

export default PropertyActions;
