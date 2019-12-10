import axios from "axios";
const baseUrl = "/api/yaks";

// Sends yak data to server and returns response
async function addYak(authToken, yakData, imageFile) {
  // Create form data object and add fields
  const bodyFormData = new FormData();

  bodyFormData.set("content", yakData.content);
  bodyFormData.set("lat", yakData.lat);
  bodyFormData.set("lng", yakData.lng);

  if (imageFile) {
    bodyFormData.append("image", imageFile);
  }

  const response = await axios({
    method: "post",
    url: baseUrl,
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": authToken
    }
  });

  return response.data;
}

export default addYak;
