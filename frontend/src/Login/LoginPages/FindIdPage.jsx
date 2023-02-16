import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { APIroot } from '../../Store';
import { useRecoilValue } from 'recoil';

const FindIdPage = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhoneNum, setInputPhoneNum] = useState('');
  const [AuthorizationSubmitCount, setAuthorizationSubmitCount] = useState(0);
  const [inputType, setInputType] = useState(null);
  const [inputData, setInputData] = useState('');

  const navigate = useNavigate();
  const preventPhoneNumInput = useRef();
  const preventEmailInput = useRef();
  const API = useRecoilValue(APIroot);

  const CancelHandler = () => {
    navigate('/');
  };

  const FindIdFromEmail = (event) => {
    if (inputPhoneNum != '') {
      alert('하나만 입력해주시기 바랍니다.');
      setInputEmail('');
      preventPhoneNumInput.current.value = '';
    } else {
      setInputEmail(event.target.value);
      setInputData(event.target.value);
      setInputType('email');
    }
  };
  const FindIdFromPhoneNum = (event) => {
    if (inputEmail != '') {
      alert('하나만 입력해주시기 바랍니다.');
      setInputPhoneNum('');
      preventEmailInput.current.value = '';
    } else {
      setInputPhoneNum(event.target.value);
      setInputData(event.target.value);
      setInputType('tel');
    }
  };

  const FindPasswordHandler = () => {
    if (AuthorizationSubmitCount === 1) {
      // 인증 해야만 비밀번호 찾기로 넘어가게 함.
      navigate('/findpassword');
    } else {
      alert('인증 필수입니다.');
    }
  };

  const AuthorizationFromEmail = () => {
    fetch(`${API}/user/search-id?type=email&data=${inputEmail}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.message === 'success') {
          alert('이메일 보내기 완료');
          setAuthorizationSubmitCount(AuthorizationSubmitCount + 1);
        } else {
          alert('입력된 정보와 일치하지 않습니다.');
        }
      })
      .catch((err) => console.log(err));
  };

  const AuthorizationFromPhoneNum = () => {
    fetch(`${API}/user/search-id?type=tel&data=${inputPhoneNum}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.message === 'success') {
          alert('이메일로 보내기 완료');
          setAuthorizationSubmitCount(AuthorizationSubmitCount + 1);
        } else {
          alert('입력된 정보와 일치하지 않습니다.');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Find ID</h1>
      <div>
        <label htmlFor="">E-mail</label>
        <div>
          <InputStyle
            type="text"
            placeholder="E-mail"
            onChange={FindIdFromEmail}
            ref={preventPhoneNumInput}
          />
          <button type="button" onClick={AuthorizationFromEmail}>
            Submit
          </button>
        </div>
        <br />
        <FindId>
          <Line />
          <span> or </span>
          <Line />
        </FindId>
        <br />
        <label htmlFor="">Phone Number</label>
        <div>
          <InputStyle
            type="text"
            placeholder="Phone Number"
            onChange={FindIdFromPhoneNum}
            ref={preventEmailInput}
          />
          <button type="button" onClick={AuthorizationFromPhoneNum}>
            Submit
          </button>
        </div>
        <div>
          <br />
          <br />
        </div>
        <br />
        <button type="button" onClick={FindPasswordHandler}>
          Find Password
        </button>
        <button type="button" onClick={CancelHandler}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FindIdPage;

const FindId = styled.div`
  & * {
    display: inline-block;
  }
`;

const Line = styled.hr`
  width: 10rem;
  margin: 5px;
`;

const InputStyle = styled.input`
  margin: 8px;
  margin-left: 0px;
`;
