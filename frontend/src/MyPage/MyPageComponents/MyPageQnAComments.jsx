import axios from 'axios';
import { APIroot, user } from '../../Store';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

import styled from 'styled-components';

const MyPageQnAComments = ({
  conferenceAnswerContents,
  conferenceAnswerDate,
  conferenceAnswerLikeCnt,
  conferenceAnswerLiked,
  username,
  conferenceAnswerPk,
  userPk,
  detailData,
  commentLikeUnLike,
  getAnswer,
}) => {
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);

  const [modifyButton, setModifyButton] = useState(false);
  const [formContent, setFormContent] = useState(conferenceAnswerContents);
  const [likeUnLike, setLikeUnLike] = useState(!!conferenceAnswerLiked);

  const [commentLikeCnt, setCommentLikeCnt] = useState(conferenceAnswerLikeCnt);

  const modifyButtonStateHandler = () => {
    setModifyButton(!modifyButton);
  };

  const contentHandler = (event) => {
    const currentContent = event.target.value;
    setFormContent(currentContent);
  };

  const enterClickHandler = (event) => {
    if (event.key === 'Enter') {
      modifyCommentHandler();
    }
  };

  // 댓글 좋아요
  const likeClickHandler = () => {
    axios({
      method: 'PUT',
      url: `${API}/conferenceAnswer/Like`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        conferenceAnswerPk: conferenceAnswerPk,
        userPk: loginUser.userPk,
      }),
    }).then((response) => {
      // getAnswer()
      if (response.data === 'success') {
        setLikeUnLike((prev) => !prev);
        if (likeUnLike) {
          setCommentLikeCnt((prev) => {
            return prev - 1;
          });
        } else {
          setCommentLikeCnt((prev) => {
            return prev + 1;
          });
        }
      }
    }
    );
  };

  // 댓글 수정
  const modifyCommentHandler = () => {
    axios({
      method: 'PUT',
      url: `${API}/conferenceAnswer`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        conferenceAnswerContents: formContent,
        conferenceAnswerPk: conferenceAnswerPk,
        userPk: userPk,
      }),
    }).then(() => {
      modifyButtonStateHandler();
      getAnswer()
    });
  };

  // 댓글 삭제
  const deleteComment = () => {
    axios({
      method: 'DELETE',
      url: `${API}/conferenceAnswer?conferenceAnswerPk=${conferenceAnswerPk}`,
    }).then((response) => {
      getAnswer()
    });
  };

  return (
    <ContentStyle style={{ margin: '0px 0px 5px 0px' }}>
      <span className="userName">{username}</span>
      <div className="content">{conferenceAnswerContents}</div>
      <span>
        <span className="date">{conferenceAnswerDate}</span>
        {likeUnLike === true ? (
          <div>
            <AiFillHeart
              style={{ margin: '0px 5px 0px 0px' }}
              onClick={likeClickHandler}
              cursor="pointer"
            />
            좋아요 : {commentLikeCnt}
          </div>
        ) : (
          <div>
            <AiOutlineHeart
              style={{ margin: '0px 5px 0px 0px' }}
              onClick={likeClickHandler}
              cursor="pointer"
            />
            좋아요 : {commentLikeCnt}
          </div>
        )}
      </span>
      <ContentStyle>
        {userPk === loginUser.userPk ? (
          <span className="button" onClick={modifyButtonStateHandler}>
            Modify
          </span>
        ) : null}
        {userPk === loginUser.userPk ? (
          <span className="button" onClick={deleteComment}>
            Delete
          </span>
        ) : null}
        {modifyButton ? (
          <div>
            <input
              className="input"
              type="text"
              defaultValue={conferenceAnswerContents}
              onKeyPress={enterClickHandler}
              onChange={contentHandler}
            />
          </div>
        ) : null}
        {modifyButton ? (
          <span className="button" onClick={modifyCommentHandler}>
            수정완료
          </span>
        ) : null}
        {modifyButton ? (
          <span className="button" onClick={modifyButtonStateHandler}>
            수정취소
          </span>
        ) : null}
      </ContentStyle>
      <hr />
    </ContentStyle>
  );
};

export default MyPageQnAComments;

const ContentStyle = styled.div`
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
