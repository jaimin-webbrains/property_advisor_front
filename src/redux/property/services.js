import axios from 'axios'

const BASE_URL = 'http://localhost:3005'
const PropertyServices = {

    GET_STATES: async () => {
        const response = await axios.get(`${BASE_URL}/property/get_states`)
        return response;
    },

    ADD_TS_DATA: async (data) => {
        const response = await axios.post(`${BASE_URL}/property/add_all_ts_data`, data)
        return response
    },

    GET_ALL_TS_DATA: async () => {
        const response = await axios.get(`${BASE_URL}/property/get_all_ts_data`)
        return response
    }

}
export default PropertyServices