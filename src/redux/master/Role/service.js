import axios from 'axios'

const RoleServices = {

    GET_ROLES: async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/role/get_role`)
        return response;
    },
    ADD_ROLE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/role/add_role`,data)
        return response;
    },
    UPDATE_ROLE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/role/update_role`,data)
        return response;
    },
    DELETE_ROLE: async (data) => {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/role/delete_role`,{ data: data })
        return response;
    },
   
}
export default RoleServices