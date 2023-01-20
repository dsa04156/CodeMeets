// import GroupDetail from "./GroupDetail";
// import GroupMeetingList from "./GroupMeetingList";
// import GroupNotice from "./GroupNotice";
// import GroupQnA from "./GroupQnA";
// import GroupMember from "./GroupMember";
// import GroupSchedule from "./GroupSchedule";
import GroupListItem from '../GroupComponents/GroupListItem'

const GroupList = () => {
  const dummy = [
    {id: 1,
    title: 'title 1',
    content: 'content 1'},
    {id: 2,
    title: 'title 2',
    content: 'content 2'},
    {id: 3,
    title: 'title 3',
    content: 'content 3'},
    ]
  return (
    <div>
      <GroupListItem groupItems={dummy}/>
      
    </div>
  );
};

export default GroupList;
