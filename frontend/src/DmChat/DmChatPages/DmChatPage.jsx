import UserListItem from "../DmChatComponents/UserListItem";
import SearchUserListItem from "../DmChatComponents/SearchUserListItem";
import ChattingPage from "./ChattingPage";

import styled from "styled-components";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { useRecoilValue } from "recoil";
import { APIroot } from "../../Store";

const DmChatPage = () => {
  const API = useRecoilValue(APIroot);

  const [userList, setUserList] = useState([]);
  const [userPkList, setUserPkList] = useState([]);
  const [selectRoom, setSelectRoom] = useState([]);
  const [other, setOther] = useState([]);
  const [search, setSearch] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${API}/message/list`,
      // url: `http://localhost:18081/api/message/list`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      // console.log(response.data);
      setUserList(response.data);
    });
    
  }, [API]);

  const onChange = (e) => {
    setSearch(e.target.value);
    setSearchUserList([]);
  }

  const searchUser = () => {
    axios({
      method: "GET",
      url: `${API}/message/search-user?nickname=${search}`,
      // url: `http://localhost:18081/api/message/search-user?nickname=${search}`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      setSearchUserList(response.data);
    });
  }

  const getNewRoomNo = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/message/room-no`,
        // url: `http://localhost:18081/api/message/room-no`,
      });
  
      return response.data;
    } catch (err) {
      console.log("Error >>", err);
    }
  }

  const searchUsers = searchUserList.map((searchUserItem, index) => {
    const addRoom = async () => {
      const data = {};
      data.email = searchUserItem.email;
      data.other_nick = searchUserItem.nickname;
      data.otherPk = searchUserItem.userPk;
      data.profilePhoto = searchUserItem.profilePhoto;
      data.room = await getNewRoomNo();
      data.content = "첫 대화를 시작하세요";

      setUserList([ ...userList, data])
    };

    return (
      <div onClick={addRoom}>
        <SearchUserListItem
          key={index}
          nickname={searchUserItem.nickname}
          email={searchUserItem.email}
          profilePhoto={searchUserItem.profilePhoto}
        />
      </div>
      
    );
  });

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
          <input type="text"
            style={{ border: 'solid 2px grey', width: '100%', height: '25px', alignItems: 'top'}}
            value={search}
            onChange={onChange}
            onKeyPress={event => {
              if (event.code === "Enter") {
                  event.preventDefault();
                  searchUser();
                  }
              }}/>
          {searchUsers}
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
          : <h1> 대화 시작을 기다리는 중... </h1>
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
  height: auto;
  align-items: center;
  justify-content: center;
`;

const UserListFrame = styled.div`
  overflow: scroll;
  width: 100%;
  border: 1px solid black;
  height: 70%;
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