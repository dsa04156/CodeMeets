import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { user } from "../../Store"
import { APIroot } from "../../Store"
import { useRecoilState, useRecoilValue } from "recoil";

import googleLogo from '../../assets/google_login.png';
import kakaoLogo from '../../assets/kakao_login_medium.png';


const LoginPage = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [login, setLogin] = useRecoilState(user);
  const recoilUser = useRecoilValue(user)
  const API = useRecoilValue(APIroot);

  const navigate = useNavigate();

  const inputIdHandler = (event) => {
    setInputId(event.target.value);
  };

  const inputPwHandler = (event) => {
    setInputPw(event.target.value);
  };

  const ToHomePageHandler = async () => {
    await axios({
      method: "POST",
      url: `${API}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        userId: inputId,
        password: inputPw,
      }),
    })
      .then((response) => {
        localStorage.setItem("ACCESS_TOKEN", response.data.AccessToken);
        localStorage.setItem("REFRESH_TOKEN", response.data.RefreshToken);

        console.log(response.data);
        console.log(response.data.AccessToken);
        console.log(response.data.RefreshToken);
        // navigate('/');
      })
      .catch((err) => alert("ID or password 불일치"));
    await axios({
      method: "GET",
      url: `${API}/login/info`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`, // 웹 통신규약에 따르면 Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')} 으로..
      },
    }).then((response) => {
      console.log(response.data.userInfo);
      const data = response.data.userInfo;
      setLogin(data);
      navigate("/home")
      console.log("리코일 데이터")
      console.log(recoilUser)
    });
  };

  const SocialToHomePageHandler = async () => {
    await localStorage.setItem("ACCESS_TOKEN", accessToken);
    await localStorage.setItem("REFRESH_TOKEN", refreshToken);
    console.log(accessToken);
    await axios({
      method: "GET",
      url: `${API}/login/info`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`, // 웹 통신규약에 따르면 Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')} 으로..
      },
    }).then((response) => {
      console.log(response.data.userInfo);
      const data = response.data.userInfo;
      setLogin(data);
      navigate("/")
      console.log("리코일 데이터")
      console.log(recoilUser)
    });
  };

  const accessToken = new URL(window.location.href).searchParams.get("accessToken");
  const refreshToken = new URL(window.location.href).searchParams.get("refreshToken");
  const myUrl = window.location.host;
  const loginURL = API.replace("/api", "");
  // const loginURL = "http://localhost:18081";
  const googleLogInUrl = new URL(`${loginURL}/oauth2/authorization/google`);
  const kakaoLogInUrl = new URL(`${loginURL}/oauth2/authorization/kakao`);

  if (accessToken) {
    SocialToHomePageHandler();
    // navigate("/");
    // window.location.replace("/");
  }


  return (
    <div style={{ paddingBottom: "100px" }}>
      <h1>Login</h1>
      <InputStyle>
        <label htmlFor="input_id">ID</label>
        <input
          type="text"
          name="input_id"
          placeholder="ID"
          onChange={inputIdHandler}
        />
      </InputStyle>
      {/* defaultValue : 변하는 값*/}
      <InputStyle>
        <label htmlFor="input_pw">PW</label>
        <input
          type="text"
          name="input_pw"
          placeholder="PW"
          onChange={inputPwHandler}
        />
      </InputStyle>
      <ButtonStyle>
        <button onClick={ToHomePageHandler} style={{ width: "100%" }}>
          Sign In
        </button>
      </ButtonStyle>
      <Link to="/signup">회원가입</Link> |
      <Link to="/findid"> 아이디 찾기</Link> |
      <Link to="/findpassword"> 비밀번호 찾기</Link> |
      
      <SocialButton>
        <a href={googleLogInUrl}><img src={googleLogo} width="100"/></a>
        <a href={kakaoLogInUrl}><img src={kakaoLogo} /></a>
      </SocialButton>
      
    </div>
  );
};

export default LoginPage;

const InputStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    margin: 8px;
  }
`;
const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px;
  margin-left: 0px;
  margin-bottom: 60px;
`;
const SocialButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px;
  margin-left: 0px;
  margin-bottom: 60px;
  align-items: center;
`;