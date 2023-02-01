import { APIroot } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import CreateTable from '../../CommonComponents/CreateTable';

const MyPageQuestionList = () => {
    const [questionRecord, setQuestionRecord] = useState([]);
    const API = useRecoilValue(APIroot);
    const navigate = useNavigate();
    
    const TableNavHandler = () => {
        navigate('/MyPageQuestionListDetail');
    }
    
    const data = React.useMemo(() => questionRecord, [questionRecord]);

    const columns = React.useMemo(
        () => [
            { Header: '번호', accessor: 'conferencePk', width: 90},
            { Header: '질문 내용', accessor: 'conferenceQuestionContents', width: 250},
            { Header: '미팅명', accessor: 'conferenceTitle', width: 180},
            { Header: '그룹명', accessor: 'groupName', width: 140},
            { Header: '질문 일자', accessor: 'conferenceQuestionDate', width: 220},
        ], []
    );

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${API}/user/my-question-record?nowPage=1&items=10`, // nowPage와 items 변수로 넣어야됨. nowpage는 사용자가 2페이지를 놓으면 바껴야댐
            headers: {
                'Content-Type': 'application/json',
                ACCESS_TOKEN: `${localStorage.getItem('ACCESS_TOKEN')}`,
            },
        })
        .then((response) => {
            console.log(response.data.question_record)
            setQuestionRecord(response.data.question_record);
        })
    }, [API]);

    return(
        <Scrollsize>
            <Styles>
                <CreateTable columns={columns} data={data} TableNavHandler={TableNavHandler} />
            </Styles>
        </Scrollsize>
    );
};

export default MyPageQuestionList;

const Styles = styled.div`
  text-align: center;
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;
const Scrollsize = styled.div`
  height: 46vh;
  overflow-y: scroll;
`;