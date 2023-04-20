import { toast } from "react-toastify";
import authService from "./service";
import { push } from "react-router-redux";
import constants from "./constants";
import NETWORK_CONSTANTS from "../networkCall/constant";

const authActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",

  login: (data) => {
    return (dispatch) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.LOG_IN,
      });
      authService
        .LOG_IN(data)
        .then((res) => {
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.LOG_IN,
          });
          if (res.status === 200) {
            dispatch({
              type: authActions.LOGIN,
              isLogin: true,
              accessToken: res.data.data.access_token,
            });
            dispatch(push("/project_listing"))
          }
        })
        .catch((e) => {
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.LOG_IN,
          });
          toast.error(e.response.data.message);
        });
    };
  },
  logout: () => {
    return {
      type: authActions.LOGOUT,
      isLogin: false,
      accessToken: null,
    };
  },
  forgetPassword: (data) => {
    return (dispatch) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.FORGET_PASSWORD,
      });
      authService
        .FORGET_PASSWORD(data)
        .then((res) => {
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.FORGET_PASSWORD,
          });
          if (res.status === 200) {
            toast.success(res.data.message);
          }
        })
        .catch((e) => {
          toast.error(e.response.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.FORGET_PASSWORD,
          });
        });
    };
  },
  matchOtp: (data) => {
    return (dispatch) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.MATCH_OTP,
      });
      authService
        .MATCH_OTP(data)
        .then((res) => {
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.MATCH_OTP,
          });
          if (res.status === 200) {
            toast.success(res.data.message);
            dispatch(push(`/reset_password?email=${res.data.data.email}`));
          }
        })
        .catch((e) => {
          toast.error(e.response.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.MATCH_OTP,
          });
        });
    };
  },
  resetForgotPassword: (data) => {
    return (dispatch) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.RESET_FORGOT_PASSWORD,
      });
      authService
        .RESET_FORGOT_PASSWORD(data)
        .then((res) => {
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.RESET_FORGOT_PASSWORD,
          });
          if (res.status === 200) {
            toast.success(res.data.message);
            setTimeout(() => {
              dispatch(push('/login'))
            }, 3000);
          }
        })
        .catch((e) => {
          toast.error(e.response.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.RESET_FORGOT_PASSWORD,
          });
        });
    };
  },
  resetPassword: (data) => {
    return (dispatch) => {
      dispatch({
        type: NETWORK_CONSTANTS.ADD_PROPERTY_NETWORK_CALL,
        payload: constants.FORGET_PASSWORD,
      });
      authService
        .RESET_PASSWORD(data)
        .then((res) => {
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.FORGET_PASSWORD,
          });
          if (res.status === 200) {
            toast.success(res.data.message);
          }
        })
        .catch((e) => {
          toast.error(e.response.data.message);
          dispatch({
            type: NETWORK_CONSTANTS.REMOVE_PROPERTY_NETWORK_CALL,
            payload: constants.FORGET_PASSWORD,
          });
        });
    };
  },
};

export default authActions;
