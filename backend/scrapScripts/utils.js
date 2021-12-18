import axios from "axios";

const epochs = [
  ["year", 31536000],
  ["month", 2592000],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];
const getDuration = (timeAgoInSeconds) => {
  for (let [name, seconds] of epochs) {
    const interval = Math.floor(timeAgoInSeconds / seconds);
    if (interval >= 1) {
      return {
        interval: interval,
        epoch: name,
      };
    }
  }
};

export const timeAgo = (date) => {
  const timeAgoInSeconds = Math.floor(
    (new Date() - new Date(date)) / 1000
  );
  const { interval, epoch } = getDuration(timeAgoInSeconds);
  const suffix = interval === 1 ? "" : "s";
  return `${interval} ${epoch}${suffix} ago`;
};

const secondsOfTimeWords = {
  year: 31536000,
  years: 31536000,
  month: 2592000,
  months: 2592000,
  day: 86400,
  days: 86400,
  hour: 3600,
  hours: 3600,
  minute: 60,
  minutes: 60,
  second: 1,
  seconds: 1,
};

export const convertTimeSinceToDate = (dateS) => {
  const dateArray = dateS.split(" ");
  const number = Number(dateArray[0]);
  const timeWord = dateArray[1];

  return new Date(
    Date.now() - number * (secondsOfTimeWords[timeWord] * 1000)
  ).toISOString();
};

export const autoScroll = async (page, options = {}) => {
  // const scrollFunction = (options) =>
  //   new Promise((resolve, reject) => {
  //     //   var totalHeight = 0;
  //     var distance = 100;
  //     var timer = setInterval(() => {
  //       // var scrollHeight = document.body.scrollHeight;
  //       window.scrollBy(0, distance);
  //       // totalHeight += distance;

  //       // if (
  //       //   document.scrollingElement.scrollTop +
  //       //     window.innerHeight >=
  //       //   document.scrollingElement.scrollHeight
  //       // )

  //       if (
  //         document.scrollingElement.scrollTop +
  //           window.innerHeight >=
  //         (options.scrollHeight || 4991)
  //       ) {
  //         clearInterval(timer);
  //         resolve();
  //       }
  //     }, options.daly || 100);
  //   });

  // await page.evaluate(async () => {
  //   await scrollFunction(options);
  // });
  await page.evaluate(async (options) => {
    await new Promise((resolve, reject) => {
      //   var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        // var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        // totalHeight += distance;

        // if (
        //   document.scrollingElement.scrollTop +
        //     window.innerHeight >=
        //   document.scrollingElement.scrollHeight
        // )

        if (
          document.scrollingElement.scrollTop +
            window.innerHeight >=
          (options.scrollHeight || 4991)
        ) {
          clearInterval(timer);
          resolve();
        }
      }, options.delay || 100);
    });
  }, options);
};

export const addArticlesToDB = async (article) => {
  const apiUrl = "http://localhost:4050/api/v1/news";
  const {
    data: { isExist },
  } = await axios.get(
    `${apiUrl}?title=${encodeURIComponent(
      article.title
    )}&publishedAt=${encodeURIComponent(
      article.publishAt
    )}&source=${article.source}`
  );

  if (isExist) {
    console.log("article is exist");
  } else {
    console.log("article is not exist");

    await axios.post(apiUrl, article);
    console.log("so article added successfully to the database");
  }
};
