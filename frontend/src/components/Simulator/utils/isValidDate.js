export const getYearMonthDay = (stringDate) => {
  return stringDate.split("-").map((item) => Number(item));
};

export const isValidDateFormat = (stringDate) => {
  if (!stringDate.includes("-")) return false;
  if (stringDate.split("-").length !== 3) return false;
  return true;
};

export const isValidDate = (year, month, day) => {
  if (!year || !month || !day) return false;

  if (month > 13 || month < 0) return false;
  if (day > 32 || day < 0) return false;
  if (year < 1900) return false;

  var d = new Date(year, month, day);

  return (
    d.getMonth() + 1 !== month ||
    d.getDate() !== day ||
    d.getFullYear() !== year
  );
};
