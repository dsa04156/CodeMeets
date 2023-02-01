import TitleStyle from "./GroupDetailPageComponent/TitleStyle"
import CommentContentStyle from "./GroupDetailPageComponent/CommentContentStyle";
import Comment from "./GroupDetailPageComponent/Comment";

import { useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { APIroot,user } from "../../Store";

import { useState, useEffect } from "react";
import axios from "axios";

const GroupQnADetail = () =>{
    const API = useRecoilValue(APIroot)
    const loginUser = useRecoilValue(user)
    const params = useParams()
    const [data, setData] = useState([])
    const [comments, setComments] = useState([])
    console.log(params)
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
        })
    },[API])


    useEffect(()=>{
        axios({
            method: "GET",
            url:`${API}/answer/list/${params.qna_pk}?userPk=${loginUser.userPk}&nowPage=1&items=10`,
            headers:{
                "Content-Type": "application/json",
            }
        }).then((response) => {
            console.log(response.data)
            setComments(response.data)
        })
    },[API])

    const commentList = comments.map((commentitem, index)=>{
        console.log(commentitem)
        return (
            <Comment 
            key = {index}
            groupQnaAnswerContents = {commentitem.groupQnaAnswerContents}
            groupQnaAnswerDate = {commentitem.groupQnaAnswerDate}
            groupQnaAnswerLikeCnt = {commentitem.groupQnaAnswerLikeCnt}
            groupQnaAnswerLike = {commentitem.groupQnaAnswerLike}
            userName = {commentitem.username}
            groupQnaAnswerPk = {commentitem.groupQnaAnswerPk}
            />
        );
    })

    return (
        <div>
            <TitleStyle TitleContent={data.groupQuestionTitle}/>
            <CommentContentStyle Content={data.groupQuestionContents} Like={data.groupQuestionLikeCnt}/>
            <div>
                {commentList}
            </div>
        </div>
    );
};

export default GroupQnADetail;