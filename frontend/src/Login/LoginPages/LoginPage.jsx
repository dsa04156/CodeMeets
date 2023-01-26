import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthState,useAuthDispatch,loginUser } from '../../Context';


const LoginPage = (props) => {
  const API = "http://localhost:3002/login";
  const dispatch = useAuthDispatch()
  const {loading} = useAuthState()

  const [userId, setInputId] = useState('');
  const [password, setInputPw] = useState('');

  const navigate = useNavigate();

  const inputIdHandler = (event) => {
    setInputId(event.target.value)
  };

  const inputPwHandler = (event) => {
    setInputPw(event.target.value)
  };

  const loginHandler = async(e) => {
    e.preventDefault()
    let payload = {userId,password}
    console.log(payload)
    try{
      const response = await loginUser(dispatch,payload)
      console.log(response)
      if(!response.user) return
      props.history.push('/')
    }catch(e){
      console.log(e)
    }
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
        <button onClick={loginHandler} style={{width:"100%"}}>Sign In</button>
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