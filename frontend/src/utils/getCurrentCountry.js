import axios from "axios";
import { useEffect, useState } from "react";
import { sleep } from "./sleep";
export const getCurrentCountry = async () => {
  const { data } = await axios.get("https://ipapi.co/json/");

  const { country_name } = data;
  return country_name;
};

export const useGetCurrentCountry = (networkStatus) => {
  const [userCountry, setUserCountry] = useState("loading");

  useEffect(() => {
    (async () => {
      await sleep(1000 * 5);
      const userCurrentCountry = await getCurrentCountry();
      setUserCountry(userCurrentCountry);
    })();
  }, [networkStatus]);

  return userCountry;
};
