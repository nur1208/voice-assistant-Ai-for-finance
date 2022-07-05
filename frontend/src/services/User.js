import { USER_ROUTE } from "../utils/serverUtils";
import API from "./api";

const UserEndPoints = {
  signup(userData) {
    return API().post(`${USER_ROUTE}/signup`, { ...userData });
  },
};

export default UserEndPoints;
