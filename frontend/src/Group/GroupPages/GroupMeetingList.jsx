import React, { useEffect, useState } from 'react';
import CreateTable from '../../CommonComponents/CreateTable';
import Pagination from '../../CommonComponents/Pagination';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

import { APIroot, pageNumber } from '../../Store';
import { useRecoilValue, useRecoilState } from 'recoil';

import axios from 'axios';

const GroupMeetingList = () => {
  const navigate = useNavigate();
  const API = useRecoilValue(APIroot);
  const params = useParams();

  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useRecoilState(pageNumber);
  const [groupRecord, setGroupRecord] = useState([]);
  const [order, setOder] = useState();

  const TableNavHandler = (row) => {
    navigate(`/group/${params.group_pk}/record/${row.original.conferencePk}`, {
      state: {
        title: row.original.conferenceTitle,
        content: row.original.conferenceContents,
      },
    });
  };

  useEffect(() => {
    axios({
      method: 'POST',
      url: `${API}/group/conferencelist?nowPage=${page}&items=9&order=${order}&groupPk=${params.group_pk}`,
      headers: {
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    }).then((response) => {
      setTotalPosts(response.data[0].total);
      response.data.map((list, index) => {
        list.newIndex = index + (page - 1) * 9 + 1;
      });
      setGroupRecord(response.data);
    });
  }, [API, page, order]);

  const data = React.useMemo(() => groupRecord, [groupRecord]);

  const columns = React.useMemo(
    () => [
      {
        Header: '번호',
        accessor: 'newIndex',
        width: 100,
      },
      {
        Header: '미팅명',
        accessor: 'conferenceTitle',
        width: 490,
      },
      {
        Header: '생성 일자',
        accessor: 'callStartTime',
        width: 330,
      },
    ],
    []
  );

  return (
    <div>
      <ContentBox>
        <Styles>
          <CreateTable
            columns={columns}
            data={data}
            TableNavHandler={TableNavHandler}
            isButton="0"
          />
        </Styles>
        <Pagination
          totalPosts={`${totalPosts}`}
          limit="9"
          page={page}
          setPage={setPage}
        ></Pagination>
      </ContentBox>
    </div>
  );
};

export default GroupMeetingList;

const Styles = styled.div`
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
