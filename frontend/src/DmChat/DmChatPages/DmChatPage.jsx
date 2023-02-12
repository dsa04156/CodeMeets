import UserListItem from "../DmChatComponents/UserListItem";
import ChattingPage from "./ChattingPage";

import styled from "styled-components";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { useRecoilValue } from "recoil";
import { APIroot } from "../../Store";
import { user } from "../../Store";

const DmChatPage = () => {
  const API = useRecoilValue(APIroot);
  const USER = useRecoilValue(user);
  // const loginUser = useRecoilValue(user);

  const [userList, setUserList] = useState([]);
  const [selectRoom, setSelectRoom] = useState([]);
  const [other, setOther] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:18081/api/message/list`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      // console.log(response.data);
      setUserList(response.data);
    });
    
  }, [API]);

  const userUlList = userList.map((userItem, index) => {
    const getRoomDetail = () => {
      setSelectRoom(userItem.room);
      setOther(userItem.otherPk);
    };
    
    return (
      <div onClick={getRoomDetail}>
        <UserListItem
        key={index}
        nickname={userItem.other_nick}
        contents={userItem.content}
        room={userItem.room}
      />
      </div>
    );
  });

  return (
    <MainFrame>
      <UserFrame>
        <UserSearchFrame>
          <h1>UserSearchFrame</h1>
        </UserSearchFrame>
        <UserListFrame>
          <ul>{userUlList}</ul>          
        </UserListFrame>
      </UserFrame>
      <ChattingFrame> 
        {
          selectRoom.length !== 0
            ? <ChattingPage
              key={selectRoom}
              room={selectRoom}
              other={other}
            />
          : <h1>ChattingFrame</h1>
        }
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
  overflow: scroll;
  width: 100%;
  border: 1px solid black;
  height: 90%;
  ul {
    width: 100%;
    margin: 0px;
    list-style: none;
    padding: 0px;
  }
`;

const ChattingFrame = styled.div`
  width: 60%;
  border: 1px solid black;
  height: 38rem;
`;