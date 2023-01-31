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

import LoginFrame from "./Login/LoginComponents/LoginFrame";
import FindIdPage from "./Login/LoginPages/FindIdPage";
import FindPasswordPage from "./Login/LoginPages/FindPasswordPage";
import LoginPage from "./Login/LoginPages/LoginPage";
import NewPasswordPage from "./Login/LoginPages/NewPasswordPage";
import SignUpPage from "./Login/LoginPages/SignUpPage";

import MyPageMeetingList from "./MyPage/MyPagePages/MyPageMeetingList";
import MyPageQuestionList from "./MyPage/MyPagePages/MyPageQuestionList";

import AlarmButton from "./CommonComponents/MainHeader/AlarmButton";
import HeaderProfile from "./CommonComponents/MainHeader/HeaderProfile";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Images/LogoSwing.gif";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  const router = useLocation();
  const Navigate = useNavigate();

  const LogoHandler = () => {
    Navigate("/codemeets/login");
  };

  return (
    <RecoilRoot>
      <Center>
        <SideArea>
          {router.pathname === "/login" ||
          router.pathname === "/signup" ||
          router.pathname === "/findid" ||
          router.pathname === "/findpassword" ||
          router.pathname === "/newpassword" ? null : (
            <SideBar />
          )}
        </SideArea>
        <MainArea>
          <MainHeader>
            <div style={{ display: "flex", alignItems: "center" }}>
              <LogoImgae
                src={Logo}
                alt="CODEMeets"
                onClick={LogoHandler}
                style={{ cursor: "pointer" }}
              />
              CODEMeets
            </div>
            <div style={{display:"flex", alignContent:"center"}}>
              <AlarmButton />
              <HeaderProfile />
            </div>
          </MainHeader>
          <div style={{ paddingLeft: "1rem" }}>
            <Routes>
              {/* Login */}
              <Route path="/codemeets" element={<LoginFrame />}>
                <Route path="login" element={<LoginPage />}></Route>
                <Route path="signup" element={<SignUpPage />}></Route>
                <Route path="findid" element={<FindIdPage />}></Route>
                <Route
                  path="findpassword"
                  element={<FindPasswordPage />}
                ></Route>
                <Route path="newpassword" element={<NewPasswordPage />}></Route>
              </Route>
              {/* MainBoard */}
              <Route path="/" element={<Home />}></Route>
              <Route path="/my-page/:user_id" element={<MyPage />}>
                <Route
                  path="meeting-list"
                  element={<MyPageMeetingList />}
                ></Route>
                <Route
                  path="question-list"
                  element={<MyPageQuestionList />}
                ></Route>
              </Route>
              <Route path="/group/:group_pk" element={<GroupDetail />}>
                <Route path="notice" element={<GroupNotice />}></Route>
                <Route path="schedule" element={<GroupSchedule />}></Route>
                <Route
                  path="meeting-list"
                  element={<GroupMeetingList />}
                ></Route>
                <Route path="qna" element={<GroupQnA />}></Route>
                <Route path="member" element={<GroupMember />}></Route>
              </Route>
              <Route path="/grouplist/" element={<GroupList />}></Route>
              <Route path="/message" element={<Message />}></Route>
              <Route path="/setting" element={<Setting />}></Route>
            </Routes>
          </div>
        </MainArea>
      </Center>
    </RecoilRoot>
  );
}

export default App;

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
`;

const SideArea = styled.div`
  padding-top: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
`;

const MainArea = styled.div`
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-left: 12px;
  width: 100%;
  padding: 1rem;
  padding-top: 0px;
  padding-left: 0px;
`;

const LogoImgae = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
`;

const MainHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

//   overflow: scroll; 넘어가는 부분은 스크롤로 표현!
