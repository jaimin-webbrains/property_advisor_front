import axios from 'axios'

const UserServices = {

    GET_USER: async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/get_user`)
        return response;
    },
    ADD_USER: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/add_user`,data)
        return response;
    },
    UPDATE_USER: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/update_user`,data)
        return response;
    },
    DELETE_USER: async (data) => {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/delete_user`,{ data: data })
        return response;
    },
   
}
export default UserServices