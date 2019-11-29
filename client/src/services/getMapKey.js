import axios from "axios";
const baseUrl = "/api/map";

async function getMapKey() {
  const response = await axios.get(baseUrl);

  return response.data;
}

export default getMapKey;
