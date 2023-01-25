import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FindIdPage = () => {
  const [inputEmail, setInputEmail] = useState(null);
  const [inputPhoneNum, setInputPhoneNum] = useState(null);

  const navigate = useNavigate();

  const FindIdFromEmail = (event) => {
    setInputEmail(event.target.value);
  };
  const FindIdFromPhoneNum = (event) => {
    setInputPhoneNum(event.target.value);
  };

  const FindIdHandler = () => {
    console.log(inputEmail);
    console.log(inputPhoneNum);
  }

  const FindPasswordHandler = () => {
    navigate('/codemeets/findpassword');
  };

  // 현재 데이터에 있는 이메일 : ddddd
  const AuthorizationFromEmail = () => {
    console.log(inputEmail);
    fetch(`http://aeoragy.iptime.org:18081/user/search-id?type=email&data=${inputEmail}`)
      .then((response) => response.json())
      .then(response => {
        console.log(JSON.stringify(response));
        if (response.message === "success") {
          alert('이메일 보내기 완료')
        } else {
          alert('입력된 정보와 일치하지 않습니다.')
        }
      })
      .catch((err) => console.log(err));
      // setInputEmail("")
  };

  // 현재 등록되어 있는 번호 : eeeee
  const AuthorizationFromPhoneNum = () => {
    console.log(inputPhoneNum);
    fetch(`http://aeoragy.iptime.org:18081/user/search-id?type=tel&data=${inputPhoneNum}`)
      .then((response) => response.json())
      .then(response => {
        console.log(JSON.stringify(response));
        if (response.message === "success") {
          alert('이메일로 보내기 완료')
        } else {
          alert('입력된 정보와 일치하지 않습니다.')
        }
      })
      .catch((err) => console.log(err));
      // setInputEmail("") -> useref
  };

  return (
    <div>
      <h2>아이디 찾기</h2>
      <div>
      <input type="text" placeholder="E-mail" onChange={FindIdFromEmail}/>
      <button type="button" onClick={AuthorizationFromEmail}>이메일로 인증</button>
      </div>
      <br />
      <FindId>
        <Line />
        <span> or </span>
        <Line />
      </FindId>
      <br />
      <input type="text" placeholder="Phone Number" onChange={FindIdFromPhoneNum}/>
      <button type="button" onClick={AuthorizationFromPhoneNum}>핸드폰 번호로 인증</button>
      <div>
        <br />
        <br />
      </div>
      <br />
      <button type="button" onClick={FindPasswordHandler}>
        비밀번호 찾기
      </button>
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
  width: 4rem;
  margin: 5px;
`;
