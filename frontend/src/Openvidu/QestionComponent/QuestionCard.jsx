import styled from "styled-components";
import { user, APIroot } from "../../Store";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useState } from "react";

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const QuestionCard = (props) => {
  const loginUser = useRecoilValue(user);
  const API = useRecoilValue(APIroot);

  const deleteHandler = () => {
    axios({
      method: "DELETE",
      url: `${API}/conferenceQna?conferenceQuestionPk=${props.conferenceQuestionPk}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const likeClickHandler = () => {
    axios({
      method: "PUT",
      url: `${API}/conferenceQna/like`,
      header: {
        "Content-Type": "application/json",
      },
      data: {
        conferenceQuestionPk: `${props.conferenceQuestionPk}`,
        userPk: `${loginUser.userPk}`,
      },
    });
  };

  return (
    <CardStyle>
      <MainLine>
        <div style={{ fontSize: "7px" }}>{props.username}</div>
        <div>{props.conferenceQuestionContents}</div>
        <LikeBox style={{ marginLeft: "1vh" }}>
          <div style={{ display: "flex" }}>
            <div style={{ cursor: "pointer" }} onClick={likeClickHandler}>
              {props.conferenceQuestionLiked === 1 ? (
                <AiFillHeart size="11" />
              ) : (
                <AiOutlineHeart size="11" />
              )}
            </div>
            <div style={{ marginLeft: "1vh", fontSize: "10px" }}>
              {props.conferenceQuestionLikeCnt}
            </div>
          </div>
          {loginUser.userPk === props.userPk ? (
            <SubButtonStyle>
              <button className="custom-btn btn-8" onClick={deleteHandler} style={{ fontSize: "10px" }}>
                Delete
              </button>
            </SubButtonStyle>
          ) : null}
        </LikeBox>
      </MainLine>
    </CardStyle>
  );
};

export default QuestionCard;

const CardStyle = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #e5e1d7;
  margin-bottom: 1vh;
`;

const MainLine = styled.div`
  width: 45vh;
  display: flex;
  flex-direction: column;
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 10px;
`;

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
