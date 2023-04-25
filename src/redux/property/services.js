import axios from "axios";
import { getToken } from "helper/methods";

const PropertyServices = {
  ADD_TS_DATA: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/property/add_all_ts_data`,
      data,
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },

  GET_ALL_TS_DATA: async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/property/get_all_ts_data`,
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },
  GET_TS_DATA_BY_RERA_NUMBER_OR_PA_ID: async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/property/get_tracks_by_rera_number_or_pa_id?num=${id}`,
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },

  ADD_BULK_PROPERTIES: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/property/bulk_add_properties`,
      data,
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },
};
export default PropertyServices;
