import { NavLink } from "react-router-dom";
import styled from "styled-components"

const MyPageNavBar = (props) => {
  console.log(props);
  return (
    <div style={{borderBottom:'1px solid Black'}}>
      <NavStyle>
        <div>
        <MyPageNavBarStyle to={`/my-page/${props.userId}/meeting-list`}>Meeting-List</MyPageNavBarStyle>
        </div>
        <div>
        <MyPageNavBarStyle to={`/my-page/${props.userId}/question-list`}>Question-List</MyPageNavBarStyle>
        </div>
      </NavStyle>
    </div>
  );
};

export default MyPageNavBar;

const NavStyle = styled.nav`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
padding:4px;
margin-bottom:6px;
`;

const MyPageNavBarStyle = styled(NavLink)`
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