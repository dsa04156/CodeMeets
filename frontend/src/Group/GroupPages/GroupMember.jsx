import { useParams } from "react-router-dom";

import GroupMemberItem from "../GroupComponents/GroupMemberItem";

import axios from "axios";
import { useEffect } from "react";

import { APIroot } from "../../Store";
import { useRecoilValue } from "recoil";

const GroupMember = () => {
  const API = useRecoilValue(APIroot)

  const params = useParams();
  console.log(params);

  useEffect(() => {
    axios({
      method:"GET",
      url:`${API}/group/${params.group_pk}/member`,
      headers:{
        "Content-Type": "application/json",
      }
    }).then((response) => {
      console.log(response.data)
    })
  })

  return (
    <ul>
      {/* {Memberdummy.map((memberListItem) => (
        <GroupMemberItem
          key={memberListItem.id}
          id={memberListItem.id}
          title={memberListItem.title}
          content={memberListItem.content}
        />
      ))} */}
    </ul>
  );
};

export default GroupMember;
