import { useParams } from "react-router-dom";

import GroupMemberItem from "../GroupComponents/GroupMemberItem";

const GroupMember = () => {
  const Memberdummy = [
    { id: "1", title: "title 1", content: "content 1" },
    { id: "2", title: "title 2", content: "content 2" },
    { id: "3", title: "title 3", content: "content 3" },
  ];

  const grouppk = useParams();
  console.log(grouppk);

  return (
    <ul>
      {Memberdummy.map((memberListItem) => (
        <GroupMemberItem
          key={memberListItem.id}
          id={memberListItem.id}
          title={memberListItem.title}
          content={memberListItem.content}
        />
      ))}
    </ul>
  );
};

export default GroupMember;
