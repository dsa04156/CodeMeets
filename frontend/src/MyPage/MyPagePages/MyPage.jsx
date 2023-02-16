import MyPageProfile from '../MyPageComponents/MyPageProfile';
import MyPageNavBar from '../MyPageComponents/MyPageNavBar';

import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

const MyPage = () => {
  const MyPageUserId = useParams();

  return (
    <div>
      <MyPageProfile />
      <MyPageBottomCard>
        <MyPageNavBar userId={MyPageUserId.user_id} />
        <Outlet />
      </MyPageBottomCard>
    </div>
  );
};

export default MyPage;

const MyPageBottomCard = styled.div`
  margin-top: 6px;
  padding: 6px;

  border-radius: 20px;
  height: 400px;
`;
