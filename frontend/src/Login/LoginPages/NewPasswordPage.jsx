import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NewPasswordPage = () => {
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  
  const NewPassword1Handler = (event) => {
    setNewPassword1(event.target.value);
  };
  const NewPassword2Handler = (event) => {
    setNewPassword2(event.target.value);
  };

  const ChangeToPassword = () => {
    console.log(newPassword1);
    console.log(newPassword2);
    if (newPassword1 === newPassword2){
      navigate('/codemeets/login');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    };
  }

  const navigate = useNavigate();

  // const ToLoginHandler = () => {
  //   navigate('/login');
  // };
  return (
    <MainStyle>
      <h1>Change Password</h1>
      <div style={{marginTop:"40px", marginBottom:"40px"}}>
        <label htmlFor="">New Password</label>
        <div>
        <input type="password" placeholder="password" onChange={NewPassword1Handler}/>
        </div>
      </div>
        <label>Check Password</label>
      <div>
        <input type="password" placeholder="password" onChange={NewPassword2Handler}/>
      </div>
      <div>
        <br />
        <button type="button" onClick={ChangeToPassword}>
          Submit
        </button>
      </div>
    </MainStyle>
  );
};
export default NewPasswordPage;

const MainStyle = styled.div`
input {
  margin: 8px;
  margin-left: 0px;
};
`;