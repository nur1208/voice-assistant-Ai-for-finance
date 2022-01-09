import axios from "axios";

export const getCurrentCountry = async () => {
  const { data } = await axios.get("https://ipapi.co/json/");

  const { country_name } = data;
  //   console.log(data);
  //   console.log({ country_name });
  return country_name;
};
