import axios from "axios";
import { config_header, getToken } from "helper/methods";

const GeolocationService = {
  GET_STATES: async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_states`,
      config_header
    );
    return response;
  },
  ADD_STATE: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_states`,
      data,
      config_header
    );
    return response;
  },
  UPDATE_STATE: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/update_states`,
      data,
      config_header
    );
    return response;
  },
  DELETE_STATE: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_state`,
      data,
      config_header
    );
    return response;
  },
  GET_CITIES: async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_cities?id=${data}`,
      config_header
    );
    return response;
  },
  ADD_CITY: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_city`,
      data,
      config_header
    );
    return response;
  },
  DELETE_CITY: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_city`,
      data,
      config_header
    );
    return response;
  },
  GET_ZONE: async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_zones?city=${data}`,
      config_header
    );
    return response;
  },
  ADD_OR_UPDATE_ZONE: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_zone`,
      data,
      config_header
    );
    return response;
  },
  DELETE_ZONE: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_zone`,
      data,
      config_header
    );
    return response;
  },
  GET_DISTRICT: async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_districts`,
      config_header
    );
    return response;
  },
  ADD_OR_UPDATE_DISTRICT: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_district`,
      data,
      config_header
    );
    return response;
  },
  DELETE_DISTRICT: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_district`,
      data,
      config_header
    );
    return response;
  },
  GET_SUB_DISTRICT: async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_sub_districts`,
      config_header
    );
    return response;
  },
  ADD_OR_UPDATE_SUB_DISTRICT: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_sub_district`,
      data,
      config_header
    );
    return response;
  },
  DELETE_SUB_DISTRICT: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_sub_district`,
      data,
      config_header
    );
    return response;
  },
  GET_LOCATION: async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_locations`,
      config_header
    );
    return response;
  },
  ADD_OR_UPDATE_LOCATION: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_location`,
      data,
      config_header
    );
    return response;
  },
  DELETE_LOCATION: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_location`,
      data,
      config_header
    );
    return response;
  },
  GET_SUB_LOCATION: async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_sub_locations`,
      config_header
    );
    return response;
  },
  ADD_OR_UPDATE_SUB_LOCATION: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_sub_location`,
      data,
      config_header
    );
    return response;
  },
  DELETE_SUB_LOCATION: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_sub_location`,
      data,
      config_header
    );
    return response;
  },
};
export default GeolocationService;
