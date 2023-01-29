import { IoPowerSharp } from "react-icons/io5";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import axios from "axios";

const SideBarLogoutButton = () => {
  const SideBarLogoutHandler = () => {
    axios({
      method: "PUT",
      url: `http://aeoragy.iptime.org:18081/login/logout`,
      headers: {
        ACCESS_TOKEN: `${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        console.log("logout");
      })
      .catch((err) => console.log(err));
  };

  return (
    <LogoutDiv to={"/codemeets/login"}>
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
