import { toast } from "react-toastify";
import constants from "./constants";
import PropertyServices from "./services";

const PropertyActions = {

    getStates: () => {
        return (dispatch, getState) => {
            PropertyServices.GET_STATES()
                .then((res => {
                    dispatch({
                        type: constants.GET_STATES,
                        payload: res.data.data
                    })
                }))
                .catch((e) => {
                    toast.error(e.message)
                })
        }
    },

    addTsData: (data) => {
        return (dispatch, getState) => {
            PropertyServices.ADD_TS_DATA(data)
                .then(res => {
                    if (res.status === 201) {
                        toast.success(res.data.message);
                    }
                })
                .catch((e) => {
                    toast.error(e.message)
                })
        }
    },

    getAllTSData: () => {
        return (dispatch, getState) => {
            PropertyServices.GET_ALL_TS_DATA()
                .then(res => {
                    if (res.status === 200) {
                        dispatch({
                            type: constants.GET_ALL_TS_DATA,
                            payload: res.data.data
                        })
                    }
                })
                .catch((e) => {
                    toast.error(e.message)
                })
        }
    }
}

export default PropertyActions