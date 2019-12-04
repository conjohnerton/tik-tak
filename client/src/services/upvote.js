import axios from "axios";
const baseUrl = "/api/yaks";

async function upvote(authToken, yakID) {
  const response = await axios.post(`${baseUrl}/${yakID}/upvote`, {
    headers: {
      "x-auth-token": authToken
    }
  });

  return response.data;
}

export default upvote;
