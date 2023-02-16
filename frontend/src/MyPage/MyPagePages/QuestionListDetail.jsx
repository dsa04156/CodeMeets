import TitleStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/TitleStyle";
import CommentContentStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/CommentContentStyle";
import MyPageQnAComments from "../MyPageComponents/MyPageQnAComments";
import { Fragment, useRef } from "react";
import { APIroot } from "../../Store";
import { user } from "../../Store";
import { useRecoilState, useRecoilValue } from "recoil";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const MyPageQuestionListDetail = () => {
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const [likeUnLike, setLikeUnLike] = useState(false);
  const [myLikeState, setMyLikeState] = useState(false);
  const [newComment, setNewComment] = useState("");



  const params = useParams();

  const answerRef = useRef()

  const createComment = (event) => {
    setNewComment(event.target.value);
  };

  const enterClickHandler = (event) => {
    if (event.key === "Enter") {
      submitComment();
    }
  };

  //내가 한 질문 상세정보 가져오기
  useEffect(() => {
    axios({
      method: "GET",
      url: `${API}/conferenceQna/detail?conferenceQuestionPk=${params.conferenceQuestionPk}`, //conferenceQuestionPk를 받아야됨           params.conference_Pk가 스웨거에서 그룹 pk 넣는 자리인데 이 페이지에서는 conference_Pk 값이 들어가 10@ 번째로 떠서 안나오는 것??
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      console.log("--------질문 상세정보", response.data);
      setData(response.data);
      setMyLikeState(!!response.data.conferenceQuestionLiked);
      getAnswer();
      // if (response.data.conferenceQuestionLiked) {
      //   setLikeUnLike((prev) => !prev);
      // }
    });
  }, [API, likeUnLike]);

  // 답변 리스트 땡겨오기
  const getAnswer = () => {
    axios({
      method: "GET",
      url: `${API}/conferenceAnswer?conferenceQuestionPk=${params.conferenceQuestionPk}`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      setComments(response.data);
    });
  };

  // 댓글 작성
  const submitComment = () => {
    axios({
      method: "POST",
      url: `${API}/conferenceAnswer`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        conferenceAnswerContents: newComment,
        conferenceQuestionPk: params.conferenceQuestionPk,
        userPk: loginUser.userPk,
      }),
    }).then((response) => {
      answerRef.current.value=""
      setNewComment("")
      getAnswer();
    });
  };

  //질문 좋아요
  const likeClickHandler = () => {
    axios({
      method: "PUT",
      url: `${API}/conferenceQna/like`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        conferenceQuestionPk: data.conferenceQuestionPk,
        userPk: loginUser.userPk,
      }),
    }).then((response) => {
      if (response.data === 'success') {
        setLikeUnLike((prev) => !prev);
        if (likeUnLike) {
          setData((prev) => {
            const cnt = prev.conferenceQuestionLikeCnt - 1;
            return { ...prev, conferenceQuestionLikeCnt: cnt };
          });
        } else {
          setData((prev) => {
            const cnt = prev.conferenceQuestionLikeCnt + 1;
            return { ...prev, conferenceQuestionLikeCnt: cnt };
          });
        }
      }
    });
  };

  const commentList = comments.map((commentitem, index) => {
    console.log(commentitem.conferenceAnswerLiked, index)
    return (
      <MyPageQnAComments
        key={index}
        conferenceAnswerContents={commentitem.conferenceAnswerContents}
        conferenceAnswerDate={commentitem.conferenceAnswerDate}
        conferenceAnswerLikeCnt={commentitem.conferenceAnswerLikeCnt}
        conferenceAnswerLiked={commentitem.conferenceAnswerLiked}
        username={commentitem.username}
        conferenceAnswerPk={commentitem.conferenceAnswerPk}
        userPk={commentitem.userPk}
        detailData={data}
        // commentLikeUnLike={commentLikeUnLike}
        getAnswer={()=>{getAnswer()}}
      />
    );
  });

  const backHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <TitleStyle TitleContent={data.conferenceQuestionContents} />
      <LikeBox>
        <div onClick={likeClickHandler}>
          {myLikeState === true ? (
            <AiFillHeart style={{ margin: "0px 5px 0px 0px" }} />
          ) : (
            <AiOutlineHeart style={{ margin: "0px 5px 0px 0px" }} />
          )}
          좋아요 : {data.conferenceQuestionLikeCnt}
        </div>
      </LikeBox>

      <div style={{ margin: '15px 0px 15px 10px', borderTop: '1px solid' }}>
        댓글
        <input
          type="text"
          ref={answerRef}
          onKeyPress={enterClickHandler}
          onChange={createComment}
          style={{ width: "850px", height: "3vh", margin: "10px 0px 0px 5px" }}
        />
        <SubmitStyle onClick={submitComment}>Submit</SubmitStyle>
      </div>
      <div>
        {comments.length > 0 ? (
          <CommentContentStyle Content={commentList} />
        ) : (
          <div style={{ margin: "50px 50px 50px 50px" }}>댓글이 없습니다.</div>
        )}
      </div>
      <ButtonStyle>
        <button className="custom-btn btn-4" onClick={backHandler}>
          Back
        </button>
      </ButtonStyle>
    </>
  );
};

export default MyPageQuestionListDetail;

const LikeBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  font-size: 2vh;
  margin-right: 3vh;
`;

const SubmitStyle = styled.span`
  margin: 0px 0px 0px 20px;
  width: 10vh;
  height: 3.5vh;
  color: #8f8f8f;
  cursor: pointer;
  &:hover {
    color: #3d58f3;
  }
`;

const ButtonStyle = styled.div`
  .custom-btn {
    width: 100px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 20px;
    font-family: "Lato", sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    float: right;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
  }
  .btn-4 {
    background-color: #4dccc6;
    background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
    line-height: 42px;
    padding: 0;
    border: none;
  }
  .btn-4:hover {
    background-color: #89d8d3;
    background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
  }
  .btn-4 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-4:before,
  .btn-4:after {
    position: absolute;
    content: "";
    right: 0;
    top: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-4:before {
    height: 0%;
    width: 0.1px;
  }
  .btn-4:after {
    width: 0%;
    height: 0.1px;
  }
  .btn-4:hover:before {
    height: 100%;
  }
  .btn-4:hover:after {
    width: 100%;
  }
  .btn-4 span:before,
  .btn-4 span:after {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-4 span:before {
    width: 0.1px;
    height: 0%;
  }
  .btn-4 span:after {
    width: 0%;
    height: 0.1px;
  }
  .btn-4 span:hover:before {
    height: 100%;
  }
  .btn-4 span:hover:after {
    width: 100%;
  }
`;
