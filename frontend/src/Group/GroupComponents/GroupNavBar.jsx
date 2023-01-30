import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { useState } from "react";


const GroupNavBar = (props) => {

  const [groupTitle, setGroupTitle] = useState('Notice');


  return (
    <div>
      <h1>{groupTitle}</h1>
      <NavBarBoard>
        <NavBarStyle to={`/group/${props.grouppk}/notice`} onClick={() => {props.groupTitleFunc('Notice'); setGroupTitle("Notice")}}> Notice </NavBarStyle>
        <NavBarStyle to={`/group/${props.grouppk}/schedule`} onClick={() => {props.groupTitleFunc('Schedule'); setGroupTitle("Schedule")}}> Schedule </NavBarStyle>
        <NavBarStyle to={`/group/${props.grouppk}/meeting-list`} onClick={() => {props.groupTitleFunc('Record'); setGroupTitle("Record")}}>  Record </NavBarStyle>
        <NavBarStyle to={`/group/${props.grouppk}/qna`} onClick={() => {props.groupTitleFunc('Q & A'); setGroupTitle("Q&A")}}> Q & A </NavBarStyle>
        <NavBarStyle to={`/group/${props.grouppk}/member`} onClick={() => {props.groupTitleFunc('Member'); setGroupTitle("Member")}}> Member </NavBarStyle>
      </NavBarBoard>
    </div>
  );
};

export default GroupNavBar;


const NavBarStyle = styled(NavLink)`
  color: black;
  font-size: 20px;
  outline: invert;
  &:link {
    transition : 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: #10f14c;
  }
  &.active {
    color: #29a846;
  }
`;

const NavBarBoard = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
`;