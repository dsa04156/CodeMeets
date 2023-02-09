import GroupListItem from "../GroupComponents/GroupListItem";
import Pagination from "../../CommonComponents/Pagination";
import GroupInModal from "../GroupModal/GroupInModal";
import CreateGroupModal from "../GroupModal/CreateGroupModal";
/////////////
import CreateTable from "../../CommonComponents/CreateTable";
///////////

import React, { useState, useEffect } from "react";
import axios from "axios";

import { APIroot } from "../../Store";

import { user, pageNumber } from "../../Store";
import { useRecoilValue, useRecoilState } from "recoil";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

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

  //그룹 가입하기 Modal 부분
  const [joinModalIsOpen, setJoinModalIsOpen] = useState(false);
  const groupInHandler = () => {
    setJoinModalIsOpen(true);
  }

  const [createModalIsOpen, setCreateIsOpen] = useState(false);

  const createGroupHandler = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${API}/group/click`,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      console.log(response.data[1])
      setCreateGroupUrl(response.data[1])
    })
    .then(
      res => {
        setCreateIsOpen(true);
      }

    )
  }
  console.log(createGroupUrl)
  
  const [groupList, setGroupList] = useState([]);
  console.log(loginUser.userPk);
  console.log(groupList);
  /////////////////////////////////////
  const data = React.useMemo(() => groupList, [groupList]);

  const columns = React.useMemo(
    () => [
      {
        Header: "번호",
        accessor: "cnt", // accessor is the "key" in the data
        width: 60,
      },
      {
        Header: "그룹명",
        accessor: "groupName",
        width: 400,
      },
      {
        Header: "생성자",
        accessor: "nickname",
        width: 100,
      },
      {
        Header: "생성일자?",
        accessor: "callStartTime",
        width: 230,
      },
    ],
    []
  );
  ////////////////////////////////////////

  useEffect(() => {
    console.log("실행");
    axios({
      method: "GET",
      url: `${API}/group/list?nowPage=${page}&items=10&order=444`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      console.log(response.data);
      setTotalPosts(response.data.groupList[0].total);
      setGroupList(response.data.groupList);
      setRecoilPageNum(1);
    });
  }, [API, page]);

  // console.log(createGroupUrl);
  return (
    <div>
      <TitleStyle>
        <div className="name">"{loginUser.userName}"</div>
        <div className="wellcome">님의 Group List</div>
        {/* modal 부분 */}
        {/* <div className="button">
          <button onClick={groupInHandler}>Create</button>
        </div> */}
        <div className="button">
          <CreateButton onClick={createGroupHandler}>Create</CreateButton>
        </div>
        {createModalIsOpen && (
          // 연결된 모달 component
          <CreateGroupModal
            open={createModalIsOpen}
            onClose={() => {
              setCreateIsOpen(false);
            }}
            CreateURL = {createGroupUrl}
          />
          )}
        <div className="button">
          <button onClick={groupInHandler}>Join</button>
        </div>
        {joinModalIsOpen && (
          // 연결된 모달 component
          <GroupInModal
            open={joinModalIsOpen}
            onClose={() => {
              setJoinModalIsOpen(false);
            }}
          />
        )}
      </TitleStyle>
      <ContentBox>
        <Styles>
          <CreateTable
          // isButton = "1"
            columns={columns}
            data={data}
            TableNavHandler={TableNavHandler}
          />
          <Pagination totalPosts={`${totalPosts}`} limit="9" page={page} setPage={setPage}></Pagination>
        </Styles>
      </ContentBox>
    </div>
  );
};

export default GroupList;

const TitleStyle = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1vh;
  margin-bottom: 2vh;
  height: 7vh;
  box-shadow: 0 2px 12px rgba(7, 222, 230, 0.2);
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
  .button {
    margin: 15px 0px 0px 20px;
  }
  border: 1px solid black;
`;

const ContentBox = styled.div`
  border: 1px solid black;
  box-shadow: 0 2px 12px rgba(7, 222, 230, 0.2);
  border-radius: 20px;
  height: 68vh;
  padding-left: 5vh;
`;

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

const CreateButton = styled.button`
  margin-left: 450px;
`;

const JoinButton = styled.button`
  margin-left: 50px;
`;
