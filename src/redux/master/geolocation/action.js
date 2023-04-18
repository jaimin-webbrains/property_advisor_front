import { toast } from "react-toastify";
import constants from "./constants";
import GeolocationService from "./service";
import NETWORK_CONSTANTS from '../../networkCall/constant'

const GeolocationActions = {
    getStates: () => {
        return (dispatch, getState) => {
            dispatch({
                type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
                payload: constants.GET_STATES
            })
            GeolocationService.GET_STATES()
                .then(res => {
                    dispatch({
                        type: constants.GET_STATES,
                        payload: res.data.data
                    });
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.GET_STATES
                    })
                })
                .catch(e => {
                    toast.error(e.message);
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.GET_STATES
                    })
                });
        };
    },
    addState: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
                payload: constants.ADD_STATE
            })
            GeolocationService.ADD_STATE(data)
                .then(res => {
                    dispatch(GeolocationActions.getStates())
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.ADD_STATE
                    })
                })
                .catch(e => {
                    toast.error(e.message);
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.ADD_STATE
                    })
                });
        };
    },
    updateState: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
                payload: constants.UPDATE_STATE
            })
            GeolocationService.UPDATE_STATE(data)
                .then(res => {
                    dispatch(GeolocationActions.getStates())
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.UPDATE_STATE
                    })
                })
                .catch(e => {
                    toast.error(e.message);
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.UPDATE_STATE
                    })
                });
        };
    },
    deleteState: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
                payload: constants.DELETE_STATE
            })
            GeolocationService.DELETE_STATE(data)
                .then(res => {
                    toast.success(res.data.message)
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.DELETE_STATE
                    })
                    dispatch(GeolocationActions.getStates())
                })
                .catch(e => {
                    toast.error(e.message);
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.DELETE_STATE
                    })
                });
        };
    },
    getCities: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
                payload: constants.GET_CITIES
            })
            GeolocationService.GET_CITIES(data)
                .then(res => {
                    dispatch({
                        type: constants.GET_CITIES,
                        payload: res.data.data
                    });
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.GET_CITIES
                    })
                })
                .catch(e => {
                    toast.error(e.message);
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.GET_CITIES
                    })
                });
        };
    },
    addCity: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
                payload: constants.ADD_CITY
            })
            GeolocationService.ADD_CITY(data)
                .then(res => {
                    dispatch(GeolocationActions.getStates())
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.ADD_CITY
                    })
                    dispatch(GeolocationActions.getCities())
                })
                .catch(e => {
                    toast.error(e.message);
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.ADD_CITY
                    })
                });
        };
    },
    deleteCity: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
                payload: constants.DELETE_CITY
            })
            GeolocationService.DELETE_CITY(data)
                .then(res => {
                    toast.success(res.data.message)
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.DELETE_CITY
                    })
                    dispatch(GeolocationActions.getCities())
                })
                .catch(e => {
                    toast.error(e.message);
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.DELETE_CITY
                    })
                });
        };
    },
    getZones: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
                payload: constants.GET_ZONES
            })
            GeolocationService.GET_ZONE(data)
                .then(res => {
                    dispatch({
                        type: constants.GET_ZONES,
                        payload: res.data.data
                    });
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.GET_ZONES
                    })
                })
                .catch(e => {
                    toast.error(e.message);
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.GET_ZONES
                    })
                });
        };
    },
    addOrUpdateZone: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
                payload: constants.ADD_ZONE
            })
            GeolocationService.ADD_OR_UPDATE_ZONE(data)
                .then(res => {
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.ADD_ZONE
                    })
                })
                .catch(e => {
                    toast.error(e.message);
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.ADD_ZONE
                    })
                });
        };
    },
    deleteZone: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
                payload: constants.DELETE_ZONE
            })
            GeolocationService.DELETE_ZONE(data)
                .then(res => {
                    toast.success(res.data.message)
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.DELETE_ZONE
                    })
                    dispatch(GeolocationActions.getZones())
                })
                .catch(e => {
                    toast.error(e.message);
                    dispatch({
                        type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
                        payload: constants.DELETE_ZONE
                    })
                });
        };
    },
}

export default GeolocationActions;
