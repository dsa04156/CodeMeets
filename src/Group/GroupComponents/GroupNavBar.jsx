import { Link } from "react-router-dom";

const GroupNavBar = () => {
  return (
    <div>
      <nav>
        <Link to="/group/1/notice"> 공지사항 </Link> |{" "}
        <Link to="/group/1/schedule"> 일정 </Link> |{" "}
        <Link to="/group/1/meeting-list"> 회의 기록 </Link> |{" "}
        <Link to="/group/1/qna"> Q & A </Link> |{" "}
        <Link to="/group/1/member"> 그룹 멤버 </Link> |{" "}
      </nav>
    </div>
  );
};

export default GroupNavBar;
