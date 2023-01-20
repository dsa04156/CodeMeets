import SideBar from "./CommonComponents/SideBar/SideBar";

import GroupList from "./Group/GroupPages/GroupList";
import Home from "./Home/HomePages/Home";
import Message from "./Message/MessagePages/Message";
import MyPage from "./MyPage/MyPagePages/MyPage";
import Setting from "./Setting/SettingPages/Setting";

import GroupDetail from "./Group/GroupPages/GroupDetail";
import GroupQnA from "./Group/GroupPages/GroupQnA";
import GroupMeetingList from "./Group/GroupPages/GroupMeetingList";
import GroupNotice from "./Group/GroupPages/GroupNotice";
import GroupSchedule from "./Group/GroupPages/GroupSchedule";
import GroupMember from "./Group/GroupPages/GroupMember";

import FindIdPage from "./Login/LoginPages/FindIdPage";
import FindPasswordPage from "./Login/LoginPages/FindPasswordPage";
import LoginPage from "./Login/LoginPages/LoginPage";
import NewPasswordPage from "./Login/LoginPages/NewPasswordPage";
import SignUpPage from './Login/LoginPages/SignUpPage';

import { Routes, Route, useLocation } from "react-router-dom";


import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./CommonComponents/Modal/Modal";

function App() {
  const router = useLocation();
  const cors = require('cors');

  // 모달
  const [isOpen, setIsOpen] = useState(false);
  const onClickButton = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div>{router.pathname === "/login" || "/signup" || "/findid" || "/findpassword" || "/newpassword" ? null : <SideBar />}</div>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/findid" element={<FindIdPage />}></Route>
        <Route path="/findpassword" element={<FindPasswordPage />}></Route>
        <Route path="/newpassword" element={<NewPasswordPage />}></Route>
        {/* MainBoard */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/my-page" element={<MyPage />}></Route>
        <Route path="/group/" element={<GroupList />}></Route>
        <Route path="/group/1" element={<GroupDetail />}>
          <Route path="notice" element={<GroupNotice />}></Route>
          <Route path="schedule" element={<GroupSchedule />}></Route>
          <Route path="meeting-list" element={<GroupMeetingList />}></Route>
          <Route path="qna" element={<GroupQnA />}></Route>
          <Route path="member" element={<GroupMember />}></Route>
        </Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
      </Routes>


      <AppWrap>
        <Button onClick={onClickButton}>Click Me!</Button>
        {isOpen && (<Modal open={isOpen} onClose={() => {setIsOpen(false);}} />)}
      </AppWrap>
    </div>
  );
}

const Button = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background-color: #fa9f98;
  border-radius: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #fac2be;
  }
`;

const AppWrap = styled.div`
  text-align: center;
  margin: 50px auto;
`;


export default App;
