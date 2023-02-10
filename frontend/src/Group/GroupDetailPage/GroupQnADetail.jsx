import TitleStyle from "./GroupDetailPageComponent/TitleStyle"
import CommentContentStyle from "./GroupDetailPageComponent/CommentContentStyle";
import LikeStyle from "./GroupDetailPageComponent/LikeStyle";
import styled from "styled-components";
import GroupQnAComment from "./GroupDetailPageComponent/GroupQnAComment";

import { useParams, useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { APIroot,user } from "../../Store";

import { useState, useEffect } from "react";
import axios from "axios";

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const GroupQnADetail = () =>{
    const API = useRecoilValue(APIroot)
    const loginUser = useRecoilValue(user)
    const params = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [comments, setComments] = useState([])
    console.log(params)
    const [likeUnLike, setLikeUnLike] = useState(false);
    const [myLikeState, setMyLikeState] = useState();
    
    const ModifyHandler = () => {
        navigate("/group/qna/modify", {state:{title: data.groupQuestionTitle, content:data.groupQuestionContents, questionPk: data.groupQuestionPk}})
    }
    
    const ToListHandler = () => {
        navigate(-1);
    }

    const deleteHandler = () => {
        axios({
            method: "DELETE",
            url: `${API}/qna/${params.qna_pk}`,
        })
        .then((response) => {
            navigate(-1);
        })
    }

    useEffect(()=>{
        axios({
            method: "GET",
            url:`${API}/qna/${params.qna_pk}?userPk=${loginUser.userPk}`,
            headers:{
                "Content-Type": "application/json",
            }
        }).then((response) => {
            console.log(response.data)
            setData(response.data)
            setMyLikeState(response.data.groupQuestionLike)
            if (response.data.groupQuestionLike) {
                setLikeUnLike(prev => !prev)
            }
        })
    },[API])

    // 댓글
    useEffect(()=>{
        axios({
            method: "GET",
            url:`${API}/answer/list/${params.qna_pk}?userPk=${loginUser.userPk}&nowPage=1&items=100`,
            headers:{
                "Content-Type": "application/json",
            }
        }).then((response) => {
            // console.log(response.data)
            setComments(response.data)
        })
    },[API, data])

    
    // 좋아요
    const likeClickHandler = () => {
        axios({
            method: "PUT",
            url: `${API}/qna/like`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                groupQuestionPk: data.groupQuestionPk,
                userPk: data.userPk,
            })
        }).then((response) => {
            console.log(response.data);
            console.log(loginUser.userPk);
            if (response.data === 'success'){
                setLikeUnLike(prev => !prev);
                if(likeUnLike) {
                    setData(prev => {
                        const cnt = (prev.groupQuestionLikeCnt-1)
                        return {...prev, "groupQuestionLikeCnt": cnt}
                    })
                } else {
                    setData(prev => {
                        const cnt = (prev.groupQuestionLikeCnt+1)
                        return {...prev, "groupQuestionLikeCnt": cnt}
                    })
                }
                // console.log("----------------------------------------------------",likeUnLike)
                // console.log("----------------------------------------------------",myLikeState)
                // setLikeUnLike(!likeUnLike)
                // setMyLikeState((myLikeState+1)%2)
                // setData([])
            }
        })
    }

    const commentList = comments.map((commentitem, index)=>{
        // console.log(commentitem)
        return (
            <GroupQnAComment
            key = {index}
            groupQnaAnswerContents = {commentitem.groupQnaAnswerContents}
            groupQnaAnswerDate = {commentitem.groupQnaAnswerDate}
            groupQnaAnswerLikeCnt = {commentitem.groupQnaAnswerLikeCnt}
            groupQnaAnswerLike = {commentitem.groupQnaAnswerLike}
            username = {commentitem.username}
            groupQnaAnswerPk = {commentitem.groupQnaAnswerPk}
            />
        );
    })

    return (
        <div>
            <TitleStyle TitleContent={data.groupQuestionTitle} />
            <LikeBox>
                <div onClick={likeClickHandler}>
                    {/* 모르겠음. 안됨. 도저히 모르겠음. */}
                    {/* {(likeUnLike === true) || (myLikeState === 1) ? <AiFillHeart style={{margin: '0px 5px 0px 0px'}}/> : <AiOutlineHeart style={{margin: '0px 5px 0px 0px'}}/>}
                    좋아요 : {data.groupQuestionLikeCnt} */}
                    {(likeUnLike === true) ? <AiFillHeart style={{margin: '0px 5px 0px 0px'}} /> : <AiOutlineHeart style={{margin: '0px 5px 0px 0px'}} onClick={likeClickHandler}/>}
                    좋아요 : {data.groupQuestionLikeCnt}
                </div>
            </LikeBox>
            {/* <LikeStyle Like={data.groupQuestionLikeCnt}  groupQuestionPk={data.groupQuestionPk} userPk={data.userPk}/> */}
            <input type="text" style={{width:'900px', height:'30px'}}/>
            <CommentContentStyle Content={commentList} />
            { (data.userPk === loginUser.userPk)? <button onClick={ModifyHandler}>Modify</button> : null } {/* 로그인 userPk와 글쓴 사람의 userPk가 같을 경우 수정 버튼 보이게 */}
            <button onClick={ToListHandler}>Cancel</button>
            { (data.userPk === loginUser.userPk)? <button onClick={deleteHandler}>Delete</button> : null }
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