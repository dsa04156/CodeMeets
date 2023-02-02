import TitleStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/TitleStyle";
import ContentStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/ContentStyle";
import { Fragment } from "react";
import { APIroot } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const MyPageQuestionListDetail = () => {

    const API = useRecoilValue(APIroot);
    const [data, setData] = useState({});

    const params = useParams();
    console.log('이거 질문 상세페이지 params임', params)
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${API}/user/my-question-record?nowPage=1&items=10`,
            headers: {
                'Content-Type' : 'application/json',
                ACCESS_TOKEN: `${localStorage.getItem('ACCESS_TOKEN')}`,
            },
        })
        .then((response) => {
            console.log(response.data.question_record[0])
            setData(response.data.question_record[0]);
        })
    }, [API]);

    return(
        <>
            <TitleStyle TitleContent={data.conferenceQuestionContents}/>
            <ContentStyle Content={data.conferenceQuestionContents}/>
        </>
    );
};

export default MyPageQuestionListDetail;