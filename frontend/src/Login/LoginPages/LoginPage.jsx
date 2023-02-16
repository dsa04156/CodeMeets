import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { user } from '../../Store';
import { APIroot } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';

import googleLogo from '../../assets/btn_google_signin_light_focus_web.png';
import kakaoLogo from '../../assets/kakao_login_medium_narrow.png';

const LoginPage = () => {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const [login, setLogin] = useRecoilState(user);
  const recoilUser = useRecoilValue(user);
  const API = useRecoilValue(APIroot);

  const navigate = useNavigate();

  const inputIdHandler = (event) => {
    setInputId(event.target.value);
  };

  const inputPwHandler = (event) => {
    setInputPw(event.target.value);
  };

  const enterClickHandler = (event) => {
    if (event.key === 'Enter') {
      ToHomePageHandler();
    }
  };

  const ToHomePageHandler = async () => {
    await axios({
      method: 'POST',
      url: `${API}/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        userId: inputId,
        password: inputPw,
      }),
    })
      .then((response) => {
        localStorage.setItem('ACCESS_TOKEN', response.data.AccessToken);
        localStorage.setItem('REFRESH_TOKEN', response.data.RefreshToken);
      })
      .catch((err) => alert('ID or password 불일치'));
    await axios({
      method: 'GET',
      url: `${API}/login/info`,
      headers: {
        'Content-Type': 'application/json',
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`, // 웹 통신규약에 따르면 Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')} 으로..
      },
    }).then((response) => {
      const data = response.data.userInfo;
      setLogin(data);
      navigate('/home');
    });
  };

  const SocialToHomePageHandler = async () => {
    await localStorage.setItem('ACCESS_TOKEN', accessToken);
    await localStorage.setItem('REFRESH_TOKEN', refreshToken);
    await axios({
      method: 'GET',
      url: `${API}/login/info`,
      headers: {
        'Content-Type': 'application/json',
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`, // 웹 통신규약에 따르면 Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')} 으로..
      },
    }).then((response) => {
      const data = response.data.userInfo;
      setLogin(data);
      navigate('/home');
    });
  };

  const accessToken = new URL(window.location.href).searchParams.get(
    'accessToken'
  );
  const refreshToken = new URL(window.location.href).searchParams.get(
    'refreshToken'
  );
  const myUrl = window.location.host;
  const loginURL = API.replace('/api', '');
  // const loginURL = "http://localhost:18081";
  const googleLogInUrl = new URL(`${loginURL}/oauth2/authorization/google`);
  const kakaoLogInUrl = new URL(`${loginURL}/oauth2/authorization/kakao`);

  if (accessToken) {
    SocialToHomePageHandler();
  }

  return (
    <div style={{ paddingBottom: '100px' }}>
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
      <InputStyle>
        <label htmlFor="input_pw">PW</label>
        <input
          type="password"
          name="input_pw"
          placeholder="PW"
          onKeyPress={enterClickHandler}
          onChange={inputPwHandler}
        />
      </InputStyle>
      <div>
        <SubButtonStyle>
          <button
            className="custom-btn btn-4"
            onClick={ToHomePageHandler}
            style={{ width: '100%', marginBottom: '5px' }}
          >
            로그인
          </button>
        </SubButtonStyle>
        <div>
          <a href={googleLogInUrl}>
            <img src={googleLogo} style={{ width: '17vh', height: '5vh', margin: '5px 5px 5px 10px' }} />
          </a>
          <a href={kakaoLogInUrl}>
            <img src={kakaoLogo} style={{ width: '17vh', height: '5vh', margin: '5px 5px 5px 5px' }} />
          </a>
        </div>
      </div>
      <SubButtonStyle style={{marginTop:"20px", display:"flex", justifyContent:"space-between", alignItems: "flexEnd"}}>
        <Link
          to="/signup"
          style={{
            margin: '0px 12px 0px 0px',
            textDecoration: 'none',
            fontSize: 'small',
            color: 'grey',

          }}
        >
          회원가입
        </Link>
        <div>
        <Link
          to="/findid"
          style={{
            margin: '0px 12px 0px 0px',
            textDecoration: 'none',
            fontSize: 'small',
            color: 'grey',
          }}
        >
          ID 찾기
        </Link>
        <Link
          to="/findpassword"
          style={{
            margin: '0px 0px 0px 0px',
            textDecoration: 'none',
            fontSize: 'small',
            color: 'grey',
          }}
        >
          PW 찾기
        </Link>
        </div>
      </SubButtonStyle>
      <SocialButton>
        {/* <a href={googleLogInUrl}>
          <img src={googleLogo} style={{width: "20vh", height: "5vh" }} />
        </a>
        <a href={kakaoLogInUrl}>
          <img src={kakaoLogo} style={{width: "20vh", height: "5vh" }}/>
        </a> */}
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

const SocialButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px;
  margin-left: 0px;
  margin-bottom: 0px;
  align-items: center;
`;

const SubButtonStyle = styled.div`
  .custom-btn {
    width: 100px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    margin: 8px 0px 50px 0px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    float: right;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
  }
  .btn-4 {
    background-color: #4dccc6;
    background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
    line-height: 42px;
    padding: 0;
    border: none;
  }
  .btn-4:hover {
    background-color: #89d8d3;
    background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
  }
  .btn-4 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-4:before,
  .btn-4:after {
    position: absolute;
    content: '';
    right: 0;
    top: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-4:before {
    height: 0%;
    width: 0.1px;
  }
  .btn-4:after {
    width: 0%;
    height: 0.1px;
  }
  .btn-4:hover:before {
    height: 100%;
  }
  .btn-4:hover:after {
    width: 100%;
  }
  .btn-4 span:before,
  .btn-4 span:after {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-4 span:before {
    width: 0.1px;
    height: 0%;
  }
  .btn-4 span:after {
    width: 0%;
    height: 0.1px;
  }
  .btn-4 span:hover:before {
    height: 100%;
  }
  .btn-4 span:hover:after {
    width: 100%;
  }
`;
