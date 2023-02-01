import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { APIroot } from "../../Store";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom"

import GroupQnAItem from "../GroupComponents/GroupQnAItem";
import CreateTable from "../../CommonComponents/CreateTable";

const GroupQnA = () => {
  const API = useRecoilValue(APIroot);

  const [qnaList, setQnaList] = useState([]);

  const params = useParams();
  const navigate = useNavigate()

  const TableNavHandler = (row) =>{
    navigate(`/group/qna/${row.original.groupQuestionPk}`)
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: `${API}/qna/list/${params.group_pk}?nowPage=1&items=20`,
    }).then((response) => {
      console.log(response.data);
      setQnaList(response.data);
    });
  }, [API, params]);

  const data = React.useMemo(() => qnaList, [qnaList]);

  const columns = React.useMemo(
    () => [
      {
        Header: "번호",
        accessor: "cnt", // accessor is the "key" in the data
        width: 100,
      },
      {
        Header: "제목",
        accessor: "groupQuestionTitle",
        width: 400,
      },
      {
        Header: "작성자",
        accessor: "username",
        width: 100,
      },
      {
        Header: "좋아요",
        accessor: "groupQuestionLikeCnt",
        width: 100,
      },
      {
        Header: "등록일자",
        accessor: "userPk",
        width: 100,
      },
      {
        Header: "등록일자",
        accessor: "groupQuestionDate",
        width: 100,
      },
    ],
    []
  );

  return (
    <Styles>
      <CreateTable columns={columns} data={data} TableNavHandler={TableNavHandler}/>
    </Styles>
  );
};

export default GroupQnA;

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
