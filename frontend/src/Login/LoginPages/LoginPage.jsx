import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = () => {
  const API = "http://localhost:3002/login";

  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const navigate = useNavigate();

  const inputIdHandler = (event) => {
    setInputId(event.target.value)
  };

  const inputPwHandler = (event) => {
    setInputPw(event.target.value)
  };

  const ToHomePageHandler = () => {
    // fetch(API, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     id: this.state.id,
    //     password: this.state.pw
    //   }),
    // })
    // .then(response => response.json())
    // .then(result => {
    //   if (result.Authorization){
    //     localStorage.setItem("token", result.Authorization);
    //   }
    // });
    navigate('/');
    // console.log(inputId)
    // console.log(inputPw)
  };

  return (
    <div style={{paddingBottom:"100px"}}>
      <h1>Login</h1>
      <InputStyle>
        <label htmlFor="input_id">ID</label>
        <input type="text" name="input_id" placeholder="ID" onChange={inputIdHandler}/>
      </InputStyle>
      {/* defaultValue : 변하는 값*/}
      <InputStyle>
        <label htmlFor="input_pw">PW</label>
        <input type="text" name="input_pw" placeholder="PW" onChange={inputPwHandler}/>
      </InputStyle>
      <ButtonStyle>
        <button onClick={ToHomePageHandler} style={{width:"100%"}}>Sign In</button>
      </ButtonStyle>
      <Link to="/codemeets/signup">회원가입</Link> |<Link to="/codemeets/findid"> 아이디 찾기</Link>{' '}
      |<Link to="/codemeets/findpassword"> 비밀번호 찾기</Link>
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
`
const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px;
  margin-left: 0px;
  margin-bottom: 60px;
`