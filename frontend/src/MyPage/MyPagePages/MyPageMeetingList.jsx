import { APIroot } from '../../Store';
import { useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTable from '../../CommonComponents/CreateTable';
import Pagination from '../../CommonComponents/Pagination';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { IoConstructOutline } from 'react-icons/io5';

const MyPageMeetingList = () => {
  const [meetingRecord, setMeetingRecord] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const API = useRecoilValue(APIroot);
  const navigate = useNavigate();

  const TableNavHandler = (row) => {
    console.log(row.original)
        navigate(
      `/group/${row.original.groupPk}/record/${row.original.conferencePk}`,
      {
        state: {
          title: row.original.conferenceTitle,
          content: row.original.conferenceContents,
        },
      }
    );
  };

  const data = React.useMemo(() => meetingRecord, [meetingRecord]);

  const columns = React.useMemo(
    () => [
      { Header: '번호', accessor: 'newIndex', width: 90 },
      { Header: '미팅명', accessor: 'conferenceTitle', width: 400 },
      { Header: '그룹명', accessor: 'groupName', width: 200 },
      { Header: '최근 기록', accessor: 'callStartTime', width: 200 },
    ],
    []
  );

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API}/user/my-conference-record?nowPage=${page}&items=7`,
      headers: {
        'Content-Type': 'application/json',
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    }).then((response) => {
      console.log(response.data)
      setTotalPosts(response.data.conference_record[0].total);
      response.data.conference_record.map((list, index) => {
        list.newIndex = index + (page - 1) * 7 + 1;
      });
      setMeetingRecord(response.data.conference_record);
    });
  }, [API, page]);

  return (
    <div>
      <ContentBox>
        <Styles>
          <CreateTable
            columns={columns}
            data={data}
            TableNavHandler={TableNavHandler}
          />
          <Pagination
            totalPosts={`${totalPosts}`}
            limit="7"
            page={page}
            setPage={setPage}
          ></Pagination>
        </Styles>
      </ContentBox>
    </div>
  );
};

export default MyPageMeetingList;

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
