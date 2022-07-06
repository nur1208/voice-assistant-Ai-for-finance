import { COMPANIES_ROUTE } from "../utils/serverUtils";
import API from "./api";

const CompanyEndPoints = {
  get(type, value) {
    return API().get(`${COMPANIES_ROUTE}?${type}=${value}`);
  },
};

export default CompanyEndPoints;
