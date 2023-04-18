import axios from 'axios'
import { config_header, getToken } from 'helper/methods';

const GeolocationService = {

    GET_STATES: async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/geo/get_states`,config_header)
        return response;
    },
    ADD_STATE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/geo/add_states`,data,config_header)
        return response;
    },
    UPDATE_STATE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/geo/update_states`,data,config_header)
        return response;
    },
    DELETE_STATE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/geo/delete_state`,data,config_header)
        return response;
    },
    GET_CITIES: async (data) => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/geo/get_cities?id=${data}`,config_header)
        return response;
    },
    ADD_CITY: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/geo/add_or_update_city`,data,config_header)
        return response;
    },
    DELETE_CITY: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/geo/delete_city`,data,config_header)
        return response;
    },
    GET_ZONE: async (data) => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/geo/get_zones?city=${data}`,config_header)
        return response;
    },
    ADD_OR_UPDATE_ZONE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/geo/add_or_update_zone`,data,config_header)
        return response;
    },
    DELETE_ZONE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/geo/delete_zone`,data,config_header)
        return response;
    },

}
export default GeolocationService