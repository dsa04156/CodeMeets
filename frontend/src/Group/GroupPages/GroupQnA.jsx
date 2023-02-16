import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { APIroot } from '../../Store';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import CreateTable from '../../CommonComponents/CreateTable';
import Pagination from '../../CommonComponents/Pagination';

const GroupQnA = () => {
  const API = useRecoilValue(APIroot);

  const [qnaList, setQnaList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  const TableNavHandler = (row) => {
    navigate(`/group/qna/${row.original.groupQuestionPk}`);
  };

  const CreateWriteHandler = () => {
    navigate(`/group/${params.group_pk}/qna/create`);
  };

  // Q&A 리스트 불러오기
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API}/qna/list/${params.group_pk}?nowPage=${page}&items=9`,
    }).then((response) => {
      setTotalPosts(response.data[0].total);
      response.data.map((list, index) => {
        list.newIndex = index + (page - 1) * 9 + 1;
      });
      setQnaList(response.data);
    });
  }, [API, params, page]);

  const data = React.useMemo(() => qnaList, [qnaList]);

  const columns = React.useMemo(
    () => [
      {
        Header: '번호',
        accessor: 'newIndex',
        width: 100,
      },
      {
        Header: '제목',
        accessor: 'groupQuestionTitle',
        width: 400,
      },
      {
        Header: '작성자',
        accessor: 'username',
        width: 110,
      },
      {
        Header: '좋아요',
        accessor: 'groupQuestionLikeCnt',
        width: 130,
      },
      {
        Header: '등록 일자',
        accessor: 'groupQuestionDate',
        width: 140,
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
          <Pagination
            totalPosts={`${totalPosts}`}
            limit="9"
            page={page}
            setPage={setPage}
          ></Pagination>
        </Styles>
      </ContentBox>
      <ButtonStyle>
        <button className="custom-btn btn-4" onClick={CreateWriteHandler}>
          Create
        </button>
      </ButtonStyle>
    </div>
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
