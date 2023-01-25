import { useParams } from "react-router-dom";
import GroupQnAItem from "../GroupComponents/GroupQnAItem";

const GroupQnA = () => {
    const Noticedummy = [
        { id: "1", title: "title 1", content: "content 1" },
        { id: "2", title: "title 2", content: "content 2" },
        { id: "3", title: "title 3", content: "content 3" },
      ];

    const grouppk = useParams()
    console.log(grouppk)

    return (
        <ul>
        {Noticedummy.map((meetListItem) => (
          <GroupQnAItem
            key={meetListItem.id}
            id={meetListItem.id}
            title={meetListItem.title}
            content={meetListItem.content}
          />
        ))}
      </ul>
    );
};

export default GroupQnA;