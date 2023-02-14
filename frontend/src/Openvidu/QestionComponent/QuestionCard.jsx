import styled from "styled-components";
import {user, APIroot} from "../../Store";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useState } from "react";

import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

const QuestionCard = (props) => {
    const loginUser = useRecoilValue(user)
    const API = useRecoilValue(APIroot)


    const deleteHandler = () => {
        axios({
            method: "DELETE",
            url:`${API}/conferenceQna?conferenceQuestionPk=${props.conferenceQuestionPk}`,
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response)=> {
            console.log(response)
        })
    }

    const likeClickHandler = () => {
        axios({
            method: "PUT",
            url: `${API}/conferenceQna/like`,
            header:{
                "Content-Type": "application/json",
            },
            data:{
                conferenceQuestionPk: `${props.conferenceQuestionPk}`,
                userPk: `${loginUser.userPk}`
            }
        })
    }


  return (
    <CardStyle>
      <MainLine>
        <div style={{fontSize:"7px"}}>{props.username}</div>
        <div>{props.conferenceQuestionContents}</div>
        <LikeBox style={{ marginLeft: "1vh" }}>
          <div style={{display:"flex"}}>
            <div style={{cursor:"pointer"}} onClick={likeClickHandler}>
            {props.conferenceQuestionLiked === 1 ? <AiFillHeart size="11"/> : <AiOutlineHeart size="11"/>}
            </div>
            <div style={{ marginLeft: "1vh", fontSize:"10px" }}>
              {props.conferenceQuestionLikeCnt}
            </div>
          </div>
          {loginUser.userPk === props.userPk ? <button onClick={deleteHandler} style={{fontSize:"10px"}}>Delete</button> : null}
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
  margin-bottom:1vh;
`;

const MainLine = styled.div`
width:45vh;
  display: flex;
  flex-direction: column;
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 10px;
`;
