import axios from 'axios'
import { getToken } from 'helper/methods';

const GeolocationService = {

    GET_STATES: async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/geo/get_states`)
        return response;
    },
    ADD_STATE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/geo/add_states`,data)
        return response;
    },
    UPDATE_STATE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/geo/update_states`,data)
        return response;
    },
    DELETE_STATE: async (data) => {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/geo/delete_state`,{ data: data })
        return response;
    },
    GET_CITIES: async (data) => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/geo/get_cities?id=${data}`)
        return response;
    },
    ADD_CITY: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/geo/add_or_update_city`,data)
        return response;
    },
    DELETE_CITY: async (data) => {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/geo/delete_city`,{ data: data })
        return response;
    },
    GET_ZONE: async (data) => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/geo/get_zones?city=${data}`)
        return response;
    },
    ADD_OR_UPDATE_ZONE: async (data) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/geo/add_or_update_zone`,data)
        return response;
    },
    DELETE_ZONE: async (data) => {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/geo/delete_zone`,{ data: data })
        return response;
    },

}
export default GeolocationService