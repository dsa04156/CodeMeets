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
import { useRef } from 'react';

const GroupQnADetail = () => {
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);
  const params = useParams();
  const navigate = useNavigate();
  const commentRef = useRef()

  const [data, setData] = useState([]);    // 그룹 게시글 디테일 정보 저장
  const [comments, setComments] = useState([]);
  console.log(params);
  const [likeUnLike, setLikeUnLike] = useState(false);
  const [myLikeState, setMyLikeState] = useState(false);


  const [newComment, setNewComment] = useState('');
  const [commentLikeState, setCommentLikeState] = useState(false);  // 각 댓글에 본인이 좋아요 했는지 여부
  const [commnetLikeUnLike, setCommnetLikeUnLike] = useState(false);

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

  const enterClickHandler = (event) => {
    if (event.key === 'Enter') {
      submitComment();
    }
  };

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
      getCommentList()
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
  const getCommentList = () => {
    axios({
      method: 'GET',
      url: `${API}/answer/list/${params.qna_pk}?userPk=${loginUser.userPk}&nowPage=1&items=100`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log("그룹의 댓귿 데이터--------------",response.data);
      setComments(response.data);
      // setCommentLikeState(!!response.data.groupQnaAnswerLiked);
      console.log(commnetLikeUnLike)
      // if (response.data.groupQnaAnswerLiked) {
      //   setCommnetLikeUnLike((prev) => !prev);
      //   console.log(commnetLikeUnLike)
      // }
    });
  }; //data 지우고 commnetLikeUnLike 넣음

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
      commentRef.current.value=""
      setNewComment("")
      getCommentList()
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
        commentRe = {()=>{getCommentList()}}
        // commnetLikeUnLike = {commnetLikeUnLike}
      />
    );
  });

  return (
    <div>
      <OverStyle>
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
      <HrStyle><hr style={{ width: '954px' }}/></HrStyle>
      <ContentBox>{data.groupQuestionContents}</ContentBox>
      </OverStyle>
      <div style={{ margin: '15px 0px 15px 10px', borderTop: '1px solid' }}>
        댓글
      <input
        type="text"
        ref={commentRef}
        onKeyPress={enterClickHandler}
        onChange={createComment}
        style={{ width: '850px', height: '3vh', margin: '10px 0px 0px 5px' }}
      />
      <SubmitStyle onClick={submitComment}>Submit</SubmitStyle>
      </div>
      <div>
      {comments.length > 0 ? (
        <CommentContentStyle Content={commentList}/>
        ) : (
          <div style={{ margin: '50px 50px 50px 50px' }}>댓글이 없습니다.</div>
        )}
      </div>
      
      
      
      {/* 게시글의 수정 뒤로 삭제 기능*/}
      <ButtonStyle><button className='custom-btn btn-4' onClick={ToListHandler}>Cancel</button></ButtonStyle>
      {data.userPk === loginUser.userPk ? ( <ButtonStyle><button className='custom-btn btn-4' onClick={ModifyHandler}>Modify</button></ButtonStyle> ) : null}
      {/* 로그인 userPk와 글쓴 사람의 userPk가 같을 경우 수정 버튼 보이게 */}
      {data.userPk === loginUser.userPk ? ( <ButtonStyle><button className='custom-btn btn-4' style={{float: 'left'}} onClick={deleteHandler}>Delete</button></ButtonStyle> ) : null}
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
  height: 0.1vh;
`;

const ContentBox = styled.div`
border: 1px;
display: flex;
flex-direction: column;
font-size: 2.5vh;
margin: 2vh;
height: 5vh;
.LikeBox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* margin-left: 80vh; */
  font-size: 2vh;
}
`;
const HrStyle = styled.div`
  margin: 20px 0px 5px 0px;
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
const OverStyle = styled.div`
  overflow-y: auto;
`;

const ButtonStyle = styled.div`
  .custom-btn {
    width: 100px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 20px;
    font-family: 'Lato', sans-serif;
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
    content: '';
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
    content: '';
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