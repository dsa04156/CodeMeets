import React, { useEffect, useState } from 'react';
import CreateTable from '../../CommonComponents/CreateTable';
import Pagination from '../../CommonComponents/Pagination';
import styled from 'styled-components';
import { useParams, useNavigate } from "react-router-dom";

import { APIroot, pageNumber } from '../../Store';
import { useRecoilValue, useRecoilState} from 'recoil';

import axios from 'axios';

// import GroupMeetingListItem from "../GroupComponents/GroupMeetingListItem";

const GroupMeetingList = () => {

    const navigate = useNavigate();
    const API = useRecoilValue(APIroot);
    const params = useParams();

    const [totalPosts, setTotalPosts] = useState(0);
    const [page, setPage] = useRecoilState(pageNumber);
    const [groupRecord, setGroupRecord] = useState([]);
    const [order, setOder] = useState()

    const TableNavHandler = (row) => {
        navigate(`/group/${params.group_pk}/record/${row.original.conferencePk}`,{
          state : {
            title: row.original.conferenceTitle,
            content: row.original.conferenceContents,
          },
        });     // conferencePk로 마이페이지 미팅리스트 상세피이지로 연결
    }

    // 회의 목록 리스트 가져오기
    useEffect(() => {
        axios({
            method: "POST",
            url: `${API}/group/conferencelist?nowPage=${page}&items=9&order=${order}&groupPk=${params.group_pk}`,
            headers: {
                AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
            }
        })
        .then((response) => {
            console.log(response.data);
            setTotalPosts(response.data[0].total);
            response.data.map((list, index) => {
              //index + (page - 1) * items + 1
              // 변수가 아닌 것들은 상수(고정값)
              list.newIndex = index + (page - 1) * 9 + 1;
            })
            setGroupRecord(response.data);
        });
    }, [API, page, order])
    console.log("-------------grouprecord",groupRecord)

    const data = React.useMemo(() => groupRecord, [groupRecord]);

    const columns = React.useMemo(
      () => [
        {
          Header: "번호",
          accessor: "newIndex", // accessor is the "key" in the data
          width: 100,
        },
        {
          Header: "미팅명",
          accessor: "conferenceTitle",
          width: 400,
        },
        {
          Header: "참여자 수",
          accessor: "joinUserCnt",
          width: 100,
        },
        {
          Header: "등록일자",
          accessor: "callStartTime",
          width: 200,
        },
      ],
      []
    );

    return (
        <div>
            <ContentBox>
            <Styles>
                <CreateTable columns={columns} data={data} TableNavHandler={TableNavHandler} isButton="0"/>
            </Styles>
            <Pagination totalPosts={`${totalPosts}`} limit="9" page={page} setPage={setPage}></Pagination>
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
