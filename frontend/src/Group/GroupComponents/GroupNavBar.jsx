import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { useRecoilState } from "recoil";
import { pageNumber } from "../../Store";


const GroupNavBar = (props) => {
  const [pageNum, setPageNum] = useRecoilState(pageNumber);
  return (
    <div>
      <NavBarBoard>
        <NavBarStyle to={`/group/${props.grouppk}/notice`} onClick={() => {props.groupTitleFunc('Notice'); setPageNum(1)}}> Notice </NavBarStyle>
        <NavBarStyle to={`/group/${props.grouppk}/meeting-list`} onClick={() => {props.groupTitleFunc('Record'); setPageNum(1)}}>  Record </NavBarStyle>
        <NavBarStyle to={`/group/${props.grouppk}/qna`} onClick={() => {props.groupTitleFunc('Q & A'); setPageNum(1)}}> Q & A </NavBarStyle>
        <NavBarStyle to={`/group/${props.grouppk}/member`} onClick={() => {props.groupTitleFunc('Member'); setPageNum(1)}}> Member </NavBarStyle>
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