import React from "react";
import CreateTable from "../../CommonComponents/CreateTable";
import styled from 'styled-components'

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
`

const GroupNotice = () => {
  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'Hello',
        col4: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
        col3: 'Hello',
        col4: 'World',
      },
      {
        col1: 'whatever',
        col2: 'you want',
        col3: 'Hello',
        col4: 'World',
      },
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'Hello',
        col4: 'World',
      },
      {
        col1: 'Hello',
        col2: 'World',
        col3: 'Hello',
        col4: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
        col3: 'Hello',
        col4: 'World',
      },
      {
        col1: 'whatever',
        col2: 'you want',
        col3: 'Hello',
        col4: 'World',
      },
      {
        col1: 'whatever',
        col2: 'you want',
        col3: 'Hello',
        col4: 'World',
      },
      {
        col1: 'whatever',
        col2: 'you want',
        col3: 'Hello',
        col4: 'World',
      },
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: '번호',
        accessor: 'col1', // accessor is the "key" in the data
        width: 100,
      },
      {
        Header: '제목',
        accessor: 'col2',
        width: 400,
      },
      {
        Header: '작성자',
        accessor: 'col3',
        width: 100,
      },
      {
        Header: '등록일자',
        accessor: 'col4',
        width: 100,
      },
      {
        Header: '조회수',
        accessor: 'col5',
        width: 100,
      },
    ],
    []
  )

  return (
    <Styles>
      <CreateTable columns={columns} data={data} />
    </Styles>
  )
}

export default GroupNotice;

