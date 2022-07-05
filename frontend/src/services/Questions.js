import { QUESTIONS_ROUTE } from "../utils/serverUtils";
import API from "./api";

const QuestionEndPoints = {
  get() {
    return API().get(QUESTIONS_ROUTE);
  },
};

export default QuestionEndPoints;
