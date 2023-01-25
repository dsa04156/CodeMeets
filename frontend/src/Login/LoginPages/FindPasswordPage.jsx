import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FindPasswordPage = () => {
  const [inputId, setInputId] = useState("");
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
    navigate("/codemeets/newpassword");
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
          <hr style={{width:"218px"}}/>
        </div>
        <label htmlFor="">E-mail</label>
        <div>
          <input type="text" placeholder="E-mail" onChange={FindPwFromEmail} />
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
          />
        </div>
        <br />
        <div>
          <button type="button" onClick={ToNewPasswordHandler}>
            next
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
