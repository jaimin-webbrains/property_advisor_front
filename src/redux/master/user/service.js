import axios from 'axios'
import { getToken } from 'helper/methods';

const UserServices = {

    GET_USER: async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/get_user`,{
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      })
        return response;
    },
    ADD_USER: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/add_user`,data,{
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      })
        return response;
    },
    UPDATE_USER: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/update_user`,data,{
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      })
        return response;
    },
    DELETE_USER: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/delete_user`,data,{
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      })
        return response;
    },
   
}
export default UserServices