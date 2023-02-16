import axios from 'axios';
import { APIroot, user } from '../../../Store';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

import styled from 'styled-components';

const GroupQnAComment = ({
  groupQnaAnswerContents,
  groupQnaAnswerDate,
  groupQnaAnswerLikeCnt,
  groupQnaAnswerLiked,
  username,
  groupQnaAnswerPk,
  userPk,
  detailData, // groupQuestion 정보
  commentRe
}) => {
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);
  const [likeUnLike, setLikeUnLike] = useState(!!groupQnaAnswerLiked);
  const [commentLikeCnt, setCommentLikeCnt] = useState(groupQnaAnswerLikeCnt);
  const [modifyButton, setModifyButton] = useState(false);
  const [formContent, setFormContent] = useState(groupQnaAnswerContents);

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
      url: `${API}/answer/like`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        groupQnaAnswerPk: groupQnaAnswerPk,
        userPk: loginUser.userPk,
      }),
    })
      .then((response) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 댓글 수정
  const modifyCommentHandler = () => {
    axios({
      method: 'PUT',
      url: `${API}/answer`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        groupQnaAnswerContents: formContent,
        groupQnaAnswerPk: groupQnaAnswerPk,
        userPk: userPk,
      }),
    }).then(() => {
      modifyButtonStateHandler();
      commentRe()
    });
  };

  // 댓글 삭제
  const deleteComment = () => {
    axios({
      method: 'DELETE',
      url: `${API}/answer/${groupQnaAnswerPk}`,
    }).then((response) => {
      commentRe()
    });
  };

  return (
    <ContentStyle style={{ margin: '0px 0px 5px 0px' }}>
      <span className="commentHeight">
        <span className="userName">{username}</span>
        <div className="content">{groupQnaAnswerContents}</div>
        <span>
          <span className="date">{groupQnaAnswerDate}</span>
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
                defaultValue={groupQnaAnswerContents}
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
      </span>
    </ContentStyle>
  );
};

export default GroupQnAComment;

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
  .commentHeight {
    height: 0.1vh;
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
