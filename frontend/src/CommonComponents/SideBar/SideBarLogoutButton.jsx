import { IoPowerSharp } from "react-icons/io5";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SideBarLogoutButton = () => {
  const SideBarLogoutHandler = () => {
    console.log("logout");
  };

  return (
    <LogoutDiv to={'/login'}>
      <IoPowerSharp
        onClick={SideBarLogoutHandler}
        size="24"
        style={{ margin: "10px", marginLeft: "10px", cursor: "pointer" }}
      />
    </LogoutDiv>
  );
};

export default SideBarLogoutButton;

const LogoutDiv = styled(NavLink)`
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: #10f14c;
  }
  &.active {
    color: #29a846;
  }
`;
