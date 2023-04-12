import axios from 'axios'

const authService = {

    LOG_IN: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`,data)
        return response;
    },
    
    FORGET_PASSWORD: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/forgot_password`,data)
        return response;
    },
    MATCH_OTP: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/reset_password_check_otp`,data)
        return response
    },

    RESET_FORGOT_PASSWORD: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/reset_forgotted_password`,data)
        return response
    },

    RESET_PASSWORD: async(data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/reset_password`,data)
        return response
    }
}
export default authService