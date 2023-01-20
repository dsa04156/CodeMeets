import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FindPasswordPage = () => {
  const [inputId, setInputId] = useState('');
  const [inputEmail, setInputEmail] = useState(null);
  const [inputPhoneNum, setInputPhoneNum] = useState(null);

  const FindPwFromId = (event) => {
    setInputId(event.target.value);
  };
  const FindPwFromEmail = (event) => {
    setInputEmail(event.target.value);
  };
  const FindPwFromPhoneNum = (event) => {
    setInputPhoneNum(event.target.value);
  };

  const navigate = useNavigate();

  const ToNewPasswordHandler = () => {
    console.log(inputId);
    console.log(inputEmail);
    console.log(inputPhoneNum);
    navigate('/newpassword');
  };

  return (
    <div>
      <h2>비밀번호 찾기</h2>
      <input type="text" placeholder="ID" onChange={FindPwFromId}/>
      <div>
        <br />
      </div>
      <br />
      <div>
      <input type="text" placeholder="E-mail" onChange={FindPwFromEmail}/>
      </div>
      <br />
      <FindId>
        <Line />
        <span> or </span>
        <Line />
      </FindId>
      <br />
      <input type="text" placeholder="Phone Number" onChange={FindPwFromPhoneNum}/>
      <div>
        <br />
        <button type="button" onClick={ToNewPasswordHandler}>
          다음
        </button>
      </div>
    </div>
  );
};

const FindId = styled.div`
  & * {
    display: inline-block;
  }
`;

const Line = styled.hr`
  width: 4rem;
  margin: 5px;
`;


export default FindPasswordPage;