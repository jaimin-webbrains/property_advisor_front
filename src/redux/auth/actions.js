import { toast } from "react-toastify";
import authService from "./service";
import { push } from 'react-router-redux';


const authActions = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',

    login: (data) => {
        return (dispatch) => {
            authService.LOG_IN(data)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch({
                            type: authActions.LOGIN,
                            isLogin: true,
                            accessToken: res.data.data.access_token
                        });
                        dispatch(push('/project_listing'))
                    }
                }).catch((e) => {
                    toast.error(e.response.data.message)
                })
        }
    },
    logout: () => {
        return {
            type: authActions.LOGOUT,
            isLogin: false,
            accessToken: null
        };
    },
    forgetPassword: (data) => {
        return (dispatch) => {
            authService.FORGET_PASSWORD(data)
                .then((res) => {
                    if (res.status === 200) {
                        toast.success(res.data.message)
                    }
                }).catch((e) => {
                    toast.error(e.response.data.message)
                })
        }
    },
    matchOtp: (data) => {
        return (dispatch) => {
            authService.MATCH_OTP(data)
                .then((res) => {
                    if (res.status === 200) {
                        toast.success(res.data.message)
                        dispatch(push(`/reset_password?email=${res.data.data.email}`))   
                    }
                }).catch((e) => {
                    toast.error(e.response.data.message)
                })
        }
    },
    resetForgotPassword: (data) => {
        return (dispatch) => {
            authService.RESET_FORGOT_PASSWORD(data)
                .then((res) => {
                    if (res.status === 200) {
                        toast.success(res.data.message)
                        setTimeout(() => {
                            dispatch(push(`/login`))   
                        }, 3000);
                
                    }
                }).catch((e) => {
                    toast.error(e.response.data.message)
                })
        }
    },
    resetPassword: (data) => {
        return (dispatch) => {
            authService.RESET_PASSWORD(data)
                .then((res) => {
                    if (res.status === 200) {
                        toast.success(res.data.message)
                    }
                }).catch((e) => {
                    toast.error(e.response.data.message)
                })
        }
    }

}

export default authActions