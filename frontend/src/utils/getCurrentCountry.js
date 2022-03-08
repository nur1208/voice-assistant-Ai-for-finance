import axios from "axios";
import { useEffect, useState } from "react";
import { sleep } from "./sleep";
export const getCurrentCountry = async () => {
  const { data } = await axios.get("https://ipapi.co/json/");

  const { country_name } = data;
  //   console.log(data);
  //   console.log({ country_name });
  return country_name;
};

export const useGetCurrentCountry = () => {
  const [userCountry, setUserCountry] = useState("loading");

  useEffect(() => {
    (async () => {
      while (true) {
        const userCurrentCountry = await getCurrentCountry();
        setUserCountry(userCurrentCountry);
        await sleep(1000 * 5);
      }
    })();
  }, []);

  return userCountry;
};
