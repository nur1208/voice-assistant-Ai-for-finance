import axios from "axios";
import File from "fs";
const main = async () => {
  const headers = {
    "Accept-Ranges": "bytes",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers":
      "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",
    "Access-Control-Allow-Methods":
      "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Origin": "https://vidembed.io",
    Connection: "keep-alive",
    "Content-Length": 113,
    "Content-Type": "application/vnd.apple.mpegurl",
    // Date: "Fri, 31 Dec 2021 10:24:10 GMT",
    ETag: "60720872-71",
    // "Last-Modified": "Sat, 10 Apr 2021 20:20:02 GMT",
    Server: "nginx",
  };
  const proxy = {
    host: "127.0.0.1",
    port: 4780,
  };
  try {
    const r = await axios(
      "https://api.new.livestream.com/accounts/15210385/events/4353996/videos/113444715.m3u8",
      { headers, proxy }
    );
    console.log(r);
  } catch (error) {
    console.log(error);
  }

  //   const myFile = new File([blob], "demo.mp4", {
  //     type: "video/mp4",
  //   });
  //   console.log(myFile);
  console.log("done ");
};
main();
