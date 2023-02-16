import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { APIroot } from '../../Store';
import { useRecoilValue } from 'recoil';
import { useRef } from 'react';

const FindPasswordPage = () => {
  const [inputId, setInputId] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhoneNum, setInputPhoneNum] = useState('');
  const [inputType, setInputType] = useState(null);
  const [inputData, setInputData] = useState('');

  const API = useRecoilValue(APIroot);
  const preventPhoneNumInput = useRef();
  const preventEmailInput = useRef();

  const FindPwFromId = (event) => {
    setInputId(event.target.value);
  };

  const FindPwFromEmail = (event) => {
    if (inputPhoneNum !== '') {
      alert('하나만 입력해주시기 바랍니다.');
      setInputEmail('');
      preventPhoneNumInput.current.value = '';
    } else {
      setInputEmail(event.target.value);
      setInputData(event.target.value);
      setInputType('email');
    }
  };
  const FindPwFromPhoneNum = (event) => {
    if (inputEmail !== '') {
      alert('하나만 입력해주시기 바랍니다.');
      setInputPhoneNum('');
      preventEmailInput.current.value = '';
    } else {
      setInputPhoneNum(event.target.value);
      setInputData(event.target.value);
      setInputType('tel');
    }
  };

  const navigate = useNavigate();

  const CancelHandler = () => {
    navigate('/');
  };

  const ToNewPasswordHandler = () => {
    // 데이터에 저장된 유저의 정보가 확인(1)이 되면 넘어감
    axios({
      method: 'GET',
      url: `${API}/user/forgot-pw?userId=${inputId}&type=${inputType}&data=${inputData}`,
    })
      .then((response) => {
        if (
          (inputId != '' && inputEmail != null) ||
          (inputId != '' && inputPhoneNum != null)
        ) {
          if (response.data.result == '1') {
            navigate('/newpassword', { state: { findId: inputId } });
          }
        } else {
          alert('정보 입력해');
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Find Password</h1>
      <MainStyle>
        <label htmlFor="">ID</label>
        <div>
          <input type="text" placeholder="ID" onChange={FindPwFromId} />
        </div>
        <div>
          <br />
          <hr style={{ width: '218px' }} />
        </div>
        <label htmlFor="">E-mail</label>
        <div>
          <input
            type="text"
            placeholder="E-mail"
            onChange={FindPwFromEmail}
            ref={preventPhoneNumInput}
          />
        </div>
        <FindId>
          <Line />
          <span>or</span>
          <Line />
        </FindId>
        <label htmlFor="">Phone Number</label>
        <div>
          <input
            type="text"
            placeholder="Phone Number"
            onChange={FindPwFromPhoneNum}
            ref={preventEmailInput}
          />
        </div>
        <br />
        <div>
          <button type="button" onClick={ToNewPasswordHandler}>
            next
          </button>
          <button type="button" onClick={CancelHandler}>
            Cancel
          </button>
        </div>
      </MainStyle>
    </div>
  );
};

const FindId = styled.div`
  & * {
    display: inline-block;
  }
`;

const Line = styled.hr`
  width: 6rem;
  margin: 5px;
`;

const MainStyle = styled.div`
  padding-left: 5px;
  input {
    margin: 8px;
    margin-left: 0px;
  }
`;

export default FindPasswordPage;
