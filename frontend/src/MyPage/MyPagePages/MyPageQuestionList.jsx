import { APIroot, pageNumber } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import CreateTable from '../../CommonComponents/CreateTable';
import Pagination from '../../CommonComponents/Pagination';

const MyPageQuestionList = () => {
  const [questionRecord, setQuestionRecord] = useState([]);
  const [page, setPage] = useRecoilState(pageNumber);
  const [totalPosts, setTotalPosts] = useState(0);
  const API = useRecoilValue(APIroot);
  const navigate = useNavigate();

  const TableNavHandler = (row) => {
    navigate(`/my-question-record/${row.original.conferenceQuestionPk}`);
  };

  const data = React.useMemo(() => questionRecord, [questionRecord]);

  const columns = React.useMemo(
    () => [
      { Header: '번호', accessor: 'newIndex', width: 90 },
      {
        Header: '질문 내용',
        accessor: 'conferenceQuestionContents',
        width: 260,
      },
      { Header: '미팅명', accessor: 'conferenceTitle', width: 190 },
      { Header: '그룹명', accessor: 'groupName', width: 180 },
      { Header: '질문 일자', accessor: 'conferenceQuestionDate', width: 200 },
    ],
    []
  );

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API}/user/my-question-record?nowPage=${page}&items=7`,
      headers: {
        'Content-Type': 'application/json',
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    }).then((response) => {
      setTotalPosts(response.data.question_record[0].total);
      response.data.question_record.map((list, index) => {
        list.newIndex = index + (page - 1) * 7 + 1;
      });
      setQuestionRecord(response.data.question_record);
    });
  }, [API, page]);

  return (
    <ContentBox>
      <Styles>
        <CreateTable
          columns={columns}
          data={data}
          TableNavHandler={TableNavHandler}
        />
        <Pagination
          totalPosts={`${totalPosts}`}
          limit="9"
          page={page}
          setPage={setPage}
        ></Pagination>
      </Styles>
    </ContentBox>
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

const ContentBox = styled.div`
  background: rgb(239, 245, 245);
  background: linear-gradient(
    149deg,
    rgba(239, 245, 245, 1) 100%,
    rgba(239, 245, 245, 0.41228991596638653) 100%
  );
`;
