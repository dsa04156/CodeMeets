import TitleStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/TitleStyle";
import ContentStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/ContentStyle";
import { Fragment } from "react";
import { APIroot } from '../../Store';
import { user } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const MyPageQuestionListDetail = () => {

    const API = useRecoilValue(APIroot);
    const [data, setData] = useState({});
    const loginUser = useRecoilValue(user)
    //store에서 user 받아와서 url에 userPk값 useState

    const params = useParams();
    console.log('이거 질문 상세페이지 params임', params)
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${API}/qna/${params.conference_Pk}?userPk=${loginUser.userPk}`,     //conferenceQuestionPk를 받아야됨           params.conference_Pk가 스웨거에서 그룹 pk 넣는 자리인데 이 페이지에서는 conference_Pk 값이 들어가 10@ 번째로 떠서 안나오는 것??
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((response) => {
            console.log(response.data)  //이걸 지금 못받아옴. url이 아닌거 같음/
            setData(response.data);
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