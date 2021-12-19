import axios from "axios";

export const handleGiveMeMoreNews = async (
  pageNumber,
  setPageNumber
) => {
  let NEWS_API_URL = `http://localhost:4050/api/v1/news?page=${
    pageNumber + 10
  }`;
  setPageNumber(pageNumber + 10);
  const {
    data: { articles, isExist },
  } = await axios.get(NEWS_API_URL);
};
