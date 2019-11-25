import axios from "axios";
const baseUrl = "api/comments";

export default async (authToken, commentData) => {
  const response = await axios.post(baseUrl, commentData, {
    headers: {
      "x-auth-token": authToken
    }
  });

  return response.data;
};
