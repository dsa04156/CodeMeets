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
  detailData,    // groupQuestion 정보
  commnetLikeUnLike
}) => {
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);
  const [likeUnLike, setLikeUnLike] = useState(commnetLikeUnLike);  //groupQnaAnswerLiked 
  const [data, setData] = useState(detailData)
  const [modifyButton, setModifyButton] = useState(false);
  const [formContent, setFormContent] = useState(groupQnaAnswerContents)

  // console.log(userPk)
  console.log(detailData)
  // console.log(data)
  // console.log(commnetLikeUnLike)

  const modifyButtonStateHandler = () => {
    setModifyButton(!modifyButton)
  }

  const contentHandler = (event) => {
    const currentContent = event.target.value;
    setFormContent(currentContent)
  }

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
        console.log(response.data)
        if (response.data === 'success') {
          // console.log(likeUnLike)
          setLikeUnLike((prev) => !prev);
          // console.log(likeUnLike)
          if (likeUnLike){
            setData((prev) => {
              const cnt = prev.groupQnaAnswerLikeCnt - 1;
              // console.log(cnt)
              return {...prev, groupQnaAnswerLikeCnt:cnt};
              // console.log(cnt)
            });
          } else {
            setData((prev) => {
              const cnt = prev.groupQnaAnswerLikeCnt + 1;
              return {...prev, groupQnaAnswerLikeCnt:cnt};
            });
          }
        }
      });
  };

  // 댓글 수정
  const modifyCommentHandler = () => {
    axios({
        method: "PUT",
        url: `${API}/answer`,
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
          groupQnaAnswerContents: formContent,
          groupQnaAnswerPk: groupQnaAnswerPk,
          userPk: userPk,
        })
    })
    .then((response) => {
      console.log(response.data)
      modifyButtonStateHandler()
      window.location.reload()
    })
}

  // 댓글 삭제
  const deleteComment = () => {
    axios({
      method: 'DELETE',
      url: `${API}/answer/${groupQnaAnswerPk}`,
    }).then((response) => {
      // console.log(response.data);
      window.location.reload();
    });
  };
  // console.log(username);
  // console.log(groupQnaAnswerContents);
  // console.log(groupQnaAnswerDate);
  // console.log(groupQnaAnswerLikeCnt);
  // console.log(groupQnaAnswerLike);
  // console.log(groupQnaAnswerPk);
  return (
    <ContentStyle style={{ margin: '0px 0px 5px 0px' }}>
      <span className='commentHeight'>
      <span className='userName'>{username}</span>
      <div className='content'>{groupQnaAnswerContents}</div>
      <span onClick={likeClickHandler}>
      <span className='date'>{groupQnaAnswerDate}</span>
        {likeUnLike === true? (<AiFillHeart style={{ margin: '0px 5px 0px 0px' }}/>) : (<AiOutlineHeart style={{ margin: '0px 5px 0px 0px' }}/>)}
        <span>좋아요 : {groupQnaAnswerLikeCnt}</span>
      </span>
      <ContentStyle>
        {/* onclick 시 input 창 띄우고 수정 확인 onClick 시 input 창 hidden 그리고 저장된 값 저장 */}
      {userPk === loginUser.userPk ? ( <span className='button' onClick={modifyButtonStateHandler}>Modify</span> ) : null}
      {userPk === loginUser.userPk ? ( <span className='button' onClick={deleteComment}>Delete</span> ) : null}
        {modifyButton ? 
        <div><input className='input' type="text" defaultValue={groupQnaAnswerContents} onKeyPress={enterClickHandler} onChange={contentHandler}/></div> : null }
        {modifyButton ? <span className='button' onClick={modifyCommentHandler}>수정완료</span> : null}
        {modifyButton ? <span className='button' onClick={modifyButtonStateHandler}>수정취소</span> : null}
      </ContentStyle>
      <hr />
        </span>
    </ContentStyle>
  );
};

export default GroupQnAComment;

const ContentStyle = styled.div`
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
