import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import SideBarLogoutButton from './SideBarLogoutButton';

import { AiOutlineHome } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { BsPeople } from 'react-icons/bs';
import { AiOutlineWechat } from 'react-icons/ai';

import { user, pageNumber } from '../../Store';
import { useRecoilValue, useRecoilState } from 'recoil';

const SideBar = () => {
  const LoginUser = useRecoilValue(user);
  const [recoilPageNum, setRecoilPageNum] = useRecoilState(pageNumber);

  const menus1 = [
    { name: 'Home', path: '/home', icon: <AiOutlineHome size="24" /> },
    {
      name: 'My-page',
      path: `/my-page/${LoginUser.userPk}/meeting-list`,
      icon: <BsPerson size="24" />,
    },
    { name: 'Group', path: '/grouplist', icon: <BsPeople size="24" /> },
  ];

  const menus2 = [
    { name: 'DmChat', path: '/dmChat', icon: <AiOutlineWechat size="24" /> },
  ];

  const PageRendering = () => {
    setRecoilPageNum(1);
  };

  const FirstMenu = menus1.map((menu, index) => {
    return (
      <NavBarStyle
        exact="true"
        style={{
          textDecoration: 'none',
          margin: '7px',
          marginLeft: '10px',
          marginRight: '2px',
        }}
        to={menu.path}
        key={index}
        onClick={PageRendering}
      >
        {menu.icon}
      </NavBarStyle>
    );
  });

  const SecondMenu = menus2.map((menu, index) => {
    return (
      <NavBarStyle
        exact="true"
        style={{
          textDecoration: 'none',
          margin: '7px',
          marginLeft: '10px',
          marginRight: '2px',
          marginTop: '10px',
        }}
        to={menu.path}
        key={index}
      >
        {menu.icon}
      </NavBarStyle>
    );
  });

  return (
    <Side>
      <Menu>{FirstMenu}</Menu>
      <Menu2>
        {SecondMenu}
        <div style={{ marginTop: '20px' }}>
          <SideBarLogoutButton />
        </div>
      </Menu2>
    </Side>
  );
};

export default SideBar;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 20%;
  height: 95%;
`;

const Menu = styled.div`
  margin-top: 50px;
  width: 20%;
  display: flex;
  flex-direction: column;
`;

const Menu2 = styled.div`
  margin-bottom: 30px;
  width: 20%;
  display: flex;
  flex-direction: column;
`;

const NavBarStyle = styled(NavLink)`
  color: black;
  font-size: 20px;
  outline: invert;
  background: rgb(174, 175, 176);
  background: linear-gradient(
    176deg,
    rgba(174, 175, 176, 1) 100%,
    rgba(93, 95, 96, 1) 100%,
    rgba(93, 95, 96, 1) 100%
  );
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
