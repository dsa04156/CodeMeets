import Pagination from '../../CommonComponents/Pagination';
import GroupInModal from '../GroupModal/GroupInModal';
import CreateGroupModal from '../GroupModal/CreateGroupModal';
import CreateTable from '../../CommonComponents/CreateTable';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { APIroot } from '../../Store';

import { user, pageNumber } from '../../Store';
import { useRecoilValue, useRecoilState } from 'recoil';

import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

const GroupList = () => {
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);

  const [page, setPage] = useState(1);
  const [recoilPageNum, setRecoilPageNum] = useRecoilState(pageNumber);
  const [totalPosts, setTotalPosts] = useState(0);
  const [createGroupUrl, setCreateGroupUrl] = useState();

  const navigate = useNavigate();

  const TableNavHandler = (row) => {
    navigate(`/group/${row.original.groupPk}/notice`);
  };

  const [joinModalIsOpen, setJoinModalIsOpen] = useState(false);
  const groupInHandler = () => {
    setJoinModalIsOpen(true);
  };

  const [createModalIsOpen, setCreateIsOpen] = useState(false);

  const createGroupHandler = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: `${API}/group/click`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response.data)
        setCreateGroupUrl(response.data[1]);
      })
      .then(() => {
        setCreateIsOpen(true);
      });
      console.log(createModalIsOpen)
  };

  const [groupList, setGroupList] = useState([]);

  const data = React.useMemo(() => groupList, [groupList]);

  const columns = React.useMemo(
    () => [
      {
        Header: '번호',
        accessor: 'newIndex', // accessor is the "key" in the data
        width: 60,
      },
      {
        Header: '그룹명',
        accessor: 'groupName',
        width: 400,
      },
      {
        Header: '생성자',
        accessor: 'managerName',
        width: 100,
      },
      {
        Header: '최근 활동',
        accessor: 'callStartTime',
        width: 230,
      },
    ],
    []
  );

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API}/group/list?nowPage=${page}&items=10&order=group_pk`,
      headers: {
        'Content-Type': 'application/json',
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    }).then((response) => {
      console.log(response.data)
      setTotalPosts(response.data.groupList[0].total);
      response.data.groupList.map((list, index) => {
        list.newIndex = index + (page - 1) * 10 + 1;
      });
      console.log(response.data)
      setGroupList(response.data.groupList);
      setRecoilPageNum(1);
    });
  }, [API, page, createModalIsOpen, joinModalIsOpen]);

  return (
    <div>
      <TitleStyle>
        <div className="sum">
          <div className="name">"{loginUser.userName}"</div>
          <div className="wellcome">님의 Group List</div>
        </div>
        <div className="position">
          <SubButtonStyle>
            <button className="custom-btn btn-4" onClick={createGroupHandler}>
              Create
            </button>
          </SubButtonStyle>
          {createModalIsOpen && (
            <CreateGroupModal
              open={createModalIsOpen}
              onClose={() => {
                setCreateIsOpen(false);
              }}
              CreateURL={createGroupUrl}
            />
          )}
        </div>
        <div>
          <SubButtonStyle>
            <button className="custom-btn btn-4" onClick={groupInHandler}>
              Join
            </button>
          </SubButtonStyle>
          {joinModalIsOpen && (
            <GroupInModal
              open={joinModalIsOpen}
              onClose={() => {
                setJoinModalIsOpen(false);
              }}
            />
          )}
        </div>
      </TitleStyle>
      <ContentBox>
        <Styles>
          <CreateTable
            columns={columns}
            data={data}
            TableNavHandler={TableNavHandler}
          />
          <Pagination
            totalPosts={`${totalPosts}`}
            limit="10"
            page={page}
            setPage={setPage}
          ></Pagination>
        </Styles>
      </ContentBox>
    </div>
  );
};

export default GroupList;

const TitleStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1vh;
  margin-bottom: 2vh;
  height: 7vh;
  border-radius: 20px;
  .name {
    display: flex;
    align-items: center;
    font-size: 2em;
    margin-right: 5px;
  }
  .wellcome {
    display: flex;
    align-items: end;
    font-size: 1em;
  }
  .sum {
    display: flex;
  }
  .button {
    margin: 15px 0px 0px 20px;
  }
  .position {
    float: right;
    margin-left: auto;
  }
`;

const ContentBox = styled.div`
  border-top: 1px solid black;
  border-radius: 5px;
  height: 68vh;
  padding-left: 5vh;
  background: rgb(239, 245, 245);
  background: linear-gradient(
    149deg,
    rgba(239, 245, 245, 1) 100%,
    rgba(239, 245, 245, 0.41228991596638653) 100%
  );
`;

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
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
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const SubButtonStyle = styled.div`
  .custom-btn {
    width: 100px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    margin-left: 15px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    float: right;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
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