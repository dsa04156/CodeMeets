import { APIroot } from "../../Store";
import { useRecoilValue } from "recoil";

import styled from "styled-components";
import React, { useEffect, useState } from "react";

import CreateTable from "../../CommonComponents/CreateTable";
import axios from "axios";

const MyPageMeetingList = () => {
  const API = useRecoilValue(APIroot);

  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${API}/user/my-conference-record?nowPage=1&items=7`,
      headers: {
        "Content-Type": "application/json",
        ACCESS_TOKEN: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      console.log(response.data);
      setMeetingList(response.data.conference_record);
    });
  }, [API]);

  const data = React.useMemo(() => meetingList, [meetingList]);

  const columns = React.useMemo(
    () => [
      {
        Header: "번호",
        accessor: "cnt", // accessor is the "key" in the data
        width: 100,
      },
      {
        Header: "제목",
        accessor: "groupName",
        width: 400,
      },
      {
        Header: "작성자",
        accessor: "nickname",
        width: 100,
      },
      {
        Header: "등록일자",
        accessor: "callStartTime",
        width: 100,
      },
    ],
    []
  );

  return (
    <Styles>
      <CreateTable columns={columns} data={data} />
    </Styles>
  );
};

export default MyPageMeetingList;

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
