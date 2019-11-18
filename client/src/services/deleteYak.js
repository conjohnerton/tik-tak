import axios from "axios";
const baseUrl = "/api/yaks";

async function deleteYak(authToken, yakID) {
  const response = await axios.delete(`${baseUrl}/${yakID}`, {
    headers: {
      "x-auth-token": authToken
    }
  });

  return response.data;
}

export default deleteYak;
