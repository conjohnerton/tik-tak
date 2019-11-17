import axios from "axios";
const baseUrl = "/api/yaks";

// Sends yak data to server and returns response
async function addYak(authToken, yakData) {
  const response = await axios.post(baseUrl, yakData, {
    headers: {
      "x-auth-token": authToken
    }
  });

  return response.data;
}

export default addYak;
