import axios from "axios";
export const baseUrl = () => {
  return axios.create({
    baseURL: "https://668f20a5bf9912d4c9309f57.mockapi.io/",
  });
};
