import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    <div id="card-background">
      <h2>Login Page</h2>
      <div>
        <label htmlFor="input_id"></label>
        <input type="text" name="input_id" placeholder="ID" onChange={inputIdHandler}/>
      </div>
      {/* defaultValue : 변하는 값*/}
      <div>
        <label htmlFor="input_pw"></label>
        <input type="text" name="input_pw" placeholder="PW" onChange={inputPwHandler}/>
      </div>
      <div>
        <button onClick={ToHomePageHandler}>Login</button>
      </div>
      <Link to="/signup">회원가입</Link> |<Link to="/findid"> 아이디 찾기</Link>{' '}
      |<Link to="/findpassword"> 비밀번호 찾기</Link>
    </div>
  );
};

export default LoginPage;
