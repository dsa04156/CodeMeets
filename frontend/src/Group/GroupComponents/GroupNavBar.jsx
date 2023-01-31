import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { useState } from "react";


const GroupNavBar = (props) => {
  return (
    <div>
      <NavBarBoard>
        <NavBarStyle to={`/group/${props.grouppk}/notice`} onClick={() => {props.groupTitleFunc('Notice');}}> Notice </NavBarStyle>
        <NavBarStyle to={`/group/${props.grouppk}/schedule`} onClick={() => {props.groupTitleFunc('Schedule');}}> Schedule </NavBarStyle>
        <NavBarStyle to={`/group/${props.grouppk}/meeting-list`} onClick={() => {props.groupTitleFunc('Record');}}>  Record </NavBarStyle>
        <NavBarStyle to={`/group/${props.grouppk}/qna`} onClick={() => {props.groupTitleFunc('Q & A');}}> Q & A </NavBarStyle>
        <NavBarStyle to={`/group/${props.grouppk}/member`} onClick={() => {props.groupTitleFunc('Member');}}> Member </NavBarStyle>
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