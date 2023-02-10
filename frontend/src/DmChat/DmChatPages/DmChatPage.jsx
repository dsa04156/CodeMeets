import UserListItem from "../DmChatComponents/UserListItem";

import styled from "styled-components";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { useRecoilValue } from "recoil";
import { APIroot } from "../../Store";
import { user } from "../../Store";

const DmChatPage = () => {

  const API = useRecoilValue(APIroot);
  // const loginUser = useRecoilValue(user);

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${API}/group/list?nowPage=1&items=20&order=444`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      console.log(response.data);
      setUserList(response.data.groupList);
    });
    
  }, [API]);

  

  const liList = userList.map((userItem, index) => {
    // console.log(userItem);
    return (
      <UserListItem
        key={index}
        userId={userItem.groupName}
        userName={userItem.nickname}
      />

    );
  });

  return (
    <MainFrame>
      <UserFrame>
        <UserSearchFrame>
          <h1>UserSearchFrame</h1>
        </UserSearchFrame>
        <UserListFrame>
          <ul>{liList}</ul>          
        </UserListFrame>
      </UserFrame>
      <ChattingFrame>
        <h1>ChattingFrame</h1>
      </ChattingFrame>
    </MainFrame>
  );
};

export default DmChatPage;

const MainFrame = styled.div`
  height: 38rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  h1 {
    text-align: center;
    align-items: top;
  }
  input {
    width: 13rem;
    height: 20px;
  }
`;

const UserFrame = styled.div`
  width: 40%;
  border: 1px solid black;
  height: 38rem;
`;

const UserSearchFrame = styled.div`
  width: 100%;
  border: 1px solid black;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserListFrame = styled.div`
  width: 100%;
  border: 1px solid black;
  height: 90%;
  ul {
    width: 100%;
    margin: 0 0 0 0;
  }
`;

const ChattingFrame = styled.div`
  width: 60%;
  border: 1px solid black;
  height: 38rem;
`;