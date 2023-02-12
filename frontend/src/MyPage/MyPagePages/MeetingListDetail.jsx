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
          url: `${API}/conference/detail/${params.conference_Pk}`,
          headers: {
            'Content-Type': 'application/json',
            AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
          },
        }).then((response) => {
          console.log(response.data);
          setData(response.data);
        });
        //   .catch((err) => console.log(err));
      }, [API]);

    return(
        <>
        <TitleStyle TitleContent={data.conferenceTitle} />
        <ContentStyle Content={data.conferenceContents} />
        </>
    );
};

export default MyPageMeetingListDetail;