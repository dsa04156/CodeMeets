import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue} from 'recoil';
import { APIroot, user } from '../../../Store';

import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

import axios from 'axios';

const GroupMeetingListInfo = ({
  conferencePk,
  conferenceTitle,
  conferenceQuestionContents,
  conferenceQuestionDate,
  conferenceQuestionPk,
  groupPk,
  groupName,
  userPk,
  username,
  answerCnt,
  conferenceQuestionLikeCnt,
  conferenceQuestionLiked,
  conferenceQuestionUpdate,
}) => {
  const navigate = useNavigate();
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);

  const [likeUnLike, setLikeUnLike] = useState(!!conferenceQuestionLiked);
  const [questionLikeCnt, setQuestionLikeCnt] = useState(
    conferenceQuestionLikeCnt
  );

  const pageHandler = () => {
    navigate(`/my-question-record/${conferenceQuestionPk}`);
  };

  //질문 좋아요
  const likeClickHandler = () => {
    axios({
      method: 'PUT',
      url: `${API}/conferenceQna/like`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        conferenceQuestionPk: conferenceQuestionPk,
        userPk: loginUser.userPk,
      }),
    }).then((response) => {
      if (response.data === 'success') {
        setLikeUnLike((prev) => !prev);
        if (likeUnLike) {
          setQuestionLikeCnt((prev) => prev - 1);
        } else {
          setQuestionLikeCnt((prev) => prev + 1);
        }
      }
    });
  };

  return (
    <div>
      <OverStyle>
        <QuestionInfoStyle>
          <div>
            <span className="userName">{username}</span>
            <div className="content">{conferenceQuestionContents}</div>
            <span className="date">{conferenceQuestionDate}</span>
          </div>
          <span style={{display:"flex", justifyContent:'space-between'}}>
            {likeUnLike === true ? (
              <div>
                <AiFillHeart
                  style={{ margin: '0px 5px 0px 0px' }}
                  cursor="pointer"
                  onClick={likeClickHandler}
                />
                좋아요 : {questionLikeCnt}
              </div>
            ) : (
              <div>
                <AiOutlineHeart
                  style={{ margin: '0px 5px 0px 0px' }}
                  cursor="pointer"
                  onClick={likeClickHandler}
                />
                좋아요 : {questionLikeCnt}
              </div>
            )}
            <SubButtonStyle>
            <button className="custom-btn btn-8" onClick={pageHandler} style={{marginRight:"3vh"}}>Detail</button>
            </SubButtonStyle>
          </span>
        </QuestionInfoStyle>
        <HrStyle>
          <hr style={{ width: '954px' }} />
        </HrStyle>
      </OverStyle>
    </div>
  );
};

export default GroupMeetingListInfo;

const OverStyle = styled.div`
  overflow-y: auto;
`;

const HrStyle = styled.div`
  margin: 20px 0px 5px 0px;
`;

const QuestionInfoStyle = styled.div`
  /* margin: 0px 0px 20px 0px; */
  .userName {
    font-weight: bold;
    font-size: 17px;
  }
  .content {
    margin: 5px 15px 5px 15px;
  }
  .date {
    float: left;
    margin: 0px 10px 0px 0px;
  }
  .input {
    width: 925px;
    height: 3vh;
    margin: 5px 0px 5px 0px;
  }
  .button {
    margin: 5px;
    color: #8f8f8f;
    cursor: pointer;
    &:hover {
      color: #3d58f3;
    }
  }
`;

const SubButtonStyle = styled.div`
.custom-btn {
  width: 50px;
  height: 25px;
  color: #fff;
  border-radius: 5px;
  margin-left: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
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
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  transition: all 0.3s ease;
}
.btn-8:before{
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
.btn-8:hover{
  background: transparent;
  color: #4dccc6;
}
`;