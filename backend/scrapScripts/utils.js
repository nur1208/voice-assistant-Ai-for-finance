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
