import TitleStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/TitleStyle";
import CommentContentStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/CommentContentStyle";
import ConferenceComment from "../../Group/GroupDetailPage/GroupDetailPageComponent/ConferenceComment";
import LikeStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/LikeStyle";
import { Fragment } from "react";
import { APIroot } from '../../Store';
import { user } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const MyPageQuestionListDetail = () => {

    const API = useRecoilValue(APIroot);
    const loginUser = useRecoilValue(user)
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [likeUnLike, setLikeUnLike] = useState(false);
    const [myLikeState, setMyLikeState] = useState();

    const params = useParams();
    console.log('이거 질문 상세페이지 params임', params)
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${API}/conferenceQna/{conferencePk}?conferencePk=${params.conference_Pk}&userPk=${loginUser.userPk}`,     //conferenceQuestionPk를 받아야됨           params.conference_Pk가 스웨거에서 그룹 pk 넣는 자리인데 이 페이지에서는 conference_Pk 값이 들어가 10@ 번째로 떠서 안나오는 것??
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((response) => {
            // console.log(response.data)
            setData(response.data);
            setMyLikeState(response.data.conferenceQuestionLike)
            if (response.data.conferenceQuestionLike){
                setLikeUnLike(prev => !prev)
            }
        })
    }, [API]);
    console.log(data.conferenceQuestionPk)

    // 댓글
    useEffect(() => {
        axios({
            method: "GET",
            url: `${API}/conferenceAnswer?conferenceQuestionPk=${data.conferenceQuestionPk}`,
            headers: {
                "Content-Type": "application/json",
                AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
            },
        })
        .then((response) => {
            // console.log(response.data);
            setComments(response.data);
        })
    }, [API, data])
    

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
                userPk: data.userPk,
            })
        }).then((response) => {
            console.log(response.data);
            if (response.data === 'success'){
                console.log(data)
                setLikeUnLike(prev => !prev);
                if (likeUnLike) {
                    setData(prev => {
                        const cnt = (prev.conferenceQuestionLikeCnt-1)
                        return {...prev, "conferenceQuestionLikeCnt": cnt}})

                } else {
                    setData(prev => {
                        const cnt = (prev.conferenceQuestionLikeCnt+1)
                        return {...prev, "conferenceQuestionLikeCnt": cnt}
                    })
                }
            }
        })
    }

    // 1159 ~ 답변 하나씩 달려있음
    const commentList = comments.map((commentitem, index) => {
        // console.log(commentitem)
        return (
            <ConferenceComment
            key={index}
            conferenceAnswerContents = {commentitem.conferenceAnswerContents}
            conferenceAnswerDate = {commentitem.conferenceAnswerDate}
            conferenceAnswerLikeCnt = {commentitem.conferenceAnswerLikeCnt}
            conferenceAnswerLike = {commentitem.conferenceAnswerLike}
            username = {commentitem.username}
            conferenceAnswerPk = {commentitem.conferenceAnswerPk}
            />
        );
    })

    const backHandler = () => {
        navigate(-1)
      }

    return(
        <>
            <TitleStyle TitleContent={data.conferenceQuestionContents} />
            <LikeBox>
                {/* 모르겠음. 안됨. 도저히 모르겠음. */}
                <div onClick={likeClickHandler}>
                    {(likeUnLike === true) ? <AiFillHeart style={{margin: '0px 5px 0px 0px'}} /> : <AiOutlineHeart style={{margin: '0px 5px 0px 0px'}} />}
                    좋아요 : {data.conferenceQuestionLikeCnt}
                </div>
            </LikeBox>
            {/* <LikeStyle Like={data.conferenceQuestionLikeCnt} /> */}
            <CommentContentStyle Content={commentList} />
            <button onClick={backHandler}>Back</button>
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

