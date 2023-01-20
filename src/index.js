import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

);

// 로그인 세션 해야될 것

// - 이미지 로컬에서 등록 하는 것
// - 회원가입에서 비밀번호 8자리 이상, 영어 숫자 특수문자 포함 하여 설정하도록
// - 이메일 입력 조건 : '@', '.' 포함
// - 회원 가입 및 로그인, 아이디 찾기, 비밀번호 찾기 input값 잘못 적었을 때 해당 input으로 가기



// API 왔을 때
// - 통합구현
// - 아이디, 비밀번호 찾기 할 때 정보에 있는 이메일로 아이디 보내기 (백에서 하나?? 아님 프론트에서 send 라이브러리..?) -> 백엔드.


// token... 공부해야됨 !
// 액세스 토큰이랑 리프레시 토큰발급해주는 데 액세스 토큰으로 모든 기능을 사용할 수 있게 하는데
// 액세스 토큰이 현재 30분간 적용되고 리프레시는 하루. 근데 액세스 토큰이 30분 뒤면 꺼지기 때문에 리프레시가 아직 살아있으니
// 액세스 토큰을 다시 스토리지에 저장시킬 수 있다. 이 방식으로 계속 해야함. 