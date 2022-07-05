import { KNOWN_KEYWORD_ROUTE } from "../utils/serverUtils";
import API from "./api";

const KnownKeywordEndPoints = {
  get(keyword) {
    return API().get(
      `${KNOWN_KEYWORD_ROUTE}?keyword=${keyword}`
    );
  },
  post(keyword) {
    return API().post(`${KNOWN_KEYWORD_ROUTE}`, { keyword });
  },
};

export default KnownKeywordEndPoints;
