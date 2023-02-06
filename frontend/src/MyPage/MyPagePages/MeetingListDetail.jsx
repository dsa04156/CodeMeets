import TitleStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/TitleStyle";
import ContentStyle from "../../Group/GroupDetailPage/GroupDetailPageComponent/ContentStyle";
import { Fragment } from "react";
import { APIroot } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const MyPageMeetingListDetail = () => {

    const API = useRecoilValue(APIroot);
    const [data, setData] = useState({});

    const params = useParams();
    console.log('이거 params임', params)
    useEffect(() => {
        console.log('실행');
        axios({
          method: 'GET',
          url: `${API}/user/my-conference-record?nowPage=1&items=1`, // nowPage와 items 변수로 넣어야됨. nowpage는 사용자가 2페이지를 놓으면 바껴야댐
          headers: {
            'Content-Type': 'application/json',
            ACCESS_TOKEN: `${localStorage.getItem('ACCESS_TOKEN')}`,
          },
        }).then((response) => {
          console.log(response.data.conference_record[0]);
          setData(response.data.conference_record[0]);
        });
        //   .catch((err) => console.log(err));
      }, [API]);

    return(
        <>
        <TitleStyle TitleContent={data.conferenceTitle}/>
        <ContentStyle Content={data.conferenceContents}/>
        </>
    );
};

export default MyPageMeetingListDetail;