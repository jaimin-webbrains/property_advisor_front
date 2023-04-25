import axios from 'axios'
import { getToken } from 'helper/methods';

const RoleServices = {

    GET_ROLES: async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/role/get_role`,{
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      })
        return response;
    },
    ADD_ROLE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/role/add_role`,data,{
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      })
        return response;
    },
    UPDATE_ROLE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/role/update_role`,data,{
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      })
        return response;
    },
    DELETE_ROLE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/role/delete_role`,data,{
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      })
        return response;
    },
   
}
export default RoleServices