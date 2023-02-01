import React, { useEffect } from "react";
import CreateTable from "../../CommonComponents/CreateTable";
import styled from 'styled-components'

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"

import { APIroot } from "../../Store";
import { useRecoilValue } from "recoil";

import { useState } from "react";
import axios from "axios";

const GroupNotice = () => {
  const API = useRecoilValue(APIroot);
  const params = useParams();
  console.log('이건 notice', params)

  const [noticeList, setNoticeList] = useState([])
  const [order, setOrder] = useState("group_notice_date")
  console.log(noticeList)

  const navigate = useNavigate()

  const TableNavHandelr = (row) => {
    navigate(`/group/notice/${row.original.groupNoticePk}`)
    console.log(`/group/notice/${row.original.groupNoticePk}`)
  };

  
  useEffect(() => {
    axios({
      method: "GET",
      url: `${API}/group-notice?groupPk=${params.group_pk}&nowPage=1&items=10&order=${order}`,
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => {
      console.log(response.data);
      setNoticeList(response.data)
    })
    console.log(noticeList)
  },[API, params, order])
  const data = React.useMemo(
    () => noticeList,
    [noticeList]
  )

  const columns = React.useMemo(
    () => [
      {
        Header: '번호',
        accessor: 'userPk', // accessor is the "key" in the data
        width: 100,
      },
      {
        Header: '제목',
        accessor: 'groupNoticeTitle',
        width: 400,
      },
      {
        Header: '작성자',
        accessor: 'userName',
        width: 100,
      },
      {
        Header: '등록일자',
        accessor: 'groupNoticeDate',
        width: 100,
      },
    ],
    []
  )

  return (
    <Styles>
      <CreateTable columns={columns} data={data} TableNavHandler={TableNavHandelr}/>
    </Styles>
  )
}

export default GroupNotice;


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