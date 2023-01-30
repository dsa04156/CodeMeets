import GroupListItem from "../GroupComponents/GroupListItem";
import Pagination from "../../CommonComponents/Pagination/Pagination";

import { useState, useEffect } from "react";
import axios from "axios";

import { APIroot } from "../../Store";

import { user } from "../../Store";
import { useRecoilValue } from "recoil";

import styled from "styled-components";

const GroupList = () => {
  const API = useRecoilValue(APIroot);
  const loginUser = useRecoilValue(user);

  const [groupList, setGroupList] = useState({});
  console.log(loginUser.userPk);

  useEffect(() => {
    axios.get(`${API}/group/${loginUser.userPk}`).then((response) => {
      setGroupList(response.data);
    });
    console.log(groupList);
  }, []);

  return (
    <div>
      <ContentBox>
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
      </ContentBox>
      <Pagination></Pagination>
    </div>
  );
};

export default GroupList;

const ContentBox = styled.div`

`;