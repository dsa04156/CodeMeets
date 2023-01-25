import { Link } from "react-router-dom";

const GroupListItem = (props) => {
  console.log('여긴 리스트아이템')
  console.log(props)
  return (
    <div>
      <li>
        <div>
          {/* <Link to={`/group/${props.id}`} state={{groupid:props.id}} >{props.title}</Link> */}
          <Link to={`/group/${props.id}/notice`} >{props.title}</Link>
        </div>
      </li>
    </div>
  );
};

export default GroupListItem;
