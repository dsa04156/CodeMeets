import GroupListItem from "../GroupComponents/GroupListItem";
import Pagination from "../../CommonComponents/Pagination";
import GroupInModal from "../GroupModal/GroupInModal";
/////////////
import CreateTable from "../../CommonComponents/CreateTable";
///////////

import React, { useState, useEffect } from "react";
import axios from "axios";

import { APIroot } from "../../Store";

import { user } from "../../Store";
import { useRecoilValue } from "recoil";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const GroupList = () => {
  const navigate = useNavigate();

  const TableNavHandler = (row) => {
    navigate(`/group/${row.original.groupPk}/notice`);
  };


  //그룹 가입하기 Modal 부분
  const [isOpen, setIsOpen] = useState(false);
  const groupInHandler = () => {
    setIsOpen(true);
  }



  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);

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
  ////////////////////////////////////////

  useEffect(() => {
    console.log("실행");
    axios({
      method: "GET",
      url: `${API}/group/list?nowPage=1&items=7&order=444`,
      headers: {
        "Content-Type": "application/json",
        ACCESS_TOKEN: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      console.log(response.data);
      setGroupList(response.data.groupList);
    });
  }, [API]);

  return (
    <div>
      <TitleStyle>
        <div className="name">"{loginUser.userName}"</div>{" "}
        <div className="wellcome">님의 Group List</div>
        {/* modal 부분 */}
        <button onClick={groupInHandler}>가입 !</button>
        {isOpen && (
          // 연결된 모달 component
          <GroupInModal
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        )}
      </TitleStyle>
      <ContentBox>
        <Styles>
          <CreateTable
            columns={columns}
            data={data}
            TableNavHandler={TableNavHandler}
          />
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
