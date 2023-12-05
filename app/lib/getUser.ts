import Axios from "axios";

export default async function getUser() {
  const userResponse = await Axios.get("http://localhost:3001/getUser", {
    responseType: "json",
    withCredentials: true,
  });
  console.log(userResponse.data);
  return userResponse.data; // Return user data, not the entire response
}
