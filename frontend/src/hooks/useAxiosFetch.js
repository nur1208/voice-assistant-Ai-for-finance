import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

export const useAxiosFetch = (
  url,
  method = "get",
  payload,
  isDidMount = true
) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  // https://axios-http.com/docs/cancellation
  useEffect(() => {
    if (!isDidMount) return;
    const controller = new AbortController();

    let unmounted = false;
    // (async () => {
    //   try {
    //     if (!unmounted) {
    //       // const { data } = await axios({
    //       //   url,
    //       //   method,
    //       //   data: payload,
    //       //   // signal: controller.signal,
    //       // });
    //       fetch(url, {
    //         signal: controller.signal,
    //       }).then(() => {
    //         setData(data);
    //         setLoading(false);
    //       });
    //     }
    //   } catch (e) {
    //     if (!unmounted) {
    //       setError(true);
    //       setErrorMessage(e.message);
    //       setLoading(false);
    //       if (axios.isCancel(e)) {
    //         console.log(`request cancelled:${e.message}`);
    //       } else {
    //         console.log("another error happened:" + e.message);
    //       }
    //     }
    //   }
    // })();
    fetch(url, {
      signal: controller.signal,
    }).then(() => {
      setData(data);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps

      unmounted = true;
      controller.abort();
    };
  }, [url, method, isDidMount, payload]);

  // useEffect(() => {
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     // unmounted = true;
  //     controller.abort();
  //   };
  // }, [url, method, isDidMount, payload]);

  return { data, loading, error, errorMessage };
};

// import { useState, useEffect } from "react";
// import axios, { AxiosResponse } from "axios";

// const useAxiosFetch = (url) => {
//   const [data, setData] = useState();
//   const [error, setError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let unmounted = false;
//     let source = axios.CancelToken.source();
//     axios
//       .get(url, {
//         cancelToken: source.token,
//         // timeout: timeout,
//       })
//       .then((a) => {
//         if (!unmounted) {
//           // @ts-ignore
//           setData(a.data);
//           setLoading(false);
//         }
//       })
//       .catch(function (e) {
//         if (!unmounted) {
//           setError(true);
//           setErrorMessage(e.message);
//           setLoading(false);
//           if (axios.isCancel(e)) {
//             console.log(`request cancelled:${e.message}`);
//           } else {
//             console.log("another error happened:" + e.message);
//           }
//         }
//       });
//     return function () {
//       unmounted = true;
//       source.cancel("Cancelling in cleanup");
//     };
//   }, [url]);

//   return { data, loading, error, errorMessage };
// };

// export default useAxiosFetch;
