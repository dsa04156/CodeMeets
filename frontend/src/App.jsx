import SideBar from "./CommonComponents/SideBar/SideBar";

import GroupList from "./Group/GroupPages/GroupList";
import Home from "./Home/HomePages/Home";
import MyPage from "./MyPage/MyPagePages/MyPage";


import GroupDetail from "./Group/GroupPages/GroupDetail";
import GroupQnA from "./Group/GroupPages/GroupQnA";
import GroupMeetingList from "./Group/GroupPages/GroupMeetingList";
import GroupNotice from "./Group/GroupPages/GroupNotice";
import GroupSchedule from "./Group/GroupPages/GroupSchedule";
import GroupMember from "./Group/GroupPages/GroupMember";

//Detail
import GroupNoticeDetail from "./Group/GroupDetailPage/GroupNoticeDetail";
import GroupRecordDetail from "./Group/GroupDetailPage/GroupRecordDetail";
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

import DmChatPage from "./DmChat/DmChatPages/DmChatPage";

import AlarmButton from "./CommonComponents/MainHeader/AlarmButton";
import HeaderProfile from "./CommonComponents/MainHeader/HeaderProfile";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Images/LogoSwing.gif";

import SidePadding from "./CommonComponents/SidePadding";

import { user } from "./Store";

//open vidu
// import OpenViduMain from "./Openvidu/OpenViduMain";
import NoPadding from "./Openvidu/NoPadding";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  const router = useLocation();
  const navigate = useNavigate();
  const loginUser = useRecoilValue(user);
  
  const LogoHandler = () => {
    if (loginUser?.userPk !== undefined) {
      navigate("/home");
    } else {
      alert('로그인 해주시기 바랍니다.')
      navigate('/');
    }
  };


  return (
    <>
      {router.pathname !== "/openvidu" ? (
        <SidePadding>
          <Center>
            <SideArea>
              {router.pathname === "/" ||
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
                  <fontFace>CODEMeets</fontFace>
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
                    path="/my-question-record/:conferenceQuestionPk"
                    element={<QuestionListDetail />}
                  ></Route>
                  <Route
                    path="/group/:groupPk/record/:conferencePk"
                    element={<GroupRecordDetail />}
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
                    <Route path="schedule" element={<GroupSchedule />}></Route>
                    <Route
                      path="meeting-list"
                      element={<GroupMeetingList />}
                    ></Route>
                    <Route path="qna" element={<GroupQnA />}></Route>
                    <Route path="member" element={<GroupMember />}></Route>
                  </Route>
                  <Route path="/grouplist/" element={<GroupList />}></Route>


                  {/* DmChat Page */}
                  <Route path="/dmChat" element={<DmChatPage />}></Route>
                </Routes>
              </div>
            </MainArea>
          </Center>
        </SidePadding>
      ) : (
        <Routes>
          {/* openvidu 링크 */}
          <Route path="/openvidu" element={<NoPadding />}></Route>
        </Routes>
      )}
    </>
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
  /* background: rgb(245,235,224);
background: linear-gradient(149deg, rgba(245,235,224,1) 100%, rgba(238,227,203,1) 100%, rgba(9,182,134,1) 100%); */
  background: rgb(142, 195, 176);
  background: linear-gradient(
    149deg,
    rgba(142, 195, 176, 0.5887605042016807) 100%,
    rgba(240, 219, 219, 0.8828781512605042) 100%
  );
  /* background: rgb(150,126,118);
background: linear-gradient(149deg, rgba(150,126,118,0.5439425770308124) 100%, rgba(222,245,229,0.28904061624649857) 100%); */
  /* background: rgb(190,229,255);
background: linear-gradient(149deg, rgba(190,229,255,1) 100%, rgba(37,109,133,1) 100%); */
`;

const MainArea = styled.div`
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-left: 12px;
  width: 100%;
  padding: 1rem;
  padding-top: 0px;
  padding-left: 0px;
  /* background: rgb(254,252,243);
background: linear-gradient(149deg, rgba(254,252,243,1) 100%, rgba(238,227,203,1) 100%, rgba(9,182,134,1) 100%); */
  /* background: rgb(158,213,197);
background: linear-gradient(149deg, rgba(158,213,197,0.4823179271708683) 100%, rgba(240,219,219,0.8828781512605042) 100%); */
  /* background: rgb(215,192,174);
background: linear-gradient(149deg, rgba(215,192,174,0.41789215686274506) 100%, rgba(222,245,229,0.28904061624649857) 100%); */
  /* background: rgb(190,229,255);
background: linear-gradient(149deg, rgba(190,229,255,1) 100%, rgba(37,109,133,1) 100%); */
  background: rgb(247, 247, 247);
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

const fontFace = styled.div`
  font-family: "yanoljaBold";
  src: url("./Font/yanoljaBold.ttf");
`;
//   overflow: scroll; 넘어가는 부분은 스크롤로 표현!
