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

//Detail
import GroupNoticeDetail from "./Group/GroupDetailPage/GroupNoticeDetail";
import GroupQnADetail from "./Group/GroupDetailPage/GroupQnADetail";
import GroupNoticeCreate from "./Group/GroupComponents/GroupNoticeCreate";
import GroupNoticeModify from "./Group/GroupComponents/GroupNoticeModify";
import GroupQnACreate from "./Group/GroupComponents/GroupQnACreate";
import GroupQnAModify from "./Group/GroupComponents/GroupQnAModify";
import MeetingListDetail from "./MyPage/MyPagePages/MeetingListDetail";
import QuestionListDetail from "./MyPage/MyPagePages/QuestionListDetail";

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

import SidePadding from "./CommonComponents/SidePadding";

//open vidu
import OpenViduMain from "./Openvidu/OpenViduMain";

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
    Navigate("/home");
  };

  return (
    <div>
      <RecoilRoot>
        {router.pathname !== "/openvidu" ? (
          <SidePadding>
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
                  <div style={{ display: "flex", alignContent: "center" }}>
                    <AlarmButton />
                    <HeaderProfile />
                  </div>
                </MainHeader>
                <div style={{ paddingLeft: "1rem" }}>
                  <Routes>
                    {/* Login */}
                    <Route path="/" element={<LoginFrame />}>
                      <Route path="" element={<LoginPage />}></Route>
                      <Route path="signup" element={<SignUpPage />}></Route>
                      <Route path="findid" element={<FindIdPage />}></Route>
                      <Route
                        path="findpassword"
                        element={<FindPasswordPage />}
                      ></Route>
                      <Route
                        path="newpassword"
                        element={<NewPasswordPage />}
                      ></Route>
                    </Route>
                    {/* MainBoard */}
                    <Route path="/home" element={<Home />}></Route>
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

                    {/* 디테일 페이지 */}
                    <Route
                      path="/group/notice/:notice_pk"
                      element={<GroupNoticeDetail />}
                    ></Route>
                    <Route
                      path="/group/qna/:qna_pk"
                      element={<GroupQnADetail />}
                    ></Route>
                    <Route
                      path="/my-meeting-record/:conference_Pk"
                      element={<MeetingListDetail />}
                    ></Route>
                    <Route
                      path="/my-question-record/:conference_Pk"
                      element={<QuestionListDetail />}
                    ></Route>

                    {/* 수정 페이지*/}
                    <Route
                      path="/group/notice/modify"
                      element={<GroupNoticeModify />}
                    ></Route>
                    <Route
                      path="/group/qna/modify"
                      element={<GroupQnAModify />}
                    ></Route>

                    {/* 글쓰기 페이지 */}
                    <Route
                      path="/group/:group_pk/notice/create"
                      element={<GroupNoticeCreate />}
                    ></Route>
                    <Route
                      path="/group/:group_pk/qna/create"
                      element={<GroupQnACreate />}
                    ></Route>

                    <Route path="/group/:group_pk" element={<GroupDetail />}>
                      <Route path="notice" element={<GroupNotice />}></Route>
                      <Route
                        path="schedule"
                        element={<GroupSchedule />}
                      ></Route>
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
          </SidePadding>
        ) : (
          <Routes>
            {/* openvidu 링크 */}
            <Route path="/openvidu" element={<OpenViduMain />}></Route>
          </Routes>
        )}
      </RecoilRoot>
    </div>
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
  background: rgb(22, 28, 68);
`;

const MainArea = styled.div`
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-left: 12px;
  width: 100%;
  padding: 1rem;
  padding-top: 0px;
  padding-left: 0px;
  background: rgb(22, 28, 68);
  background: linear-gradient(
    149deg,
    rgba(22, 28, 68, 1) 39%,
    rgba(52, 60, 117, 1) 67%,
    rgba(188, 194, 236, 1) 100%
  );
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

const IndexBack = styled.div``;

//   overflow: scroll; 넘어가는 부분은 스크롤로 표현!
