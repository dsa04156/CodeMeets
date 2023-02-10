import GroupListItem from "../GroupComponents/GroupListItem";
import Pagination from "../../CommonComponents/Pagination/Pagination";

import { useState, useEffect } from "react";
import axios from "axios";

import { APIroot } from "../../Store";

import { user } from "../../Store";
import { useRecoilValue } from "recoil";

import styled from "styled-components";

const GroupList = () => {
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);

  const [groupList, setGroupList] = useState([]);
  console.log(loginUser.userPk);
  console.log(groupList);

  useEffect(() => {
    console.log("실행");
    axios({
      method: "GET",
      url: `${API}/group/list`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      console.log(response.data);
      setGroupList(response.data);
    });
  }, [API]);

  const liList = groupList.map((groupitem, index) => {
    console.log(groupitem);
    return (
      <GroupListItem
        key={index}
        id={groupitem.cnt}
        title={groupitem.gname}
        nickname={groupitem.nickname}
        count={groupitem.count}
      />
    );
  });

  return (
    <div>
      <TitleStyle>
        <div className="name">"{loginUser.userName}"</div> <div className="wellcome">님의 Group List</div>
      </TitleStyle>
      <ContentBox>
        <ul>{liList}</ul>
        {/* {groupList} */}
      </ContentBox>
      {/* <Pagination></Pagination> */}
    </div>
  );
};

export default GroupList;


const TitleStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  margin: 2vh;
  height: 8vh;
  .name {
    display: flex;
    font-size: 2em;
    margin-right: 5px;
  };
  .wellcome {
    display: flex;
    font-size: 1em;
  };
  border: 1px solid black;
`;

const ContentBox = styled.div`
background-color: white;
`;
