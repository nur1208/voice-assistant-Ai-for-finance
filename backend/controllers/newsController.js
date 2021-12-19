import NewsModel from "../models/News.js";

export const createNews = async (req, res) => {
  console.log(req.body);
  try {
    const news = new NewsModel(req.body);

    await news.save();
    res.send("article has been saved.");
  } catch (error) {
    res.status(500).send("article failed to save.");
  }
};

export const setMSSecondsToZero = (dateString) => {
  const date = new Date(dateString);
  date.setMilliseconds(0);
  date.setSeconds(0);
  // date.setMinutes(0);
  return date;
};

export const getNews = async (req, res) => {
  const {
    publishedAt,
    keywordInTitle,
    sortBy,
    page,
    size,
    ...query
  } = req.query;

  const publishedAtP = setMSSecondsToZero(publishedAt);
  const options = {};

  const pageV = page ? parseInt(page) : 1;
  const sizeV = size ? parseInt(size) : 10;

  options.limit = sizeV;
  options.skip = (pageV - 1) * sizeV;

  if (sortBy) {
    options.sort = `-${sortBy}`;
  }
  if (keywordInTitle) {
    query.title = {
      $regex: new RegExp(
        `(?<![a-zA-Z0-9])(${keywordInTitle})(?![a-zA-Z0-9])`,
        "i"
      ),
    };
  }

  try {
    console.log({ query, options });
    // await NewsModel.deleteMany();
    const news = await NewsModel.find(query, null, options);

    // console.log({
    //   query,
    //   publishedAt,
    //   publishedAtP,
    //   news,
    //   publishedE:
    //     news.length !== 0 &&
    //     setMSSecondsToZero(news[0].publishedAt),
    // });

    if (
      news.length === 0 ||
      (news.length !== 0 &&
        publishedAtP === setMSSecondsToZero(news[0].publishedAt))
    ) {
      res.send({ isExist: false, status: "fail" });
      return;
    }

    res.send({
      isExist: true,
      status: "success",
      resultLength: news.length,
      articles: news,
    });
  } catch (error) {
    res.status(400).send({ isExist: false, message: "working" });
  }
};
