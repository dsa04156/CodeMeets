import { IoPowerSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import axios from 'axios';

import { APIroot, user, groupNavTitle } from '../../Store';
import { useRecoilValue, useRecoilState } from 'recoil';

const SideBarLogoutButton = () => {
  const API = useRecoilValue(APIroot);
  const [recoilUser, setRecoilUser] = useRecoilState(user);
  const [recoilNavTitle, setRecoilNavTitle] = useRecoilState(groupNavTitle);

  const SideBarLogoutHandler = () => {
    axios({
      method: 'PUT',
      url: `${API}/login/logout`,
      headers: {
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    })
      .then(() => {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
      })
      .catch((err) => console.log(err));

    setRecoilUser({});
    setRecoilNavTitle('Notice');
  };

  return (
    <LogoutDiv to={'/'}>
      <IoPowerSharp
        onClick={SideBarLogoutHandler}
        size="24"
        style={{ margin: '10px', marginLeft: '10px', cursor: 'pointer' }}
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
