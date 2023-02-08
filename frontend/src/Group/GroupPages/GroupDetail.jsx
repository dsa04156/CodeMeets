import GroupNavBar from "../GroupComponents/GroupNavBar";
import { Outlet } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import GroupLeaveModal from "../GroupModal/GroupLeaveModal";
import GroupDeleteModal from "../GroupModal/GroupDeleteModal";

import styled from "styled-components";

import { groupNavTitle, APIroot } from "../../Store";
import { useRecoilState, useRecoilValue } from "recoil";

const GroupDetail = () => {
  const [groupTitle, setGroupTitle] = useRecoilState(groupNavTitle);
  const [groupUrl, setGroupUrl] = useState('');
  // const [urlCopy, setUrlCopy] = useState('');
  const [leaveTheGroupModal, setLeaveTheGroupModal] = useState(false); //true면 탈퇴하는거로 구성
  const [DeleteTheGroupModal, setDeleteTheGroupModal] = useState(false);
  const API = useRecoilValue(APIroot);
  


  const params = useParams();      // params는 각 페이지의 url에 있는 모든 변수값을 넣어 놓음.
  console.log('이건 파람스')
  console.log(params);

  const [position, setPosition] = useState();

  const groupTitleHandler = (title) => {
    setGroupTitle(title)
  };

   const leaveGroupHandler = () => {
      setLeaveTheGroupModal(true);
  }

  const DeleteGroupHandler = () => {
    setDeleteTheGroupModal(true);
  }

  const CopyHandler = () => {
    // setUrlCopy(groupUrl)
    try {
      navigator.clipboard.writeText(groupUrl);
      alert('클립보드 복사완료');
      console.log(groupUrl)
    } catch (error) {
      alert('복사 실패');
    }
  };

  axios({
    method: "POST",
    url: `${API}/group/${params.group_pk}/detail`,
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    console.log(response.data.groupUrl);
    setGroupUrl(response.data.groupUrl);
  })

  useEffect(() => {
    axios({
      method: "GET",
      url: `${API}/group/${params.group_pk}/member`,
      headers: {
        "Content-Type": "application/json",
        AccessToken: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      setPosition(response.data.position);
    })
  }, [API, position]);

  console.log(position)
  
  return (
    <div>
      <MainTitle>
        <TitlenURLStyle>
      <h1>{groupTitle}</h1>
      <div className="url">Group URL : {groupUrl}</div>
      <div className="url"><button onClick={CopyHandler}>Copy</button></div>
        </TitlenURLStyle>
      <div>
        <LeaveButton onClick={leaveGroupHandler}>Leave</LeaveButton>
      </div>
      {leaveTheGroupModal && (
          // 연결된 모달 component
          <GroupLeaveModal
            open={leaveTheGroupModal}
            onClose={() => {
              setLeaveTheGroupModal(false);
            }}
            groupPk={params.group_pk}
          />
        )}
      
        <div>
          {position === 1 ? <DeleteButton onClick={DeleteGroupHandler}>Delete</DeleteButton> : null}
        </div>
        {DeleteTheGroupModal && (
          // 연결된 모달 component
          <GroupDeleteModal
            open={DeleteTheGroupModal}
            onClose={() => {
              setDeleteTheGroupModal(false);
            }}
            groupPk={params.group_pk}
          />
        )}
      </MainTitle>
    <GroupMainBoard>
    <GroupNavBar grouppk={params.group_pk} groupTitleFunc={groupTitleHandler}/>
      <Outlet />
    </GroupMainBoard>
    </div>
  );
};

export default GroupDetail;

const MainTitle = styled.div`
display:flex;
align-items:center;
border: 1px ;
padding-left: 30px;
height:90px;

`;

const GroupMainBoard = styled.div`
  border: 1px solid black;
  height: 500px;
`
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
  .button {
    margin: 15px 0px 0px 20px;
  }
`;

const LeaveButton = styled.button`
  margin-left: 300px;
`;

const DeleteButton = styled.button`
  margin-left: 20px;
`;

const TitlenURLStyle = styled.div`
  display: flex;
  align-items: center;
  .url{
    margin: 10px 0px 0px 10px;
    width: auto;
  }
`;