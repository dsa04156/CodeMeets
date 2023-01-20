import GroupNavBar from "../GroupComponents/GroupNavBar";
import { Outlet } from 'react-router-dom';

const GroupDetail = () => {
  return (
    <div>
      <GroupNavBar />
        <h1>Detail</h1>
        <Outlet />
    </div>
  );
};

export default GroupDetail;
