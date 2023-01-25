import GroupListItem from "../GroupComponents/GroupListItem";

const GroupList = () => {
  const dummy = [
    { id: "1", title: "title 1", content: "content 1" },
    { id: "2", title: "title 2", content: "content 2" },
    { id: "3", title: "title 3", content: "content 3" },
  ];

  return (
    <ul>
      {dummy.map((groupitem) => (
        <GroupListItem
          key={groupitem.id}
          id={groupitem.id}
          title={groupitem.title}
          content={groupitem.content}
        />
      ))}
    </ul>
  );
};

export default GroupList;
