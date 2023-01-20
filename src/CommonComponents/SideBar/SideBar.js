import { Link } from "react-router-dom"

const SideBar = () => {
  return (
    <div>
      <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/my-page">My-Page</Link> |{" "}
      <Link to="/group">Group</Link> |{" "}
      <Link to="/message">Message</Link> |{" "}
      <Link to="/setting">Setting</Link> |{" "}
      </nav>
    </div>
  );
};

export default SideBar;
