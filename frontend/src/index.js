import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

// openvidu
import registerServiceWorker from "./registerServiceWorker";

import reportWebVitals from "./reportWebVitals";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";


// import axios from "axios";
// window.addEventListener("beforeunload", (event) => {
//   // 표준에 따라 기본 동작 방지
//   event.preventDefault();
//   console.log(document.readyState)

//   if (window.screenY > 9000) {
//     axios({
//       method: "PUT",
//       url: "https://i8d109.p.ssafy.io/api/login/logout",
//       headers: {
//         AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
//       },
//     })
//       .then((response) => {
//         console.log(response.data);
//         window.localStorage.clear();
//         console.log("logout");
//       })
//       .catch((err) => console.log(err));
// } else {
//     if(document.readyState == "complete") {

//         // 새로고침
//     } else if(document.readyState == "loading") {

//         // 다른 사이트로 이동
//     }
// }
//  Chrome에서는 returnValue 설정이 필요함
//     event.returnValue = "";
// });



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);
registerServiceWorker();
reportWebVitals();
