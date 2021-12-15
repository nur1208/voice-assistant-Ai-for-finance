import NewsModel from "../models/News.js";

export const createNews = async (req, res) => {
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
  const { publishedAt, ...query } = req.query;
  const publishedAtP = setMSSecondsToZero(publishedAt);

  try {
    // await NewsModel.deleteMany();
    const news = await NewsModel.find(query);

    console.log({
      query,
      publishedAt,
      publishedAtP,
      news,
      publishedE:
        news.length !== 0 &&
        setMSSecondsToZero(news[0].publishedAt),
    });

    if (
      news.length === 0 ||
      (news.length !== 0 &&
        publishedAtP === setMSSecondsToZero(news[0].publishedAt))
    ) {
      res.send({ isExist: false, status: "fail" });
      return;
    }

    res.send({ isExist: true, status: "success", article: news });
  } catch (error) {
    res.status(400).send({ isExist: false, message: "working" });
  }
};
