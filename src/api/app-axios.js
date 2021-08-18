import axios from "axios";
export const AppAxios = axios.create({
  baseURL: "https://m2.center/api-quiz/",
  // withCredentials: true,
});
