import axios from 'axios'
import { config_header } from 'helper/methods';

const RoleServices = {

    GET_ROLES: async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/role/get_role`,config_header)
        return response;
    },
    ADD_ROLE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/role/add_role`,data,config_header)
        return response;
    },
    UPDATE_ROLE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/role/update_role`,data,config_header)
        return response;
    },
    DELETE_ROLE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/role/delete_role`,data,config_header)
        return response;
    },
   
}
export default RoleServices