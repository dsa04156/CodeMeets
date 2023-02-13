import TitleStyle from './GroupDetailPageComponent/TitleStyle';
import CommentContentStyle from './GroupDetailPageComponent/CommentContentStyle';
import LikeStyle from './GroupDetailPageComponent/LikeStyle';
import styled from 'styled-components';
import GroupQnAComment from './GroupDetailPageComponent/GroupQnAComment';

import { useParams, useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { APIroot, user } from '../../Store';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

const GroupQnADetail = () => {
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);    // 그룹 게시글 디테일 정보 저장
  const [comments, setComments] = useState([]);
  console.log(params);
  const [likeUnLike, setLikeUnLike] = useState(false);
  const [myLikeState, setMyLikeState] = useState(false);


  const [newComment, setNewComment] = useState('');
  const [commentLikeState, setCommentLikeState] = useState(false);  // 각 댓글에 본인이 좋아요 했는지 여부
  const [commnetLikeUnLike, setCommnetLikeUnLike] = useState(false);
  const [modifyButton, setModifyButton] = useState(false);
  const [formContent, setFormContent] = useState(comments.groupQnaAnswerContents)

  const ModifyHandler = () => {
    navigate('/group/qna/modify', {
      state: {
        title: data.groupQuestionTitle,
        content: data.groupQuestionContents,
        questionPk: data.groupQuestionPk,
      },
    });
  };

  const ToListHandler = () => {
    navigate(-1);
  };

  // 게시글 삭제
  const deleteHandler = () => {
    axios({
      method: 'DELETE',
      url: `${API}/qna/${params.qna_pk}`,
    }).then((response) => {
      navigate(-1);
    });
  };

  const createComment = (event) => {
    setNewComment(event.target.value);
  };

  //댓글 수정 버튼 핸들러
  const modifyButtonStateHandler = () => {
    setModifyButton(!modifyButton)
  }

  // 댓글 수정 입력 핸들러
  const contentHandler = (event) => {
    const currentContent = event.target.value;
    setFormContent(currentContent)
  }

  // 게시글 디테일 정보 가져오기
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API}/qna/${params.qna_pk}?userPk=${loginUser.userPk}`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response.data);
      setData(response.data);
      setMyLikeState(!!response.data.groupQuestionLiked);
      // if (response.data.groupQuestionLiked) {
      //   setLikeUnLike((prev) => !prev);
      // }
    });
  }, [API, likeUnLike]);
// 받아오는 정보
//   groupPk: 118
// groupQuestionAnswerCnt: 0
// groupQuestionContents: "dddd"
// groupQuestionDate: "2023-02-12"
// groupQuestionLikeCnt: 0
// groupQuestionLiked: 0
// groupQuestionPk: 2011
// groupQuestionTitle: "ddd"
// groupQuestionUpdate: 0
// total: 0
// userPk: 1
// username: "어드민01"

  // console.log(myLikeState)

  // 게시글 좋아요
  const likeClickHandler = () => {
    axios({
      method: 'PUT',
      url: `${API}/qna/like`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        groupQuestionPk: data.groupQuestionPk,
        userPk: loginUser.userPk,
      }),
    }).then((response) => {
      console.log(response.data);
      // console.log(loginUser.userPk);
      if (response.data === 'success') {
        setLikeUnLike((prev) => !prev);
        if (likeUnLike) {
          setData((prev) => {
            const cnt = prev.groupQuestionLikeCnt - 1;
            return { ...prev, groupQuestionLikeCnt: cnt };
          });
        } else {
          setData((prev) => {
            const cnt = prev.groupQuestionLikeCnt + 1;
            return { ...prev, groupQuestionLikeCnt: cnt };
          });
        }
        // console.log("----------------------------------------------------",likeUnLike)
        // console.log("----------------------------------------------------",myLikeState)
        // setLikeUnLike(!likeUnLike)
        // setMyLikeState((myLikeState+1)%2)
        // setData([])
      }
    });
  };
  

  // 상세 페이지에서 댓글리스트 뽑아오기
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API}/answer/list/${params.qna_pk}?userPk=${loginUser.userPk}&nowPage=1&items=100`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response.data);
      setComments(response.data);
      setCommentLikeState(!!response.data.groupQnaAnswerLiked);
      console.log(commnetLikeUnLike)
      // if (response.data.groupQnaAnswerLiked) {
      //   setCommnetLikeUnLike((prev) => !prev);
      //   console.log(commnetLikeUnLike)
      // }
    });
  }, [API, commnetLikeUnLike]); //data 지우고 commnetLikeUnLike 넣음

  // 댓글 작성
  const submitComment = () => {
    axios({
      method: 'POST',
      url: `${API}/answer`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        groupQnaAnswerContents: newComment,
        groupQuestionPk: params.qna_pk,
        userPk: loginUser.userPk,
      }),
    }).then((response) => {
      console.log(response.data);
      window.location.reload();
    });
  };

  // 댓글 좋아요
  const commentlikeClickHandler = () => {
    axios({
      method: 'PUT',
      url: `${API}/answer/like`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        groupQnaAnswerPk: comments.groupQnaAnswerPk,
        userPk: loginUser.userPk,
      }),
    })
      .then((response) => {
        console.log(response.data)
        if (response.data === 'success') {
          // console.log(likeUnLike)
          setCommnetLikeUnLike((prev) => !prev);
          // console.log(likeUnLike)
          if (commnetLikeUnLike){
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
          groupQnaAnswerPk: comments.groupQnaAnswerPk,
          userPk: loginUser.userPk,
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
      url: `${API}/answer/${comments.groupQnaAnswerPk}`,
    }).then((response) => {
      // console.log(response.data);
      window.location.reload();
    });
  };

  const commentList = comments.map((commentitem, index) => {
    // console.log(commentitem)
    return (
      <GroupQnAComment
        key={index}
        groupQnaAnswerContents={commentitem.groupQnaAnswerContents}
        groupQnaAnswerDate={commentitem.groupQnaAnswerDate}
        groupQnaAnswerLikeCnt={commentitem.groupQnaAnswerLikeCnt}
        groupQnaAnswerLiked={commentitem.groupQnaAnswerLiked}
        username={commentitem.username}
        groupQnaAnswerPk={commentitem.groupQnaAnswerPk}
        userPk = {commentitem.userPk}
        detailData = {data}
        commnetLikeUnLike = {commnetLikeUnLike}
      />
    );
  });

  return (
    <div>
      <TitleStyle TitleContent={data.groupQuestionTitle} />
      <LikeBox>
        <div onClick={likeClickHandler}>
          {/* 모르겠음. 안됨. 도저히 모르겠음. */}
          {/* {(likeUnLike === true) || (myLikeState === 1) ? <AiFillHeart style={{margin: '0px 5px 0px 0px'}}/> : <AiOutlineHeart style={{margin: '0px 5px 0px 0px'}}/>}
                    좋아요 : {data.groupQuestionLikeCnt} */}
          {myLikeState === true ? (
            <AiFillHeart style={{ margin: '0px 5px 0px 0px' }} />
          ) : (
            <AiOutlineHeart
              style={{ margin: '0px 5px 0px 0px' }}
            //   onClick={likeClickHandler}
            />
          )}
          좋아요 : {data.groupQuestionLikeCnt}    {/* 게시글 좋아요 */}
        </div>
      </LikeBox>
      {/* <LikeStyle Like={data.groupQuestionLikeCnt}  groupQuestionPk={data.groupQuestionPk} userPk={data.userPk}/> */}
      <div>{data.groupQuestionContents}</div>
      <input
        type="text"
        onChange={createComment}
        style={{ width: '900px', height: '30px' }}
      />
      <button onClick={submitComment}>Submit</button>
      {/* <CommentContentStyle Content={commentList}/> */}
      {/* <button onClick={deleteComment}>Delete</button> */}
      
      
      {/* 댓글 관련 띄우기 */}
      <div>
      {comments.username}
      {comments.groupQnaAnswerContents}
      <div onClick={commentlikeClickHandler}>
        {commentLikeState === true? (<AiFillHeart style={{ margin: '0px 5px 0px 0px' }}/>) : (<AiOutlineHeart style={{ margin: '0px 5px 0px 0px' }}/>)}
        좋아요 : {comments.groupQnaAnswerLikeCnt}
      </div>
      <div>
        {/* onclick 시 input 창 띄우고 수정 확인 onClick 시 input 창 hidden 그리고 저장된 값 저장 */}
      {comments.userPk === loginUser.userPk ? (
        <button onClick={modifyButtonStateHandler}>Modify</button>
        ) : null}
        {modifyButton ? <input type="text" defaultValue={comments.groupQnaAnswerContents} onChange={contentHandler}/> : null }
        {modifyButton ? <button onClick={modifyCommentHandler}>수정완료</button> : null}
        {modifyButton ? <button onClick={modifyButtonStateHandler}>수정취소</button> : null}
      </div>
      {comments.userPk === loginUser.userPk ? (
        <button onClick={deleteComment}>Delete</button>
      ) : null}
      
      
      {/* 게시글의 수정 뒤로 삭제 기능*/}
      {data.userPk === loginUser.userPk ? (
        <button onClick={ModifyHandler}>Modify</button>
      ) : null}
      {/* 로그인 userPk와 글쓴 사람의 userPk가 같을 경우 수정 버튼 보이게 */}
      <button onClick={ToListHandler}>Cancel</button>
      {data.userPk === loginUser.userPk ? (
        <button onClick={deleteHandler}>Delete</button>
      ) : null}
      {comments.groupQnaAnswerDate}
      </div>
    </div>
  );
};

export default GroupQnADetail;

const LikeBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  font-size: 2vh;
  margin-right: 3vh;
`;
