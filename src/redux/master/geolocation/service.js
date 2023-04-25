import axios from "axios";
import {  getToken } from "helper/methods";

const GeolocationService = {
  GET_STATES: async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_states`,
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },
  ADD_STATE: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_states`,
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
  UPDATE_STATE: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/update_states`,
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
  DELETE_STATE: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_state`,
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
  GET_CITIES: async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_cities?district=${data}`,
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },
  ADD_CITY: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_city`,
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
  DELETE_CITY: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_city`,
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
  GET_ZONE: async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_zones?city=${data}`,
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },
  ADD_OR_UPDATE_ZONE: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_zone`,
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
  DELETE_ZONE: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_zone`,
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
  GET_DISTRICT: async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_districts?state=${data}`,
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },
  ADD_OR_UPDATE_DISTRICT: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_district`,
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
  DELETE_DISTRICT: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_district`,
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
  GET_LANDMARK: async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_landmarks?subLocation=${data}`,
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },
  ADD_OR_UPDATE_LANDMARK: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_landmark`,
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
  DELETE_LANDMARK: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_landmark`,
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
  GET_LOCATION: async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_locations?zone=${data}`,
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },
  ADD_OR_UPDATE_LOCATION: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_location`,
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
  DELETE_LOCATION: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_location`,
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
  GET_SUB_LOCATION: async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/geo/get_sub_locations?location=${data}`,
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  },
  ADD_OR_UPDATE_SUB_LOCATION: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/add_or_update_sub_location`,
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
  DELETE_SUB_LOCATION: async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/geo/delete_sub_location`,
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
export default GeolocationService;
