import { APIroot } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTable from '../../CommonComponents/CreateTable';
import Pagination from '../../CommonComponents/Pagination';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const MyPageMeetingList = () => {
  const [meetingRecord, setMeetingRecord] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const API = useRecoilValue(APIroot);
  const navigate = useNavigate();

  const TableNavHandler = (row) => {
    navigate(`/my-meeting-record/${row.original.conferencePk}/detail`);
  };

  const data = React.useMemo(() => meetingRecord, [meetingRecord]);

  const columns = React.useMemo(
    () => [
      { Header: '번호', accessor: 'conferencePk', width: 90 },
      { Header: '미팅명', accessor: 'conferenceTitle', width: 400 },
      { Header: '그룹명', accessor: 'groupName', width: 200 },
      { Header: '최근 활동', accessor: 'callStartTime', width: 200 },
    ],
    []
  );

  useEffect(() => {
    console.log('실행');
    axios({
      method: 'GET',
      url: `${API}/user/my-conference-record?nowPage=${page}&items=6`, // nowPage와 items 변수로 넣어야됨. nowpage는 사용자가 2페이지를 놓으면 바껴야댐
      headers: {
        'Content-Type': 'application/json',
        ACCESS_TOKEN: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    }).then((response) => {
      console.log(response.data);
      setTotalPosts(response.data.conference_record[0].total);
      setMeetingRecord(response.data.conference_record);
    });
    //   .catch((err) => console.log(err));
  }, [API, page]);

  return (
    <div>
      <Scrollsize>
        <Styles>
          <CreateTable
            columns={columns}
            data={data}
            TableNavHandler={TableNavHandler}
          />
          <Pagination totalPosts={`${totalPosts}`} limit="9" page={page} setPage={setPage}></Pagination>
        </Styles>
      </Scrollsize>
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
const Scrollsize = styled.div`
  height: 46vh;
  overflow-y: scroll;
`;
const NavBarStyle = styled(NavLink)`
  color: black;
  font-size: 20px;
  outline: invert;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: #10f14c;
  }
  &.active {
    color: #29a846;
  }
`;