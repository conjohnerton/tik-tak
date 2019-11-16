import axios from "axios";
const baseUrl = "/api/yaks";

// Get server response from API
const getYaks = async (authToken, coords) => {
  // Sets header and query params
  const config = {
    headers: {
      "x-auth-token": authToken
    },
    params: {
      lat: coords.lat,
      lng: coords.lng
    }
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

export default getYaks;
