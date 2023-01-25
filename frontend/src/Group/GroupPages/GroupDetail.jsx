import GroupNavBar from "../GroupComponents/GroupNavBar";
import { Outlet } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useState } from "react";

import styled from "styled-components";

const GroupDetail = () => {
  const [groupTitle, setGroupTitle] = useState('Notice');
  
  const groupTitleHandler = (title) => {
    setGroupTitle(title)
  };

  const params = useParams();
  console.log('이건 파람스')
  console.log(params);

  return (
    <div>
      <MainTitle>
      <h1>{groupTitle}</h1>
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
border: 1px solid black;
padding-left: 30px;
height:90px;

`;

const GroupMainBoard = styled.div`
  border: 1px solid black;
  height: 500px;
`
