import { useEffect, useState } from "react";

export const useIsChrome = () => {
  const [isChrome, setIsChrome] = useState(true);

  useEffect(() => {
    let isChromium = window.chrome;
    let winNav = window.navigator;
    let vendorName = winNav.vendor;
    let isOpera = typeof window.opr !== "undefined";
    let isIEedge = winNav.userAgent.indexOf("Edg") > -1;
    let isIOSChrome = winNav.userAgent.match("CriOS");
    let isChromeLocal =
      /Chrome/.test(navigator.userAgent) &&
      /Google Inc/.test(navigator.vendor);
    if (isIOSChrome) {
      // is Google Chrome on IOS
      setIsChrome(true);
    } else if (
      isChromium !== null &&
      typeof isChromium !== "undefined" &&
      vendorName === "Google Inc." &&
      isOpera === false &&
      isIEedge === false &&
      isChromeLocal
    ) {
      setIsChrome(true);

      // is Google Chrome
    } else {
      setIsChrome(false);

      // not Google Chrome
    }
  }, []);

  return isChrome;
};
