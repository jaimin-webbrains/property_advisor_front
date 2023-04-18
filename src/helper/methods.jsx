import moment from "moment";

export const randomUUID = () => {
  return (
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1) +
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  );
};

export const subtaskTicket = () => {
  return (
    "#" +
    Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1) +
    Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1)
  );
};

export const dateFormat = date => {
  return moment(date).format("MMMM Do, h:mm a");
};

export const onlyDate = date => {
  return moment(date).format("MMM Do");
};

export const datesWithYear = date => {
  return moment(date).format("MMM Do YYYY");
};

export const getToken = () => {
  let access_token
  const data = JSON.parse(localStorage.getItem('persist:root'))
  if(data){
    const authData = JSON.parse(data && data.auth)
    access_token = `Bearer ${authData.accessToken}`
  }
  return access_token
}
export const config_header = {
  headers: {
    'Authorization': getToken(),
    'Content-Type': 'application/json'
  }
}
