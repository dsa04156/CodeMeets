import TitleStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/TitleStyle";
import CommentContentStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/CommentContentStyle";
import Comment from "../../Group/GroupDetailPage/GroupDetailPageComponent/Comment";
import LikeStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/LikeStyle";
import { Fragment } from "react";
import { APIroot } from '../../Store';
import { user } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const MyPageQuestionListDetail = () => {

    const API = useRecoilValue(APIroot);
    const loginUser = useRecoilValue(user)
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    //store에서 user 받아와서 url에 userPk값 useState

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
            console.log(response.data)
            setData(response.data);
        })
    }, [API]);

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
            console.log(response.data);
            setComments(response.data);
        })
    }, [API])

    // 1159 ~ 답변 하나씩 달려있음
    const commentList = comments.map((commentitem, index) => {
        console.log(commentitem)
        return (
            <Comment
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

    return(
        <>

            <TitleStyle TitleContent={data.conferenceQuestionContents} />
            <LikeStyle Like={data.conferenceQuestionLikeCnt} />
            <CommentContentStyle Content={commentList} />
        </>
    );
};

export default MyPageQuestionListDetail;

