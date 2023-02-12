import React, { useEffect } from "react";
import CreateTable from "../../CommonComponents/CreateTable";
import Pagination from "../../CommonComponents/Pagination";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { APIroot, groupNavTitle, pageNumber } from "../../Store";
import { useRecoilValue, useRecoilState } from "recoil";

import { useState } from "react";
import axios from "axios";

const GroupNotice = () => {
  const params = useParams();
  const navigate = useNavigate();

  const API = useRecoilValue(APIroot);
  const [recoilNavTitle, setRecoilNavTitle] = useRecoilState(groupNavTitle)
  const [noticeList, setNoticeList] = useState([]);
  // API의 order 부분 바꾸기위한 useState -> 일단 사용안함
  const [order, setOrder] = useState("group_notice_date");
  // 게시글의 총 개수를 알기 위한 useState
  const [totalPosts, setTotalPosts] = useState(0);
  // url의 page, pagination에 넘겨줌!
  const [page, setPage] = useRecoilState(pageNumber);
  const [position, setPosition] = useState();

  const TableNavHandelr = (row) => {
    navigate(`/group/notice/${row.original.groupNoticePk}`);
  };

  const CreateWriteHandler = () => {
    navigate(`/group/${params.group_pk}/notice/create`)
  }

  // API, params, order, page가 바뀌면 재 렌더링하는 useEffect
  useEffect(() => {
    setRecoilNavTitle("Notice")
    axios({
      method: "GET",
      url: `${API}/group-notice?groupPk=${params.group_pk}&nowPage=${page}&items=9&order=${order}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setTotalPosts(response.data[0].total);
      setNoticeList(response.data);
    });
  }, [API, params, order, page]);

  //멤버리스트 API 가져와 Position 값 알기
  useEffect(() => {
    axios({
      method: "GET",
      url: `${API}/group/${params.group_pk}/member`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      setPosition(response.data.position);
    })
  }, [API, position]);

  //테이블
  const data = React.useMemo(() => noticeList, [noticeList]);

  const columns = React.useMemo(
    () => [
      {
        Header: "번호",
        accessor: "userPk", // accessor is the "key" in the data
        width: 100,
      },
      {
        Header: "제목",
        accessor: "groupNoticeTitle",
        width: 400,
      },
      {
        Header: "작성자",
        accessor: "userName",
        width: 100,
      },
      {
        Header: "등록일자",
        accessor: "groupNoticeDate",
        width: 200,
      },
    ],
    []
  );

  return (
    <div>
      <Styles>
        <CreateTable
          columns={columns}
          data={data}
          TableNavHandler={TableNavHandelr}
        />
      </Styles>
      {/* 각 부분 맞춰서 넘겨주면 pagination 됨 */}
      <Pagination
        totalPosts={`${totalPosts}`}
        limit="9"
        page={page}
        setPage={setPage}
      ></Pagination>
      <div>
      {position === 1 ? <button onClick={CreateWriteHandler}>Create</button> : null}
      </div>
    </div>
  );
};

export default GroupNotice;

// style={{overflow: "hidden",
// textOverflow: "ellipsis",
// whiteSpace: "nowrap"}}

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
