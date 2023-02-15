import axios from "axios";
import { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { conference, user, APIroot } from "../../Store";
import styled from "styled-components";

const QuestionInput = () => {
  const [questionInput, setQuestionInput] = useState("");
  const inputTag = useRef(null);

  const loginUser = useRecoilValue(user);
  const conferenceData = useRecoilValue(conference);
  const API = useRecoilValue(APIroot);
  console.log("conferenceData:", conferenceData, "loginUser:", loginUser);

  const questionHandler = (e) => {
    const newInput = e.target.value;
    setQuestionInput(newInput);
  };

  const enterClickHandler = (event) => {
    if (event.key === 'Enter') {
      inputHandler();
    }
  };


  const inputHandler = (e) => {
    axios({
      method: "POST",
      url: `${API}/conferenceQna`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        conferencePk: `${conferenceData.conferencePk}`,
        groupPk: `${conferenceData.groupPk}`,
        conferenceQuestionContents: `${questionInput}`,
        userPk: loginUser.userPk,
      },
    })
      .then((response) => {
        console.log(response.data);
        inputTag.current.value = "";
        setQuestionInput("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <input
        type="text"
        onKeyPress={enterClickHandler}

        onChange={questionHandler}
        ref={inputTag}
        style={{
          marginTop: "1vh",
          width: "46vh",
          height: "4vh",
          borderRadius: "5px",
          border: "2px solid grey",
        }}
      />
      <SubButtonStyle>
      <button className="custom-btn btn-8" onClick={inputHandler} style={{ marginLeft: "41.4vh" }}>
        입력
      </button>
      </SubButtonStyle>
    </div>
  );
};
export default QuestionInput;

const SubButtonStyle = styled.div`
  .custom-btn {
    width: 50px;
    height: 25px;
    color: #fff;
    border-radius: 5px;
    margin-left: 50px;
    padding: 10px 25px;
    font-family: "Lato", sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
    align-items: center;
    justify-content: center;
  }
  .btn-8 {
    background-color: #4dccc6;
    background-image: linear-gradient(315deg, #f0ecfc 0%, #4dccc6 74%);
    line-height: 42px;
    padding: 0;
    border: none;
  }
  .btn-8:before,
  .btn-8:after {
    position: absolute;
    content: "";
    right: 0;
    bottom: 0;
    background: #4dccc6;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-8:before {
    height: 0%;
    width: 2px;
  }
  .btn-8:after {
    width: 0%;
    height: 2px;
  }
  .btn-8:hover:before {
    height: 100%;
  }
  .btn-8:hover:after {
    width: 100%;
  }
  .btn-8:hover {
    background: transparent;
    color: #4dccc6;
  }
`;
