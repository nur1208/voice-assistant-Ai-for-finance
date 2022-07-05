import axios from "axios";
import { BACKEND_API_URL } from "../utils/serverUtils";

const API = () => {
  return axios.create({
    baseURL: `${BACKEND_API_URL}`,
    headers: { auth: process.env.REACT_APP_AUTO_SERVER_SECRET },
  });
};
export default API;
