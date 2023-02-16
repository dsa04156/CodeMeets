import React, { useEffect } from 'react';
import CreateTable from '../../CommonComponents/CreateTable';
import Pagination from '../../CommonComponents/Pagination';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { APIroot, groupNavTitle, pageNumber } from '../../Store';
import { useRecoilValue, useRecoilState } from 'recoil';

import { useState } from 'react';
import axios from 'axios';

const GroupNotice = () => {
  const params = useParams();
  const navigate = useNavigate();

  const API = useRecoilValue(APIroot);
  const [recoilNavTitle, setRecoilNavTitle] = useRecoilState(groupNavTitle);
  const [noticeList, setNoticeList] = useState([]);

  const [order, setOrder] = useState('group_notice_date');
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useRecoilState(pageNumber);
  const [position, setPosition] = useState();

  const TableNavHandelr = (row) => {
    navigate(`/group/notice/${row.original.groupNoticePk}`);
  };

  const CreateWriteHandler = () => {
    navigate(`/group/${params.group_pk}/notice/create`);
  };

  useEffect(() => {
    setRecoilNavTitle('Notice');
    axios({
      method: 'GET',
      url: `${API}/group-notice?groupPk=${params.group_pk}&nowPage=${page}&items=9&order=${order}`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      setTotalPosts(response.data[0].total);
      response.data.map((list, index) => {
        list.newIndex = index + (page - 1) * 9 + 1;
      });
      setNoticeList(response.data);
    });
  }, [API, params, order, page]);

  //멤버리스트 API 가져와 Position 값 알기
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API}/group/${params.group_pk}/member`,
      headers: {
        'Content-Type': 'application/json',
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    }).then((response) => {
      setPosition(response.data.position);
    });
  }, [API, position]);

  //테이블
  const data = React.useMemo(() => noticeList, [noticeList]);

  const columns = React.useMemo(
    () => [
      {
        Header: '번호',
        accessor: 'newIndex', // accessor is the "key" in the data
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
        Header: '등록 일자',
        accessor: 'groupNoticeDate',
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
            TableNavHandler={TableNavHandelr}
          />
        </Styles>
      </ContentBox>
      <Pagination
        totalPosts={`${totalPosts}`}
        limit="9"
        page={page}
        setPage={setPage}
      ></Pagination>
      <div>
        {position === 1 ? (
          <ButtonStyle>
            <button className="custom-btn btn-4" onClick={CreateWriteHandler}>
              Create
            </button>
          </ButtonStyle>
        ) : null}
      </div>
    </div>
  );
};

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

const ContentBox = styled.div`
  background: rgb(239, 245, 245);
  background: linear-gradient(
    149deg,
    rgba(239, 245, 245, 1) 100%,
    rgba(239, 245, 245, 0.41228991596638653) 100%
  );
`;

const ButtonStyle = styled.div`
  .custom-btn {
    width: 80px;
    height: 35px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    float: right;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
  }
  .btn-4 {
    background-color: #4dccc6;
    background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
    line-height: 42px;
    padding: 0;
    border: none;
  }
  .btn-4:hover {
    background-color: #89d8d3;
    background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
  }
  .btn-4 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-4:before,
  .btn-4:after {
    position: absolute;
    content: '';
    right: 0;
    top: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-4:before {
    height: 0%;
    width: 0.1px;
  }
  .btn-4:after {
    width: 0%;
    height: 0.1px;
  }
  .btn-4:hover:before {
    height: 100%;
  }
  .btn-4:hover:after {
    width: 100%;
  }
  .btn-4 span:before,
  .btn-4 span:after {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-4 span:before {
    width: 0.1px;
    height: 0%;
  }
  .btn-4 span:after {
    width: 0%;
    height: 0.1px;
  }
  .btn-4 span:hover:before {
    height: 100%;
  }
  .btn-4 span:hover:after {
    width: 100%;
  }
`;
