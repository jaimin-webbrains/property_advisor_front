import { toast } from "react-toastify";
import constants from "./constants";
import GeolocationService from "./service";
import NETWORK_CONSTANTS from "../../networkCall/constant";

const GeolocationActions = {
  getStates: () => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.GET_STATES,
      });
      GeolocationService.GET_STATES()
        .then((res) => {
          dispatch({
            type: constants.GET_STATES,
            payload: res.data.data,
          });
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_STATES,
          });
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_STATES,
          });
        });
    };
  },
  addState: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.ADD_STATE,
      });
      GeolocationService.ADD_STATE(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch(GeolocationActions.getStates());
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_STATE,
          });
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_STATE,
          });
        });
    };
  },
  updateState: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.UPDATE_STATE,
      });
      GeolocationService.UPDATE_STATE(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch(GeolocationActions.getStates());
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.UPDATE_STATE,
          });
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.UPDATE_STATE,
          });
        });
    };
  },
  deleteState: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.DELETE_STATE,
      });
      GeolocationService.DELETE_STATE(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_STATE,
          });
          dispatch(GeolocationActions.getStates());
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_STATE,
          });
        });
    };
  },
  getCities: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.GET_CITIES,
      });
      GeolocationService.GET_CITIES(data)
        .then((res) => {
          dispatch({
            type: constants.GET_CITIES,
            payload: res.data.data,
          });
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_CITIES,
          });
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_CITIES,
          });
        });
    };
  },
  addCity: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.ADD_CITY,
      });
      GeolocationService.ADD_CITY(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch(GeolocationActions.getStates());
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_CITY,
          });
          dispatch(GeolocationActions.getCities());
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_CITY,
          });
        });
    };
  },
  deleteCity: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.DELETE_CITY,
      });
      GeolocationService.DELETE_CITY(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_CITY,
          });
          dispatch(GeolocationActions.getCities());
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_CITY,
          });
        });
    };
  },
  getZones: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.GET_ZONES,
      });
      GeolocationService.GET_ZONE(data)
        .then((res) => {
          dispatch({
            type: constants.GET_ZONES,
            payload: res.data.data,
          });
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_ZONES,
          });
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_ZONES,
          });
        });
    };
  },
  addOrUpdateZone: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.ADD_ZONE,
      });
      GeolocationService.ADD_OR_UPDATE_ZONE(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_ZONE,
          });
          dispatch(GeolocationActions.getZones(res.data.data.city.name));
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_ZONE,
          });
        });
    };
  },
  deleteZone: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.DELETE_ZONE,
      });
      GeolocationService.DELETE_ZONE(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_ZONE,
          });
          dispatch(GeolocationActions.getZones(res.data.data.city.name));
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_ZONE,
          });
        });
    };
  },
  getDistrict: () => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.GET_DISTRICT,
      });
      GeolocationService.GET_DISTRICT()
        .then((res) => {
          dispatch({
            type: constants.GET_DISTRICT,
            payload: res.data.data,
          });
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_DISTRICT,
          });
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_DISTRICT,
          });
        });
    };
  },
  addOrUpdateDistrict: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.ADD_OR_UPDATE_DISTRICT,
      });
      GeolocationService.ADD_OR_UPDATE_DISTRICT(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_OR_UPDATE_DISTRICT,
          });
          dispatch(GeolocationActions.getDistrict());
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_OR_UPDATE_DISTRICT,
          });
        });
    };
  },
  deleteDistrict: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.DELETE_DISTRICT,
      });
      GeolocationService.DELETE_DISTRICT(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_DISTRICT,
          });
          dispatch(GeolocationActions.getDistrict());
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_DISTRICT,
          });
        });
    };
  },
  getSubDistrict: () => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.GET_SUB_DISTRICT,
      });
      GeolocationService.GET_SUB_DISTRICT()
        .then((res) => {
          dispatch({
            type: constants.GET_SUB_DISTRICT,
            payload: res.data.data,
          });
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_SUB_DISTRICT,
          });
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_SUB_DISTRICT,
          });
        });
    };
  },
  addOrUpdateSubDistrict: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.ADD_OR_UPDATE_SUB_DISTRICT,
      });
      GeolocationService.ADD_OR_UPDATE_SUB_DISTRICT(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_OR_UPDATE_SUB_DISTRICT,
          });
          dispatch(GeolocationActions.getSubDistrict());
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_OR_UPDATE_SUB_DISTRICT,
          });
        });
    };
  },
  deleteSubDistrict: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.DELETE_SUB_DISTRICT,
      });
      GeolocationService.DELETE_SUB_DISTRICT(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_SUB_DISTRICT,
          });
          dispatch(GeolocationActions.getSubDistrict());
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_SUB_DISTRICT,
          });
        });
    };
  },
  getLocation: () => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.GET_LOCATION,
      });
      GeolocationService.GET_LOCATION()
        .then((res) => {
          dispatch({
            type: constants.GET_LOCATION,
            payload: res.data.data,
          });
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_LOCATION,
          });
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_LOCATION,
          });
        });
    };
  },
  addOrUpdateLocation: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.ADD_OR_UPDATE_LOCATION,
      });
      GeolocationService.ADD_OR_UPDATE_LOCATION(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_OR_UPDATE_LOCATION,
          });
          dispatch(GeolocationActions.getLocation());
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_OR_UPDATE_LOCATION,
          });
        });
    };
  },
  deleteLocation: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.DELETE_LOCATION,
      });
      GeolocationService.DELETE_LOCATION(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_LOCATION,
          });
          dispatch(GeolocationActions.getLocation());
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_LOCATION,
          });
        });
    };
  },
  getSubLocation: () => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.GET_SUB_LOCATION,
      });
      GeolocationService.GET_SUB_LOCATION()
        .then((res) => {
          dispatch({
            type: constants.GET_SUB_LOCATION,
            payload: res.data.data,
          });
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_SUB_LOCATION,
          });
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.GET_SUB_LOCATION,
          });
        });
    };
  },
  addOrUpdateSubLocation: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.ADD_OR_UPDATE_SUB_LOCATION,
      });
      GeolocationService.ADD_OR_UPDATE_SUB_LOCATION(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_OR_UPDATE_SUB_LOCATION,
          });
          dispatch(GeolocationActions.getSubLocation());
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.ADD_OR_UPDATE_SUB_LOCATION,
          });
        });
    };
  },
  deleteSubLocation: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.DELETE_SUB_LOCATION,
      });
      GeolocationService.DELETE_SUB_LOCATION(data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_SUB_LOCATION,
          });
          dispatch(GeolocationActions.getSubLocation());
        })
        .catch((e) => {
          toast.error(e.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.DELETE_SUB_LOCATION,
          });
        });
    };
  },
};

export default GeolocationActions;
