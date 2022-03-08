import { useEffect, useState } from "react";

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState("online");

  useEffect(() => {
    const onlineFunction = () => setNetworkStatus("online");

    const offlineFunction = () => setNetworkStatus("offline");

    window.addEventListener("online", onlineFunction);
    window.addEventListener("offline", offlineFunction);

    return () => {
      window.removeEventListener("online", onlineFunction);
      window.removeEventListener("offline", offlineFunction);
    };
  }, []);

  return networkStatus;
};
